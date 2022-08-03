<script setup lang="ts">
const { $imageSrcs } = useNuxtApp();
const id = useRoute().params.id as Jewel['id'];
const item: Jewel = await $fetch(`/api/items/${id}`);
const imageSrcs = $imageSrcs(item);
const cart = useCart();
const imageExpansion = useImageExpansion();
</script>

<template>
  <main>
    <div class="overlay" :class="imageExpansion.isExpanded && 'expanded'" @click="$collapseImage">
      <img class="expanded-image" :src="imageExpansion.imageSrc" />
    </div>
    <section class="informtion-bar">
      <div class="info">
        <h2>{{ item.name }}</h2>
        <h3>{{ $jewelPrice(item) }}zł</h3>
      </div>
      <div v-if="!cart.items.includes(item)" class="cart-btn" @click="$addToCart(item)">
        Add to cart
      </div>
      <div v-else class="cart-btns-container">
        <div class="cart-btn remove-cart" @click="$removeFromCart(item)">
          Remove from cart
        </div>
        <NuxtLink class="cart-btn go-to-cart" to="/cart">
          <img src="/icons/cart.svg" alt="Go to cart" class="cart-image">
        </NuxtLink>
      </div>
      <ReuseableJewelDescription :is-vertical="false" :content="item.disciption" />
    </section>
    <section class="slider">
      <div class="slides">
        <div v-for="src in imageSrcs" :key="src" @click="$expandImage(src)">
          <img :src="src" alt="" defer>
        </div>
      </div>
    </section>
    <section class="gallery">
      <div v-for="(src, index) in imageSrcs" :key="src" @click="$scrollToImage(index)">
        <img :src="src" alt="Not found">
      </div>
    </section>
    <ReuseableJewelDescription :is-vertical="true" :content="item.disciption" />
  </main>
</template>

<style scoped lang="scss">
$main-image-min-height: 250px;
$main-image-max-height: 1100px;
$main-image-height: 35vw;

$slider-min-height: 60px;
$slider-height: 10vw;
$slider-max-height: 240px;

$main-image-min-width: 500px;
$main-image-width: 60vw;
$main-image-max-width: 1800px;

$left-info: left-info;
$bottom-info: bottom-info;
$main-image: main-image;
$gallery: gallery;

$image-dims: calc(100%);

@mixin clamp-width($min, $pref, $max) {
  min-width: $min;
  width: $pref;
  max-width: $max;
}

@mixin clamp-height($min, $pref, $max) {
  min-height: $min;
  height: $pref;
  max-height: $max;
}

* {
  color: $secondary-color;
}

h3 {
  margin-bottom: 0px;
}

.overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  cursor: pointer;
}

.overlay.expanded {
  display: block;
}

.expanded-image {
  width: $image-dims;
  height: $image-dims;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  object-fit: contain;
}

.informtion-bar {
  height: min-content;
  grid-area: $left-info;
}

.cart-btn {
  user-select: none;
  border: 1px solid gray;
  text-align: center;
  cursor: pointer;
  padding: 8px;
  margin: 8px;
}

.remove-cart {
  flex: 1;
}

.cart-btns-container {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
}

.cart-btn:hover {
  border: 2px solid $secondary-color;
  margin: 7px;
}

.go-to-cart {
  padding: 0;
  position: relative;
  width: 34px;
}

.cart-image {
  filter: $accent-filter;
  top: 8px;
  left: 8px;
  height: 18px;
  width: 18px;
  object-fit: contain;
}


.slider {
  grid-area: $main-image;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.slides {
  @include clamp-width($main-image-min-width,
    $main-image-width,
    $main-image-max-width );
  display: flex;
  scroll-snap-type: x mandatory;
  height: min-content;
  overflow-x: hidden;
}

.slides>div {
  @include clamp-height($main-image-min-height,
    $main-image-height,
    $main-image-max-height );
  @include clamp-width($main-image-min-width,
    $main-image-width,
    $main-image-max-width );
  scroll-snap-align: start;
  flex-shrink: 0;
  margin-right: 1rem;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gallery {
  background: transparent;
  height: min-content;
  gap: 1rem;
  grid-area: $gallery;
  display: flex;
}

.gallery>div {
  @include clamp-height($slider-min-height,
    $slider-height,
    $slider-max-height );
  display: inline-flex;
  flex: 1;
  background: $main-color;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  position: relative;
}

main {
  padding: 8px 0px;
  display: grid;
  grid-template-columns: 20vw $main-image-width;
  grid-template-rows: $main-image-height;
  grid-auto-rows: min-content;
  grid-template-areas: "#{$left-info} #{$main-image}"
  "#{$left-info} #{gallery}"
  "#{$left-info} #{$bottom-info}";
  row-gap: 1rem;
  column-gap: 2rem;
  justify-content: center;
}

@media all and (orientation: portrait) {
  main {
    justify-content: center;
    grid-template-rows:
      auto $main-image-height auto auto;
    grid-template-columns: 80vw;
    grid-template-areas: "#{$left-info}"
    "#{$main-image}"
    "#{$gallery}"
    "#{$bottom-info}";
  }

  .informtion-bar {
    box-shadow: -$accent-line-width 0px $secondary-color;
    padding-left: 8px;
  }
}
</style>
