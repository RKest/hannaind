<script setup lang="ts">
import config from "@/config";

definePageMeta({
  layout: "landing"
});

const imageSrcs = config.landingBgImagePaths.slice(0, -1);
const items = await Promise.all(
  config.landingFetchPaths.map(async (path) => (await $fetch(path)).jewels.slice(0, 3))
);
const backButton = useBackButton();
</script>

<template>
  <div class="main" id="scene">
    <section v-for="(src, index) in imageSrcs" :key="src">
      <LandingPanel :background-image-src="src" :foreground-items="items[index]" />
    </section>
    <section>
      <LandingFooter :background-image-src="config.landingBgImagePaths.at(-1)">
        <NuxtLink to="/search/1" :prefetch="true" @click="backButton.isVisible = false">
          <img src="/icons/cart.svg" alt="shopping cart">
        </NuxtLink>
      </LandingFooter>
    </section>
  </div>
</template>

<style lang="scss">
body {
  margin: 0px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: $main-color;
}

::-webkit-scrollbar-thumb {
  background: $secondary-color;
}

::-webkit-scrollbar-thumb:hover {
  background: $accent-color;
}

* {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: $secondary-color;
}
</style>

<style scoped lang="scss">
* {
  color: $main-color;
}

a {
  pointer-events: all;
}

.main {
  position: relative;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  perspective: 300px;
  height: 100vh;
  overflow-y: scroll;
  font-size: 5rem;
  color: $main-color;

  //Firefox
  scrollbar-color: $main-color $secondary-color;
}

section {
  @include align-center;
  height: 100vh;
  position: relative;
  transform-style: preserve-3d;
  scroll-snap-align: start;
}

a>img {
  filter: $main-filter;
}
</style>