<script setup lang="ts">
import { RouteLocationNormalizedLoaded } from 'vue-router';

useHead({
  title: "Hello",
  link: [{ rel: 'icon', type: 'image/png', href: '/icons/favicon.png' }]
});

const router = useRouter();
const route = useRoute();
const { $routeParamsFromParamsArray, $pageFromParamsArray, $navToPage, $updateTo } = useNuxtApp();

const setNavVals = (route: RouteLocationNormalizedLoaded) => {
  if (!route.name.toString().startsWith("search")){
    return;
  }
  const params = route.params.params as string[];
  const nav = useNav();
  const pageNav = usePageNav();
  const filteredParams = $routeParamsFromParamsArray(params);
  const page = $pageFromParamsArray(params);
  Object.keys(filteredParams).forEach(key => nav.value[key] = filteredParams[key]);
  $navToPage(pageNav.value, page);
  $updateTo(nav.value, pageNav.value);
}

setNavVals(route);
router.beforeEach((to, from) => {
  const backButton = useBackButton();
  if (to.fullPath === '/search/1') {
    backButton.value.isVisible = false;
  } else {
    backButton.value.isVisible = true;
  }
  if (to.fullPath.startsWith('/search') && to.fullPath != '/search/1') {
    backButton.value.to = '/search/1';
  } else {
    backButton.value.to = from.fullPath;
  }
  setNavVals(to);
});

</script>

<template>
  <div class="main">
    <h1>Hanna Ind</h1>
    <NavBar />
    <slot />

    <ContactInfo email="name@domain.com" number="+xx xxx xxx xxx" />
  </div>
</template>


<style lang="scss" scoped>
h1 {
  font-size: 1rem;
  margin-top: 8px;
  margin-bottom: 0px;
}

.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 1rem - 16px);
  height: max-content;
}

@media all and (orientation: portrait) {
  .main {
    flex-direction: column;
    min-height: none;
  }
}
</style>
