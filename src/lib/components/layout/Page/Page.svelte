<script>
    import {MenuVisible,toggleMenu} from '$lib/stores/layout';
    import {CurrentTab} from '$lib/stores/layout'

</script>

<div class="w-full relative flex flex-col bg-gray-300">
    <div class="w-full flex min-h-8 max-h-8 sticky z-40 left-0 top-0 pl-2 gap-x-2 items-center bg-gray-200">
        {#if !$MenuVisible}
            <button
                class="group btn-menu bg-gray-800"
                on:click|preventDefault={toggleMenu}
            >
                <i class="far fa-window-restore text-sm text-[#ff5800]" />
            </button>
            <span class="self-center text-gray-800 font-bold">{$CurrentTab.name}</span>
        {/if}
        {#if $$slots.actions || $$slots.actionsEnd}
            <slot name="actions"/>
            <slot name="actionsEnd"/>
        {/if}
    </div>
    <!-- <div class="absolute mt-8 pb-8 w-full max-w-full {!$MenuVisible?'w-screen max-w-screen':''}"> -->
        <!-- <div class="h-full max-h-full overflow-auto"> -->
            <slot/>
        <!-- </div> -->
    <!-- </div> -->
</div>