<script setup>
import { ref } from 'vue'
import { landingImages } from '@/data/landingImages'
import { usePhotoWallParallax } from '@/composables/usePhotoWallParallax'

const backgroundRef = ref(null)
const wallRef = ref(null)
usePhotoWallParallax(backgroundRef, wallRef)

const failedImages = ref(new Set())
function markFailed(src) {
  failedImages.value = new Set([...failedImages.value, src])
}
</script>

<template>
  <div ref="backgroundRef" class="photo-background" aria-hidden="true">
    <div ref="wallRef" class="photo-wall">
      <div
        v-for="(image, index) in landingImages"
        :key="image.id"
        class="photo-wall__tile"
        :class="{ 'photo-wall__tile--wide': image.wide }"
      >
        <img
          v-if="!failedImages.has(image.src)"
          :src="image.src"
          alt=""
          :style="{ objectPosition: image.position }"
          :fetchpriority="index === 5 ? 'high' : 'auto'"
          decoding="async"
          draggable="false"
          @error="markFailed(image.src)"
        />
      </div>
    </div>
    <div class="photo-background__shade" />
  </div>
</template>

<style scoped>
.photo-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.photo-wall {
  /* Overscan is measured by the parallax composable to prevent exposed edges. */
  position: absolute;
  inset: -18%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: clamp(12px, 1.5vw, 26px);
}
.photo-wall__tile {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: clamp(16px, 2vw, 30px);
  background: linear-gradient(135deg, #3b344c, #1d242a);
}
.photo-wall__tile--wide { grid-column: span 2; }
.photo-wall__tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.photo-background__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgb(12 10 17 / 30%), transparent 40%, rgb(12 10 17 / 28%)),
    rgb(12 10 17 / 48%);
}
@media (max-width: 700px) {
  .photo-wall {
    inset: -12% -45%;
    gap: 12px;
  }
}
</style>
