<script setup>
import { nextTick, ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  menuId: { type: String, required: true },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['open', 'toggle', 'close', 'cancel-close'])
const root = ref(null)
const panel = ref(null)
const triggerId = 'landing-' + props.menuId + '-trigger'
const panelId = 'landing-' + props.menuId + '-panel'

function onPointerEnter(event) {
  emit('cancel-close')
  if (event.pointerType === 'mouse' &&
      matchMedia('(min-width: 701px) and (any-hover: hover) and (any-pointer: fine)').matches) {
    emit('open', 'hover')
  }
}

function onPointerLeave(event) {
  if (event.pointerType === 'mouse') emit('close', true)
}

async function focusPanel(event) {
  event.preventDefault()
  emit('open', 'keyboard')
  await nextTick()
  const items = panel.value?.querySelectorAll('a[href], button:not(:disabled)')
  const item = event.key === 'ArrowUp' ? items?.[items.length - 1] : items?.[0]
  ;(item || panel.value)?.focus()
}

function onFocusOut(event) {
  if (!root.value?.contains(event.relatedTarget)) emit('close', false)
}
</script>

<template>
  <div
    ref="root"
    class="nav-dropdown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusin="emit('cancel-close')"
    @focusout="onFocusOut"
  >
    <button
      :id="triggerId"
      class="nav-dropdown__trigger"
      type="button"
      :data-nav-trigger="menuId"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="emit('toggle', $event.detail === 0 ? 'keyboard' : 'click')"
      @keydown.down="focusPanel"
      @keydown.up="focusPanel"
    >
      {{ label }}
      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
        <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </button>
    <div
      v-if="open"
      :id="panelId"
      ref="panel"
      class="nav-dropdown__panel"
      role="region"
      :aria-labelledby="triggerId"
      tabindex="-1"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.nav-dropdown { position: relative; }
.nav-dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 50px;
  padding: 0 20px;
  border: 0;
  background: transparent;
  color: #1d1a23;
  font-size: 13px;
  font-weight: 700;
  opacity: 1;
  cursor: pointer;
}
.nav-dropdown__trigger svg { transition: transform 160ms ease; }
.nav-dropdown__trigger[aria-expanded='true'] svg { transform: rotate(180deg); }
.nav-dropdown__panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 10;
  width: min(230px, calc(100vw - 32px));
  max-height: calc(100vh - 100px);
  max-height: calc(100dvh - 100px);
  overflow-y: auto;
  padding: 20px;
  border-radius: 16px;
  color: #1d1a23;
  background: #fff;
  box-shadow: 0 12px 40px rgb(0 0 0 / 18%);
}
/* This wrapper bridges the 12px gap while the panel scroll container stays inside it. */
.nav-dropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 12px;
  pointer-events: none;
}
.nav-dropdown:has(.nav-dropdown__panel)::after { pointer-events: auto; }
@keyframes dropdown-enter {
  from { opacity: 0; transform: translate3d(0, -6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: no-preference) {
  .nav-dropdown__panel { animation: dropdown-enter 160ms ease-out; }
}
@media (prefers-reduced-motion: reduce) {
  .nav-dropdown__trigger svg { transition: none; }
}
@media (max-width: 1000px) {
  .nav-dropdown__trigger { gap: 8px; padding-inline: 13px; }
}
@media (max-width: 700px) {
  /* Anchor every panel to the shared navigation container to avoid spilling offscreen. */
  .nav-dropdown { position: static; }
  .nav-dropdown__trigger {
    min-height: 40px;
    padding-inline: 10px;
    gap: 6px;
    font-size: 11px;
  }
}
@media (max-width: 360px) {
  .nav-dropdown__trigger { padding-inline: 7px; gap: 4px; }
}
</style>
