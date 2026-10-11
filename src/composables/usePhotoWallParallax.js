import { onMounted, onBeforeUnmount } from 'vue'

// Fraction of the measured overscan to use, not a fixed pixel distance.
const MOVEMENT_RATIO = 0.8
const SMOOTHING = 0.14
const STOP_THRESHOLD = 0.05
const EDGE_GUARD = 1

export function usePhotoWallParallax(backgroundRef, wallRef) {
  // Animation coordinates stay outside Vue reactivity.
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let rangeX = 0
  let rangeY = 0
  let viewport = null
  let lastPointer = null
  let frame = 0
  let lastTime = 0
  let enabled = false
  let observer
  let reducedMotion
  let mouseCapability

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  function draw() {
    wallRef.value.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
  }

  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
    lastTime = 0
    targetX = currentX
    targetY = currentY
    wallRef.value.style.willChange = ''
  }

  function animate(time) {
    frame = 0
    // Match the same response on 60 Hz and higher-refresh displays.
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 1000 / 60
    const alpha = 1 - (1 - SMOOTHING) ** (elapsed / (1000 / 60))
    lastTime = time
    currentX += (targetX - currentX) * alpha
    currentY += (targetY - currentY) * alpha
    if (Math.abs(targetX - currentX) < STOP_THRESHOLD &&
        Math.abs(targetY - currentY) < STOP_THRESHOLD) {
      currentX = targetX
      currentY = targetY
      draw()
      stop()
      return
    }
    draw()
    frame = requestAnimationFrame(animate)
  }

  function schedule() {
    if (!frame && enabled && !document.hidden) {
      wallRef.value.style.willChange = 'transform'
      frame = requestAnimationFrame(animate)
    }
  }

  function setTarget() {
    if (!viewport || !lastPointer || !enabled) return
    const x = clamp((lastPointer.x - viewport.left) / viewport.width * 2 - 1, -1, 1)
    const y = clamp((lastPointer.y - viewport.top) / viewport.height * 2 - 1, -1, 1)
    // Reverse the pointer direction. Bounds were measured on resize, not on pointermove.
    targetX = -x * rangeX * MOVEMENT_RATIO
    targetY = -y * rangeY * MOVEMENT_RATIO
    schedule()
  }

  function measure() {
    const background = backgroundRef.value
    const wall = wallRef.value
    if (!background || !wall) return
    viewport = background.getBoundingClientRect()
    const bounds = wall.getBoundingClientRect()
    // Remove our translation to recover the wall's original centered bounds.
    // Use the smaller margin on each axis so either direction always covers the viewport.
    rangeX = Math.max(0, Math.min(
      viewport.left - (bounds.left - currentX),
      bounds.right - currentX - viewport.right,
    ) - EDGE_GUARD)
    rangeY = Math.max(0, Math.min(
      viewport.top - (bounds.top - currentY),
      bounds.bottom - currentY - viewport.bottom,
    ) - EDGE_GUARD)
    // Clamp immediately on resize: a previous wide-screen offset must not expose an edge.
    currentX = clamp(currentX, -rangeX * MOVEMENT_RATIO, rangeX * MOVEMENT_RATIO)
    currentY = clamp(currentY, -rangeY * MOVEMENT_RATIO, rangeY * MOVEMENT_RATIO)
    targetX = clamp(targetX, -rangeX * MOVEMENT_RATIO, rangeX * MOVEMENT_RATIO)
    targetY = clamp(targetY, -rangeY * MOVEMENT_RATIO, rangeY * MOVEMENT_RATIO)
    draw()
    setTarget()
  }

  function onPointerMove(event) {
    if (!enabled || event.pointerType !== 'mouse' || document.hidden) return
    lastPointer = { x: event.clientX, y: event.clientY }
    setTarget()
  }

  function onPointerOut(event) {
    if (event.relatedTarget === null && event.pointerType === 'mouse') {
      lastPointer = null
      stop() // Freeze at the current position; never recenter on leaving the page.
    }
  }

  function onVisibilityChange() {
    if (document.hidden) {
      lastPointer = null
      stop()
    }
  }

  function updatePreference() {
    // Touch support does not exclude a mouse (hybrid PCs can report maxTouchPoints > 0).
    // Actual touch/pen events are still ignored by onPointerMove.
    enabled = mouseCapability.matches && !reducedMotion.matches
    if (!enabled) {
      stop()
      lastPointer = null
      currentX = currentY = targetX = targetY = 0
      draw()
    }
    measure()
  }

  onMounted(() => {
    reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    mouseCapability = matchMedia('(any-hover: hover) and (any-pointer: fine)')
    updatePreference()
    observer = new ResizeObserver(measure)
    observer.observe(backgroundRef.value)
    observer.observe(wallRef.value)
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerout', onPointerOut, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', updatePreference)
    mouseCapability.addEventListener('change', updatePreference)
  })

  onBeforeUnmount(() => {
    stop()
    observer?.disconnect()
    window.removeEventListener('resize', measure)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerout', onPointerOut)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    reducedMotion?.removeEventListener('change', updatePreference)
    mouseCapability?.removeEventListener('change', updatePreference)
  })
}
