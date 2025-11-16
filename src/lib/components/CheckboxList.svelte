<script lang="ts">
    import { formatKey } from "$lib/utils";

    let { items = [] as string[], selectedItems = [] as string[] } = $props();
    function toggleItem(item: string) {
        if (selectedItems.includes(item)) {
            selectedItems = selectedItems.filter((i) => i !== item);
        } else {
            selectedItems = [...selectedItems, item];
        }
    }
</script>

<div class=" max-w-1/8 bg-base-100 shadow m-8 p-4 rounded">
    {#each items as item}
        <label
            class="flex items-center space-x-2 cursor-pointer px-2 py-1 hover:bg-base-200 rounded"
        >
            <input
                type="checkbox"
                class="checkbox"
                checked={selectedItems.includes(item)}
                onchange={() => toggleItem(item)}
            />
            <span>{formatKey(item)}</span>
        </label>
    {/each}
</div>
