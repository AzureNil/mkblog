<script setup>
import { RouterLink } from 'vue-router'
import EntryPageShell from '@/components/site/EntryPageShell.vue'
</script>

<template>
  <EntryPageShell eyebrow="ACCOUNT / REGISTER" title="注册" description="注册页面已就位，账号创建功能暂未开放。">
    <p>当前不收集账号或密码，也不会创建用户。</p>
    <p>已有账号？<RouterLink :to="{ name: 'login' }">查看登录页面</RouterLink></p>
  </EntryPageShell>
</template>
