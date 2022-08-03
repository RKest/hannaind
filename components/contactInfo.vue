<script setup lang="ts">
defineProps<{email: string, number: string}>();
</script>

<template>
	<address>
		<p>Email: {{ email }}</p>
		<p>Phone: {{ number }}</p>
	</address>
</template>


<style scoped lang="scss">
address {
	margin-top: 1rem;
}

p {
	margin: 0;
}
</style>