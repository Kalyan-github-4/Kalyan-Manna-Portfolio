"use client"

import SmokeCanvas from "./SmokeCanvas"

const SILK_SHADER = `
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
    vec2 p = gl_FragCoord.xy / max(resolution.x, resolution.y) * 3.2;

    // Turned and stretched so the folds run diagonally, like draped cloth.
    p = mat2(0.82, -0.57, 0.57, 0.82) * p * vec2(0.7, 1.5);

    vec2 q = vec2(
      fbm(p + vec2(time * 0.012, 0.0)),
      fbm(p + vec2(5.2, 1.3 - time * 0.012))
    );
    vec2 warped = p + 2.4 * q;

    // Lighting the slope, not the height, is what makes it read as creases.
    float height = fbm(warped);
    float slope = fbm(warped + vec2(0.035, 0.035)) - height;
    float light = smoothstep(-0.03, 0.05, slope);

    // Brightest behind the heading and sinking to black towards the far corner.
    float falloff = 1.0 - smoothstep(0.1, 1.15, distance(uv, vec2(0.32, 0.72)));

    float alpha = light * mix(0.012, 0.065, falloff);

    // A little dither hides banding this close to black.
    alpha = clamp(alpha + (hash(gl_FragCoord.xy) - 0.5) / 160.0, 0.0, 1.0);

    gl_FragColor = vec4(vec3(0.92, 0.92, 0.96) * alpha, alpha);
  }
`

/** Dark crumpled silk behind a page's first screen, fading out into the page below. */
export default function SilkBackground() {
  return (
    <SmokeCanvas
      fragmentShader={SILK_SHADER}
      className="pointer-events-none absolute inset-x-0 top-0 h-screen max-h-full w-full mask-[linear-gradient(to_bottom,black_70%,transparent)]"
    />
  )
}
