<script setup lang="ts">
type NavProps = {
  navKey: keyof INav;
  navVal: INav[keyof INav];
};

const nav = useNav();
const pageNav = usePageNav();
defineProps<NavProps>();
</script>

<template>
  <span>
    <div
      class="nav-el"
      :class="nav[navKey] === navVal && 'selected'"
      @click="$toggleNav(nav, pageNav, navKey, navVal); $router.push(nav.to)"
    >
      {{ navVal }}
    </div>
  </span>
</template>

<style lang="scss" scoped>

.nav-el {
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: $secondary-color;
}

.selected {
  color: $accent-color;
}
</style>
