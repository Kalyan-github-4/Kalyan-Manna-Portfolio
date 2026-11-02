"use client"

import { useEffect, useRef } from "react"

type SmokeCanvasProps = {
  className?: string
  /** Swaps the look; defaults to the hero's violet-to-teal smoke. */
  fragmentShader?: string
}

// Smoke is soft, so a small buffer upscaled by the browser looks the same and
// keeps the per-pixel noise cheap.
const MAX_BUFFER_WIDTH = 640
const FRAME_INTERVAL = 1000 / 30
// Starts away from zero so the noise offsets are not all lined up on frame one.
const TIME_OFFSET = 40

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform vec2 resolution;
  uniform float time;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(17.0, 9.0);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    // Sized off the narrower of width and height, so phones get finer wisps
    // and not one huge blob.
    vec2 p = gl_FragCoord.xy / min(resolution.x, resolution.y * 2.0) * vec2(4.5, 3.0);

    // Every time term moves along x only, so the aura sways and never rises.
    float sway = sin(time * 0.15);
    p.x += sway * 0.3;

    // Noise warped by noise keeps it soft and smoky instead of a sliding image.
    vec2 q = vec2(
      fbm(p + vec2(time * 0.012, 0.0)),
      fbm(p + vec2(5.2 - time * 0.012, 1.3))
    );
    vec2 r = vec2(
      fbm(p + 2.0 * q + vec2(1.7 + time * 0.015, 9.2)),
      fbm(p + 2.0 * q + vec2(8.3 - time * 0.015, 2.8))
    );
    float density = smoothstep(0.2, 0.85, fbm(p + 2.0 * r));

    // The violet-to-teal sweep drifts with it, a few percent each way.
    float x = uv.x + (q.x - 0.5) * 0.1 + sway * 0.035;
    float envelope = smoothstep(0.14, 0.32, x) * (1.0 - smoothstep(0.66, 0.84, x));

    vec3 violet = vec3(0.21, 0.12, 0.56);
    vec3 blue = vec3(0.13, 0.22, 0.52);
    vec3 teal = vec3(0.05, 0.36, 0.48);
    vec3 pale = vec3(0.46, 0.56, 0.74);
    vec3 color = mix(violet, blue, smoothstep(0.26, 0.5, x));
    color = mix(color, teal, smoothstep(0.5, 0.68, x));
    color = mix(color, pale, density * density * 0.3);

    float alpha = envelope * mix(0.5, 1.0, density);

    // A little dither hides banding in the darkest part of the falloff.
    alpha = clamp(alpha + (hash(gl_FragCoord.xy) - 0.5) / 96.0 * envelope, 0.0, 1.0);

    gl_FragColor = vec4(color * alpha, alpha);
  }
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/**
 * Whatever background and mask the className sets stay in charge: the mask
 * clips the smoke, and the background is the fallback where WebGL is missing.
 */
export default function SmokeCanvas({ className, fragmentShader: fragmentSource = FRAGMENT_SHADER }: SmokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { antialias: false, depth: false, stencil: false })
    if (!gl) return

    const vertexShader = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()
    if (!vertexShader || !fragmentShader || !program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resolution = gl.getUniformLocation(program, "resolution")
    const time = gl.getUniformLocation(program, "time")

    canvas.style.background = "none"

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let lastDraw = 0
    let inView = true

    const draw = (now: number) => {
      gl.uniform1f(time, now / 1000 + TIME_OFFSET)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - lastDraw < FRAME_INTERVAL) return
      lastDraw = now
      draw(now)
    }

    // Runs only while someone can see it. With reduced motion it holds one frame.
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = 0
      if (reducedMotion.matches) {
        draw(0)
      } else if (inView && !document.hidden) {
        frame = requestAnimationFrame(tick)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      const scale = Math.min(1, MAX_BUFFER_WIDTH / width)
      canvas.width = Math.round(width * scale)
      canvas.height = Math.round(height * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      draw(performance.now())
    })
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    intersectionObserver.observe(canvas)

    const onContextLost = () => {
      cancelAnimationFrame(frame)
      inView = false
      canvas.style.background = ""
    }

    canvas.addEventListener("webglcontextlost", onContextLost)
    document.addEventListener("visibilitychange", sync)
    reducedMotion.addEventListener("change", sync)
    sync()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener("webglcontextlost", onContextLost)
      document.removeEventListener("visibilitychange", sync)
      reducedMotion.removeEventListener("change", sync)
      canvas.style.background = ""
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [fragmentSource])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
