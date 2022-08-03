<script setup lang="ts">
defineProps<{ backgroundImageSrc: string, foregroundItems: Jewel[] }>();
</script>


<template>
	<section class="parallax-layer base-layer">
		<img :src="backgroundImageSrc" alt="src">
	</section>
	<section class="parallax-layer left-layer">
		<LandingEl :item="foregroundItems[0]" />
	</section>
	<section class="parallax-layer mid-layer">
		<LandingEl :item="foregroundItems[1]" />
	</section>
	<section class="parallax-layer right-layer">
		<LandingEl :item="foregroundItems[2]" />
	</section>
</template>

<style scoped lang="scss">
$mlanding-el-height-v: -$landing-el-height-v;
$mlanding-el-width: - $landing-el-width;

$ver-gap: 10px;

.parallax-layer {
	@include align-center;
	pointer-events: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.left-layer {
	transform: translateZ(210px) scale(0.3) translateX(calc($mlanding-el-width - $ver-gap))
}

.mid-layer {
	transform:
		translateZ(150px) scale(0.5)
}

.right-layer {
	transform:
		translateZ(270px) scale(0.1) translateX(calc($landing-el-width + $ver-gap));
}

@media all and (orientation: portrait) {
	.left-layer {
		transform: translateZ(210px) scale(0.3) translateY(calc($mlanding-el-height-v - $ver-gap))
	}

	.right-layer {
		transform: translateZ(270px) scale(0.1) translateY(calc($landing-el-height-v + $ver-gap))
	}
}

//Targeting only chromium browsers 'cause their s is fd
@supports (contain: paint) and (not (-moz-appearance: none)) {
	$hor-mid-x-val: 10px;
	$hor-rig-x-vl: 67px;

	$ver-lef-x-val: 17px;
	$ver-rig-x-val: 50px;

	.left-layer {
		transform: translateZ(210px) scale(0.3) translateX(- $landing-el-width)
	}

	.mid-layer {
		transform:
			translateZ(150px) scale(0.5) translateX($hor-mid-x-val);
	}

	.right-layer {
		transform:
			translateZ(270px) scale(0.1) translateX(calc($landing-el-width + $hor-rig-x-vl));
	}

	@media all and (orientation: portrait) {
		.left-layer {
			transform: translateZ(210px) scale(0.3) translateY(calc($mlanding-el-height-v - $ver-gap)) translateX($ver-lef-x-val);
		}

		.right-layer {
			transform: translateZ(270px) scale(0.1) translateY(calc($landing-el-height-v + $ver-gap)) translateX($ver-rig-x-val);
		}
	}

}
</style>