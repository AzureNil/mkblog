<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<template>
  <main class="coming-soon">
    <div>
      <p class="coming-soon__brand">MKBLOG / COMING SOON</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <RouterLink to="/">返回首页 <span aria-hidden="true">↗</span></RouterLink>
    </div>
  </main>
</template>

<style scoped>
.coming-soon {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 32px;
  background: #17141e;
}
.coming-soon__brand { color: #b18aee; font-size: 12px; letter-spacing: 0.16em; }
h1 { font-size: clamp(28px, 5vw, 56px); }
a {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 20px;
  border-radius: 10px;
  background: #b18aee;
  color: #17141e;
  font-weight: 700;
}
</style>
