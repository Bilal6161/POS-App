<script>
    import {Modules} from '$lib/Modules';
    import {addTab} from '$lib/stores/layout'
</script>

<div class="flex flex-col w-full items-center justify-center">
    <div class="grid grid-cols-2 gap-8">
        {#each Modules as modul,index}
            {#if index != 0}
                <button
                    on:click={()=>addTab(modul)}
                    class="btn bg-orange border-none rounded-xl p-4 btn-md w-28 h-16">{modul.name}</button
                >
            {/if}
        {/each}
    </div>
</div>

