<template>
  <div class="headline-position">
    <h1 class="headline"><span>ever</span><span class="headline__accent">higher.</span></h1>
  </div>
</template>

<style scoped>
.headline-position {
  position: absolute;
  inset: 100px 24px 70px;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.headline {
  margin: 0;
  font-family: 'Arial Black', 'Helvetica Neue', Arial, sans-serif;
  font-size: min(16.5vw, 27vh, 250px);
  font-size: min(16.5vw, 27dvh, 250px);
  font-weight: 900;
  line-height: 0.82;
  letter-spacing: -0.075em;
  text-align: center;
}
.headline span { display: block; }
.headline__accent { color: #a87aee; }
@media (max-width: 700px) {
  .headline-position { inset: 150px 16px 70px; }
  .headline {
    font-size: min(23vw, 20vh);
    font-size: min(23vw, 20dvh);
  }
}
@media (max-height: 450px) {
  .headline-position { inset: 76px 16px 38px; }
  .headline {
    font-size: min(17vw, 25vh);
    font-size: min(17vw, 25dvh);
  }
}
@media (max-width: 700px) and (max-height: 450px) {
  .headline-position { inset-block-start: 112px; }
  .headline {
    font-size: min(23vw, 21vh);
    font-size: min(23vw, 21dvh);
  }
}

@keyframes headline-enter {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: no-preference) {
  .headline { animation: headline-enter 700ms cubic-bezier(0.22, 1, 0.36, 1) backwards; }
}
</style>
