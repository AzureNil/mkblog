<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
})

const auth = useAuthStore()
const router = useRouter()

function leaveSession() {
  auth.clearSession()
  router.replace({ name: 'home' })
}
</script>

<template>
  <div class="entry-page">
    <header class="entry-page__header">
      <RouterLink class="entry-page__brand" :to="{ name: 'home' }">mkblog<span>.</span></RouterLink>
      <nav class="entry-page__nav" aria-label="页面导航">
        <RouterLink :to="{ name: 'home' }">首页</RouterLink>
        <RouterLink :to="{ name: 'blog' }">公开博客</RouterLink>
        <RouterLink :to="{ name: 'workspace' }">私人工作空间</RouterLink>
        <template v-if="!auth.isAuthenticated">
          <RouterLink :to="{ name: 'login' }">登录</RouterLink>
          <RouterLink :to="{ name: 'register' }">注册</RouterLink>
        </template>
        <template v-else>
          <span>{{ auth.user.username }} · {{ auth.user.type }}</span>
          <button type="button" @click="leaveSession">退出登录</button>
        </template>
      </nav>
    </header>
    <main class="entry-page__main">
      <p class="entry-page__eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="entry-page__description">{{ description }}</p>
      <div class="entry-page__content"><slot /></div>
      <RouterLink class="entry-page__return" :to="{ name: 'home' }">返回首页 <span aria-hidden="true">↗</span></RouterLink>
    </main>
  </div>
</template>

<style scoped>
.entry-page {
  min-height: 100vh;
  min-height: 100dvh;
  background: #17141e;
  color: #fff;
}
.entry-page__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px clamp(20px, 5vw, 72px);
  border-bottom: 1px solid #ffffff12;
}
.entry-page__brand { font-size: 26px; font-weight: 800; }
.entry-page__brand span { color: #b18aee; }
.entry-page__nav { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; font-size: 13px; }
.entry-page__nav a { color: #d1cadb; }
.entry-page__nav a.router-link-exact-active { color: #c2ef83; }
.entry-page__nav button { padding: 0; color: #d1cadb; border: 0; background: none; cursor: pointer; }
.entry-page__main { max-width: 880px; margin: 0 auto; padding: clamp(48px, 12vh, 120px) 24px 48px; }
.entry-page__eyebrow { margin: 0 0 20px; color: #b18aee; font-size: 12px; letter-spacing: 0.16em; }
h1 { margin: 0 0 20px; font-size: clamp(30px, 5vw, 60px); line-height: 1.2; overflow-wrap: anywhere; }
.entry-page__description { max-width: 620px; color: #c6bfce; line-height: 1.8; }
.entry-page__content { margin: 32px 0; padding: 24px; border: 1px solid #ffffff18; border-radius: 16px; background: #ffffff04; line-height: 1.8; }
.entry-page__content :deep(p) { margin: 0 0 12px; }
.entry-page__content :deep(p:last-child) { margin-bottom: 0; }
.entry-page__content :deep(a) { color: #c2ef83; text-decoration: underline; text-underline-offset: 4px; }
.entry-page__return { display: inline-flex; align-items: center; gap: 28px; padding: 14px 20px; border-radius: 10px; background: #b18aee; color: #17141e; font-weight: 700; }
@media (max-width: 700px) {
  .entry-page__header { gap: 16px; padding-block: 20px; }
  .entry-page__nav { gap: 12px 16px; line-height: 1.8; }
  .entry-page__content { padding: 20px; }
}
</style>
