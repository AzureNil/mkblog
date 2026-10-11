<script setup>
import { RouterLink } from 'vue-router'
import EntryPageShell from '@/components/site/EntryPageShell.vue'
</script>

<template>
  <EntryPageShell eyebrow="404 / PAGE NOT FOUND" title="页面不存在" description="这个地址没有对应的页面，可能已被移动，或者链接有误。">
    <p>你可以返回首页，或前往<RouterLink :to="{ name: 'blog' }">公开博客</RouterLink>。</p>
  </EntryPageShell>
</template>
