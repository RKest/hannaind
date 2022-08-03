<script setup lang="ts">
useHead({
  title: "Hello",
  link: [{ rel: 'icon', type: 'image/png', href: '/icons/favicon.png' }],
})
</script>

<template>
  <div class="head">
    <h1>Hanna Ind</h1>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  position: absolute;
  left: 0;
  right: 0;
  mix-blend-mode: difference;
  z-index: 10;
  font-size: 1rem;
  margin: 8px 0px;
}

.head {
  color: $secondary-color;
  text-align: center;
}
</style>
