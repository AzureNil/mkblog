<script setup>
import PhotoWall from '@/components/landing/PhotoWall.vue'
import LandingNav from '@/components/landing/LandingNav.vue'
import LandingHeadline from '@/components/landing/LandingHeadline.vue'
</script>

<template>
  <main class="landing">
    <PhotoWall />
    <LandingNav />
    <LandingHeadline />
    <p class="landing__note">Explore. Create. Evolve.</p>
  </main>
</template>

<style scoped>
.landing {
  /* Only the absolute background overscans; it never enlarges the document. */
  position: relative;
  isolation: isolate;
  height: 100vh;
  height: 100dvh;
  background: #141317;
}
.landing__note {
  position: absolute;
  z-index: 1;
  left: max(36px, env(safe-area-inset-left));
  bottom: max(28px, env(safe-area-inset-bottom));
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
@media (max-width: 700px) {
  .landing__note {
    left: max(20px, env(safe-area-inset-left));
    bottom: max(24px, env(safe-area-inset-bottom));
    font-size: 11px;
  }
}
@media (max-height: 450px) {
  .landing__note { bottom: max(12px, env(safe-area-inset-bottom)); }
}
</style>
