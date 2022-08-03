<script setup lang="ts">
defineProps<{item: Jewel}>();
</script>

<template>
	<div class="figure-div">
		<NuxtLink :to="$jewelHref(item)" />
		<figure>
			<img :src="$imageSrc(item)" :alt="item.name" loading="eager">
			<figcaption> {{ item.name }} </figcaption>
		</figure>
	</div>
</template>

<style scoped lang="scss">
a {
	pointer-events: all;
	transform: translateX(-50%);
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 10000;
}

.figure-div{
	position: relative;
	height: $landing-el-height;
	width: $landing-el-width;
}

figure {
	position: absolute;
	height: 100%;
	width: 100%;
	margin: 0;
	background: $main-color;
}

figure > div {
	width: 100%;
	height: 200px;
}

img {
	width: 100%;
	height: 80%;
	object-fit: cover;
}

figcaption {
	font-size: 1rem;
}


@media all and (orientation: portrait) {
	.figure-div {
		height: $landing-el-height-v;
		width: $landing-el-width-v;
	}
}
</style>