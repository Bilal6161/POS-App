<script>
    import {Page} from '$lib/components/layout/Page';
    import {Grid, GridHeader} from '$lib/components/ui/grid';
    import {structure} from '$lib/structure';
    import data from '$lib/data';
    let hiddenGrid;
</script>
<Page>
    <svelte:fragment slot="actions">
        <GridHeader bind:hiddenGrid={hiddenGrid}/>
    </svelte:fragment>
    <div class="absolute left-0 top-8 w-full h-full overflow-auto">
        <Grid {structure} {data} bind:hiddenGrid={hiddenGrid}/>
    </div>
</Page>