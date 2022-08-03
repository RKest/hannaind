<script setup lang='ts'>
defineProps<{item: Jewel}>();
</script>

<template>
	<div class="item">
		<div class="figure">
			<img :src="$imageSrc(item)" :alt="item.name">
		</div>
		<div class="info">
			<p>{{ item.name }}</p>
			<p>{{ item.price }}zł</p>
		</div>
	</div>
</template>

<style scoped lang='scss'>

.item {
	background: $main-color;
	height: 26vh;
	width: 26vw;
}

.figure{
	height: 80%;
}

.info {
	height: min-content;
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}


p {
	margin: 0px;
	font-size: small;
}

</style>