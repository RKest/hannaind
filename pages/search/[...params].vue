<script setup lang="ts">
const route = useRoute();
const params: any = route.params.params;
const isAnyParams = !!params;
const searchTerms = isAnyParams ? params.join('/') : ''
const { jewels, noJewels } = await $fetch(`/api/search/${searchTerms}`);
const pageNav = usePageNav();
const { $setNoPages } = useNuxtApp();
$setNoPages(pageNav.value, noJewels);
</script>

<template>
    <JewelList :jewels="jewels" />
</template>
