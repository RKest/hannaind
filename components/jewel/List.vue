<script setup lang="ts">
defineProps<{jewels: Jewel[]}>();
</script>

<template>
  <main>
    <NuxtLink
      v-for="jewel in jewels"
      :key="jewel.id"
      :to="$jewelHref(jewel)"
    >
      <JewelEl :jewel="jewel" />
    </NuxtLink>
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 200px;
  width: 80vw;
}

main > * {
  text-decoration: none;
  color: $secondary-color;
}

@media all and (orientation: portrait) {
  main {
    width: 100%;
  }
}

</style>