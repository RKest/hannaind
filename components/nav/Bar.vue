<script setup lang="ts">
const config = useRuntimeConfig();
const pageNav = usePageNav();
const nav = useNav();
const cart = useCart();
const backButton = useBackButton();
</script>

<template>
  <nav>
    <div class="cat-nav">
      <div class="nav-class-container" >
        <NuxtLink :class="!backButton.isVisible && 'invisible'" :to="backButton.to"
          class="nav-el-container page-nav">
          &blacktriangleleft;
        </NuxtLink>
      </div>
      <div class="nav-class-container">
        <div class="cart-div" v-if="!!cart.items.length">
          <span :class="cart.items.length && 'cart-not-empty'">
            <img src="/icons/cart.svg" alt="shopping cart">
          </span>
          <span>
            {{ cart.items.length }}
          </span>
        </div>
      </div>
      <NuxtLink to="/">
      </NuxtLink>
      <div v-for="filter in config.filters.slice(0, 2)" :key="filter.key" class="nav-class-container">
        <div v-for="val in filter.vals" :key="val" class="nav-el-container">
          <NavEl :nav-key="filter.key" :nav-val="val" />
        </div>
      </div>
    </div>
    <div class="page-nav-container" v-if="pageNav.nPages > 1">
      <div class="page-nav" :class="!pageNav.showDecrement && 'invisible'"
        @click="$navToPage(pageNav, pageNav.currPage - 1); $updateTo(nav, pageNav); $router.push(nav.to)">
        &blacktriangleleft;
      </div>
      <div class="page-numbers">
        <div class="page-nav" v-for="navLabel in pageNav.pageNavLabels" :key="navLabel"
          :class="pageNav.currPage === navLabel && 'curr-page'"
          @click="$navToPage(pageNav, navLabel); $updateTo(nav, pageNav); $router.push(nav.to)">
          {{ navLabel }}
        </div>
      </div>
      <div class="page-nav" :class="!pageNav.showIncrement && 'invisible'"
        @click="$navToPage(pageNav, pageNav.currPage + 1); $updateTo(nav, pageNav); $router.push(nav.to)">
        &blacktriangleright;
      </div>
    </div>
  </nav>
</template>


<style lang="scss" scoped>
* {
  font-style: normal;
}

a {
  pointer-events: all;
  color: $secondary-color;
  text-decoration: none;
}

.cart-div>span {
  height: 2rem;
  width: 2rem;
  filter: $accent-filter;
  float: right;
  font-style: italic;
}

.cart-div {
  position: absolute;
  right: 8px;
  top: 8px;
}

span>img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.nav-class-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.nav-class-container:not(:last-of-type) {
  margin-right: 2rem;
}

.nav-el-container:not(:last-of-type) {
  margin-right: 1rem;
}

.nav-el-container {
  padding: 10px 0px;
  text-decoration: none;
  color: $secondary-color;
}

.page-nav-container {
  margin: 0rem 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1rem;
}

.page-numbers {
  display: flex;
  flex-direction: row;
}

.page-nav {
  cursor: pointer;
  color: $secondary-color;
  font-style: italic;
  user-select: none;
  height: 1rem;
  width: 1rem;
}

.invisible {
  color: $main-color;
  cursor: default;
  pointer-events: none;
}

.curr-page {
  color: $accent-color;
}

.cat-nav {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

@media all and (orientation: portrait) {
  .cat-nav {
    flex-direction: column;
  }

  .nav-class-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 0rem;
  }

  .nav-class-container:not(:last-of-type) {
    margin-right: 0px;
  }

  .nav-el-container {
    padding: 3px 0px;
  }
}
</style>