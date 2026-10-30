'use client'

import { useEffect, useRef } from 'react'

const PALETTE = {
  dark: '#080000',
  light: '#fff',
  skin: 'hsl(120, 40%, 80%)',
  skinShadow: 'hsl(120, 30%, 60%)',
  flesh: 'hsl(120, 50%, 30%)',
  tears: 'hsla(195, 75%, 60%, 0.7)',
}

const SCENE_SIZE = 400

type ZdogVector = { x: number; y: number; z: number }

type ZdogItem = {
  translate: ZdogVector
  rotate: ZdogVector
  scale: ZdogVector
  stroke: number
  children: ZdogItem[]
  copyGraph: (options: Record<string, unknown>) => ZdogItem
}

type ZdogIllustration = ZdogItem & {
  zoom: number
  updateRenderGraph: () => void
  setResize: (resize: boolean) => void
}

type ZdogApi = {
  TAU: number
  Illustration: new (options: Record<string, unknown>) => ZdogIllustration
  Anchor: new (options: Record<string, unknown>) => ZdogItem
  Group: new (options: Record<string, unknown>) => ZdogItem
  Shape: new (options: Record<string, unknown>) => ZdogItem
  Hemisphere: new (options: Record<string, unknown>) => ZdogItem
}

function createCharacterModel(illo: ZdogItem, Zdog: ZdogApi) {
  const headAnchor = new Zdog.Anchor({ addTo: illo, translate: { y: -42 } })
  const headGroup = new Zdog.Group({ addTo: headAnchor })
  new Zdog.Shape({ addTo: headGroup, stroke: 228, color: PALETTE.skinShadow, path: [{ x: -4.5 }, { x: 4.5 }] })
  new Zdog.Shape({ addTo: headGroup, stroke: 216, color: PALETTE.skin, translate: { x: -4.5 } })

  const eyeAnchor = new Zdog.Anchor({ addTo: headAnchor, translate: { x: -66, y: -30, z: 84 }, rotate: { y: Zdog.TAU / 11 } })
  const eyeGroup = new Zdog.Group({ addTo: eyeAnchor })
  const eyePath = [
    { x: 0, y: 0, z: 3 },
    { bezier: [{ x: 24, y: 0, z: 3 }, { x: 36, y: 21, z: 0 }, { x: 36, y: 36, z: 0 }] },
    { bezier: [{ x: 36, y: 51, z: 0 }, { x: 24, y: 63, z: 3 }, { x: 0, y: 63, z: 3 }] },
    { bezier: [{ x: -24, y: 63, z: 3 }, { x: -36, y: 51, z: 0 }, { x: -36, y: 36, z: 0 }] },
    { bezier: [{ x: -36, y: 21, z: 0 }, { x: -24, y: 0, z: 3 }, { x: 0, y: 0, z: 3 }] },
  ]
  new Zdog.Shape({ addTo: eyeGroup, fill: true, stroke: 0, color: PALETTE.skinShadow, scale: 1.15, path: eyePath })
  new Zdog.Shape({ addTo: eyeGroup, fill: true, stroke: 3, color: PALETTE.dark, translate: { y: 6 }, path: eyePath })
  new Zdog.Shape({ addTo: eyeGroup, fill: true, stroke: 0, color: PALETTE.light, scale: 0.4, translate: { x: -9, y: 9, z: 3 }, path: eyePath })
  const eyeLeftAnchor = eyeAnchor.copyGraph({ translate: { x: 66, y: -30, z: 84 }, rotate: { y: Zdog.TAU / -11 } })

  const mouthAnchor = new Zdog.Anchor({ addTo: headAnchor, translate: { y: 36, z: 96 }, rotate: { x: Zdog.TAU / -45 } })
  const mouthGroup = new Zdog.Group({ addTo: mouthAnchor })
  const mouthPath = [
    { x: 0, y: 0 },
    { bezier: [{ x: 18, y: 0, z: 0 }, { x: 30, y: 21, z: -6 }, { x: 30, y: 30, z: -6 }] },
    { bezier: [{ x: 30, y: 51, z: -6 }, { x: 24, y: 33, z: -3 }, { x: 0, y: 33, z: -3 }] },
    { bezier: [{ x: -24, y: 33, z: -3 }, { x: -30, y: 51, z: -6 }, { x: -30, y: 30, z: -6 }] },
    { bezier: [{ x: -30, y: 21, z: -6 }, { x: -18, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }] },
  ]
  new Zdog.Shape({ addTo: mouthGroup, stroke: 3, fill: true, color: PALETTE.skinShadow, scale: 1.1, translate: { y: -5 }, path: mouthPath })
  new Zdog.Shape({ addTo: mouthGroup, stroke: 0, fill: true, color: PALETTE.flesh, path: mouthPath })
  new Zdog.Shape({
    addTo: mouthGroup,
    stroke: 7,
    fill: false,
    color: PALETTE.light,
    translate: { y: 25, z: -6 },
    path: [
      { x: 0, y: 0 },
      { bezier: [{ x: 24, y: 0 }, { x: 24, y: 10 }, { x: 24, y: 10 }] },
      { x: 26, y: 13 },
      { bezier: [{ x: 26, y: 13 }, { x: 16, y: 5 }, { x: 0, y: 5 }] },
      { bezier: [{ x: -16, y: 5 }, { x: -26, y: 13 }, { x: -26, y: 13 }] },
      { x: -24, y: 10 },
      { bezier: [{ x: -24, y: 10 }, { x: -24, y: 0 }, { x: 0, y: 0 }] },
    ],
  })

  const tears = [-1, 1].map((side) =>
    new Zdog.Shape({ addTo: headAnchor, stroke: 16, color: PALETTE.tears, translate: { x: side * 62, y: 34, z: 92 } }),
  )

  // Set back so depth sorting can't flip the torso in front of the chin as they turn.
  const bodyAnchor = new Zdog.Anchor({ addTo: illo, translate: { y: 81, z: -24 } })
  const bodyGroup = new Zdog.Group({ addTo: bodyAnchor })
  new Zdog.Shape({ addTo: bodyGroup, stroke: 63, fill: true, color: PALETTE.skinShadow, translate: { y: 6 } })
  const bodyUpper = new Zdog.Shape({ addTo: bodyGroup, stroke: 57, fill: true, color: PALETTE.skin, translate: { x: -3 } })
  const armGroup = new Zdog.Group({ addTo: bodyAnchor, translate: { z: -6 }, rotate: { x: Zdog.TAU / 16 } })
  const armPath = [{ x: -35, y: -6 }, { bezier: [{ x: -33, y: -6 }, { x: -45, y: -6 }, { x: -54, y: 30 }] }]
  new Zdog.Shape({ addTo: armGroup, stroke: 30, color: PALETTE.skinShadow, path: armPath })
  new Zdog.Shape({ addTo: armGroup, stroke: 27, color: PALETTE.skin, path: armPath })
  armGroup.copyGraph({ rotate: { x: Zdog.TAU / 16, y: Zdog.TAU / 2 } })

  const legGroup = new Zdog.Group({ addTo: illo, translate: { y: 141, z: -3 } })
  new Zdog.Shape({ addTo: legGroup, stroke: 28, color: PALETTE.skin, path: [{ x: -21, y: -6 }, { bezier: [{ x: -18, y: -6 }, { x: -24, y: -6 }, { x: -24, y: 24 }] }] })
  new Zdog.Hemisphere({ addTo: legGroup, stroke: 5, diameter: 20, color: PALETTE.skin, backface: PALETTE.skin, translate: { x: -25, y: 42, z: 4 } })
  legGroup.copyGraph({ rotate: { y: Zdog.TAU / 2 } })

  return { headAnchor, bodyAnchor, bodyUpper, eyes: [eyeGroup, eyeLeftAnchor.children[0]], tears }
}

export default function InteractiveCharacter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let frame = 0
    let lookAroundTimeout: ReturnType<typeof setTimeout> | undefined
    let mouseTimeout: ReturnType<typeof setTimeout> | undefined
    let cancelled = false
    let cleanupScene: (() => void) | undefined

    const initialize = async () => {
      // Bundled rather than loaded from a CDN: the site's CSP blocks third-party
      // scripts. Imported here so they stay out of the initial page bundle.
      const [{ default: zdog }, { gsap }] = await Promise.all([import('zdog'), import('gsap')])
      const canvas = canvasRef.current
      if (cancelled || !canvas) return
      const Zdog = zdog as unknown as ZdogApi

      const illo = new Zdog.Illustration({
        element: canvas,
        resize: true,
        dragRotate: true,
        onResize(this: ZdogIllustration, width: number, height: number) {
          this.zoom = Math.min(width, height) / SCENE_SIZE
        },
      })
      const model = createCharacterModel(illo, Zdog)

      gsap.to(model.bodyUpper.scale, { duration: 0.5, x: 0.95, y: 0.97, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      const blink = () => {
        const delay = Math.random() * 6 + 2
        model.eyes.forEach((eye, index) => {
          gsap.to(eye.scale, { duration: 0.07, y: 0, repeat: 1, yoyo: true, delay, onComplete: index === 0 ? blink : undefined })
        })
      }
      blink()

      // Each tear slides down the curve of the cheek, thinning as it goes.
      model.tears.forEach((tear, index) => {
        const delay = index * 0.8
        gsap.to(tear.translate, { duration: 1.6, y: 76, z: 58, repeat: -1, delay, ease: 'sine.inOut' })
        gsap.to(tear, { duration: 1.6, stroke: 6, repeat: -1, delay, ease: 'sine.inOut' })
      })

      const lookAround = () => {
        const randomY = ((Math.random() * 40 - 20) / 360) * Zdog.TAU
        const duration = Math.random() + 0.5
        gsap.to(model.headAnchor.rotate, { duration, y: randomY, ease: 'sine.inOut' })
        gsap.to(model.bodyAnchor.rotate, {
          duration,
          y: randomY / 2,
          ease: 'sine.inOut',
          onComplete: () => {
            lookAroundTimeout = setTimeout(lookAround, Math.random() * 1000 + 500)
          },
        })
      }
      lookAround()

      const reset = () => {
        gsap.to(model.headAnchor.rotate, { duration: 0.5, x: 0, y: 0, ease: 'sine.out' })
        gsap.to(model.bodyAnchor.rotate, { duration: 0.5, x: 0, y: 0, ease: 'sine.out' })
        lookAround()
      }

      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        gsap.killTweensOf(model.headAnchor.rotate)
        gsap.killTweensOf(model.bodyAnchor.rotate)
        clearTimeout(lookAroundTimeout)
        const rotX = (event.clientX - (rect.left + rect.width / 2)) / Zdog.TAU
        const rotY = -(event.clientY - (rect.top + rect.height / 2)) / Zdog.TAU
        gsap.to(model.headAnchor.rotate, { duration: 0.5, x: rotY / 100, y: -rotX / 100, ease: 'sine.out' })
        gsap.to(model.bodyAnchor.rotate, { duration: 0.5, x: rotY / 200, y: -rotX / 200, ease: 'sine.out' })
        clearTimeout(mouseTimeout)
        mouseTimeout = setTimeout(reset, 2000)
      }
      document.body.addEventListener('mousemove', handleMouseMove)

      const animate = () => {
        if (cancelled) return
        illo.updateRenderGraph()
        frame = requestAnimationFrame(animate)
      }
      animate()

      cleanupScene = () => {
        document.body.removeEventListener('mousemove', handleMouseMove)
        illo.setResize(false)
        gsap.killTweensOf([
          model.bodyUpper.scale,
          model.headAnchor.rotate,
          model.bodyAnchor.rotate,
          ...model.eyes.map((eye) => eye.scale),
          ...model.tears,
          ...model.tears.map((tear) => tear.translate),
        ])
      }
    }

    initialize()

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      clearTimeout(lookAroundTimeout)
      clearTimeout(mouseTimeout)
      cleanupScene?.()
    }
  }, [])

  return <canvas ref={canvasRef} aria-label="Interactive 3D character" className="block size-full" />
}
