<template>
	<div class="moki-container">
		<div class="wrapper">
			<div class="moki-header">
				<span>{{ date }}</span>
				<span>{{ location }}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'indexPage',
		data() {
			return {
				date: new Date().toDateString(),
				location: '上海市'
			}
		}
	}
</script>