<script setup lang="ts">
interface TextInpProps {
	obj: any;
	objkey: string;
	name?: string;
}
const props = defineProps<TextInpProps>();

const updateValue = (ev: Event) => {
	const target = ev.target as HTMLInputElement;
	props.obj[props.objkey] = target.value;
}

</script>

<template>
	<input 
		:name="name ?? objkey" 
		type="text"
		@input="updateValue" 
		:value="obj[objkey]" 
		:placeholder="objkey"
	>
</template>

<style scoped lang="scss">
input {
	border: none;
	color: $secondary-color;
	font-size: x-large;
	padding: 0.25rem;
}

input:focus {
	outline: none;
}
</style>