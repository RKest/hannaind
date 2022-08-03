<script setup lang="ts">
defineProps<{jewel: Jewel}>();
</script>

<template>
  <div class="item-image-container">
    <img :src="$imageSrc(jewel)" :alt="jewel.id" />
    <p>{{ $jewelPrice(jewel) }}zl</p>
  </div>
</template>

<style lang="scss" scoped>
.item-image-container {
  position: relative;
  height: 200px;
}

.item-image-container > p {
  margin: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px;
  background: $main-color;
}

.item-info {
  vertical-align: bottom;
  display: table-cell;
  flex: 1;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>