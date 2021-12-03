<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
	import ViewHandler from '../components/ViewHandler.svelte';
	import {CurrentTab} from '$lib/store';

	let currenttab;
	CurrentTab.subscribe(value => {
		currenttab = value
	})
</script>

<Header />
<!-- {#if}
{/if} -->
<slot />
