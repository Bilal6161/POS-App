<script>
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
</script>

<div class="w-screen min-w-screen max-w-screen h-screen min-h-screen max-h-screen overflow-hidden">
	<Header />
	<slot/>
</div>