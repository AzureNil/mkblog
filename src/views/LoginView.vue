<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import EntryPageShell from '@/components/site/EntryPageShell.vue'

const route = useRoute()
const awaitingWorkspace = computed(() =>
  typeof route.query.redirect === 'string' &&
  /^\/workspace(?:[?#]|$)/.test(route.query.redirect),
)
</script>

<template>
  <EntryPageShell eyebrow="ACCOUNT / LOGIN" title="登录" description="登录页面已就位，认证服务将在后续阶段接入。">
    <p v-if="awaitingWorkspace">私人工作空间需要登录后访问。</p>
    <p>当前尚未接入登录服务，暂时无法登录。此处不会创建模拟身份。</p>
    <p>还没有账号？<RouterLink :to="{ name: 'register' }">查看注册页面</RouterLink></p>
  </EntryPageShell>
</template>
