<script setup>
import { RouterLink } from 'vue-router'
import NavDropdown from './NavDropdown.vue'
import logo from '@/assets/images/logo-placeholder.svg'
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
      <RouterLink class="entry entry--private" to="/login">
        PRIVATE LAB <span aria-hidden="true">↗</span>
      </RouterLink>
    </nav>
    <nav class="landing-nav__utilities" aria-label="网站选项（稍后开放）">
      <NavDropdown label="Menu"><p>菜单内容待添加</p></NavDropdown>
      <NavDropdown label="User">
        <p>登录功能暂未开放</p>
        <p>注册暂未开放</p>
      </NavDropdown>
      <NavDropdown label="Language"><p>中文（简体）</p></NavDropdown>
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
</style>
