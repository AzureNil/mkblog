<script setup>
defineProps({
  label: { type: String, required: true },
})
</script>

<template>
  <div class="nav-dropdown">
    <!-- Static first phase. Enable interaction and expanded-state semantics together later. -->
    <button class="nav-dropdown__trigger" type="button" disabled :aria-label="label + '，稍后开放'">
      {{ label }}
      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
        <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </button>
    <div class="nav-dropdown__panel" hidden><slot /></div>
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
  cursor: default;
}
.nav-dropdown__panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 10;
  width: 230px;
  padding: 20px;
  border-radius: 16px;
  color: #1d1a23;
  background: #fff;
  box-shadow: 0 12px 40px rgb(0 0 0 / 18%);
}
@media (max-width: 1000px) {
  .nav-dropdown__trigger { gap: 8px; padding-inline: 13px; }
}
@media (max-width: 700px) {
  .nav-dropdown__trigger {
    min-height: 40px;
    padding-inline: 10px;
    gap: 6px;
    font-size: 11px;
  }
}
</style>
