<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavDropdown from './NavDropdown.vue'
import logo from '@/assets/images/logo-placeholder.svg'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const utilities = ref(null)
const activeMenu = ref(null)
const CLOSE_DELAY = 150
let closeTimer
let openReason = null

function cancelClose() {
  clearTimeout(closeTimer)
  closeTimer = undefined
}

function closeMenu() {
  cancelClose()
  activeMenu.value = null
  openReason = null
}

function openMenu(id, reason) {
  cancelClose()
  if (activeMenu.value !== id || reason !== 'hover') openReason = reason
  activeMenu.value = id
}

function toggleMenu(id, reason) {
  // Hover may already have opened the panel before the first mouse click.
  // That first click keeps it open; another click toggles it closed.
  if (activeMenu.value === id && openReason !== 'hover') closeMenu()
  else openMenu(id, reason)
}

function requestClose(id, delayed) {
  cancelClose()
  if (activeMenu.value !== id) return
  if (delayed) {
    closeTimer = setTimeout(() => {
      if (activeMenu.value === id) closeMenu()
    }, CLOSE_DELAY)
  } else closeMenu()
}

function onOutsidePointerDown(event) {
  if (!utilities.value?.contains(event.target)) closeMenu()
}

function onEscape(event) {
  if (event.key !== 'Escape' || !activeMenu.value) return
  const trigger = utilities.value?.querySelector('[data-nav-trigger="' + activeMenu.value + '"]')
  event.preventDefault()
  closeMenu()
  trigger?.focus()
}

onMounted(() => {
  document.addEventListener('pointerdown', onOutsidePointerDown, true)
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  cancelClose()
  document.removeEventListener('pointerdown', onOutsidePointerDown, true)
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <header class="landing-nav">
    <RouterLink class="landing-nav__logo" to="/" aria-label="mkblog 首页">
      <img :src="logo" width="106" height="40" alt="mkblog" />
    </RouterLink>
    <nav class="landing-nav__entries" aria-label="网站入口">
      <RouterLink class="entry entry--public" to="/blog">
        PUBLIC BLOG <span aria-hidden="true">↗</span>
      </RouterLink>
      <RouterLink class="entry entry--private" to="/workspace">
        PRIVATE LAB <span aria-hidden="true">↗</span>
      </RouterLink>
    </nav>
    <nav ref="utilities" class="landing-nav__utilities" aria-label="网站选项">
      <NavDropdown
        label="MENU"
        menu-id="menu"
        :open="activeMenu === 'menu'"
        @open="openMenu('menu', $event)"
        @toggle="toggleMenu('menu', $event)"
        @close="requestClose('menu', $event)"
        @cancel-close="cancelClose"
      >
        <p class="dropdown-placeholder">导航内容待添加</p>
      </NavDropdown>
      <NavDropdown
        label="User"
        menu-id="user"
        :open="activeMenu === 'user'"
        @open="openMenu('user', $event)"
        @toggle="toggleMenu('user', $event)"
        @close="requestClose('user', $event)"
        @cancel-close="cancelClose"
      >
        <!-- A future authenticated parent can supply this slot using real user state. -->
        <slot name="user">
          <template v-if="!auth.isAuthenticated">
            <RouterLink class="dropdown-item" to="/login" @click="closeMenu">登录</RouterLink>
            <RouterLink class="dropdown-item" to="/register" @click="closeMenu">注册</RouterLink>
          </template>
          <template v-else>
            <p class="dropdown-placeholder">{{ auth.user.username }}</p>
            <p class="dropdown-placeholder">用户类型：{{ auth.user.type }}</p>
            <button class="dropdown-item" type="button" @click="auth.clearSession(); closeMenu()">退出登录</button>
          </template>
        </slot>
      </NavDropdown>
      <NavDropdown
        label="Language"
        menu-id="language"
        :open="activeMenu === 'language'"
        @open="openMenu('language', $event)"
        @toggle="toggleMenu('language', $event)"
        @close="requestClose('language', $event)"
        @cancel-close="cancelClose"
      >
        <p class="dropdown-language"><span aria-hidden="true">✓</span> 中文（简体）<span class="visually-hidden">，已选中</span></p>
      </NavDropdown>
    </nav>
  </header>
</template>

<style scoped>
.landing-nav {
  position: absolute;
  z-index: 3;
  top: max(28px, env(safe-area-inset-top));
  left: max(36px, env(safe-area-inset-left));
  right: max(36px, env(safe-area-inset-right));
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 24px;
}
.landing-nav__logo { display: flex; align-items: center; }
.landing-nav__logo img { display: block; width: 106px; height: 40px; }
.landing-nav__entries { display: flex; gap: 10px; }
.entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  min-height: 50px;
  padding: 0 20px;
  border-radius: 12px;
  color: #17131d;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.015em;
  white-space: nowrap;
}
.entry--public { background: #b18aee; }
.entry--private { background: #c2ef83; }
.entry span { font-size: 20px; font-weight: 400; }
.entry:hover { filter: brightness(1.08); }
.landing-nav__utilities {
  position: relative;
  justify-self: end;
  display: flex;
  border-radius: 12px;
  background: #fff;
}
.landing-nav__utilities > :not(:first-child) { border-left: 1px solid #ebe8ef; }
@media (max-width: 1000px) {
  .landing-nav { gap: 16px; left: 24px; right: 24px; }
  .entry { gap: 12px; padding-inline: 14px; font-size: 11px; }
}
@media (max-width: 700px) {
  .landing-nav {
    top: max(20px, env(safe-area-inset-top));
    left: max(16px, env(safe-area-inset-left));
    right: max(16px, env(safe-area-inset-right));
    grid-template-columns: auto 1fr;
    gap: 16px 8px;
  }
  .landing-nav__logo img { width: 76px; height: 30px; }
  .landing-nav__utilities { grid-column: 2; grid-row: 1; border-radius: 10px; }
  .landing-nav__entries { grid-column: 1 / -1; grid-row: 2; }
  .entry {
    min-height: 42px;
    flex: 1;
    padding-inline: 14px;
    border-radius: 10px;
    font-size: 10px;
  }
}
@media (max-height: 450px) {
  .landing-nav { top: max(12px, env(safe-area-inset-top)); row-gap: 8px; }
}

@keyframes nav-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: no-preference) {
  .landing-nav { animation: nav-enter 600ms ease-out 250ms backwards; }
}

.dropdown-placeholder { margin: 0; font-size: 13px; color: #6b6573; }
.dropdown-item {
  display: block;
  width: 100%;
  padding: 12px 10px;
  border: 0;
  border-radius: 8px;
  text-align: left;
  color: #1d1a23;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}
.dropdown-item:hover:not(:disabled),
.dropdown-item:focus-visible { background: #f3edf9; }
.dropdown-item:disabled { color: #817a8a; cursor: not-allowed; }
.dropdown-language {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0;
  font-size: 14px;
}
.dropdown-language > [aria-hidden] { color: #8050bb; font-weight: 700; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
