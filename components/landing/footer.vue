<script setup lang="ts">
defineProps<{backgroundImageSrc: string}>();
</script>


<template>
	<div class="parallax-layer base-layer">
		<img :src="backgroundImageSrc" alt="src">
	</div>
	<div class="parallax-layer top-layer">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.parallax-layer {
	@include align-center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.top-layer {
	transform: translateZ(210px) scale(0.3);
}


img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>