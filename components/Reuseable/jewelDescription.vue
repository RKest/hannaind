<script setup lang="ts">
defineProps<{content: string, isVertical: boolean}>();
</script>

<template>
	<div class="description" :class="isVertical ? 'vertical' : 'horisontal'">
		<pre>{{ content }}</pre>
	</div>
</template>

<style scoped lang="scss">
$bottom-info: bottom-info;

.description {
	grid-area: $bottom-info;
}

.vertical {
	display: none;
}

.horisontal {
	display: block;
}

p {
	line-height: 1.6;
}

@media all and (orientation: portrait) {
	.vertical {
		display: block;
	}

	.horisontal {
		display: none;
	}
}
</style>