<script lang="ts">
    import Checkbox from "./Checkbox.svelte";
    import type { MeasurementData } from "$lib/interfaces";
    let { items = [] as string[], selectedItems = [] as string[] } = $props();
    function toggleItem(item: string) {
        if (selectedItems.includes(item)) {
            selectedItems = selectedItems.filter((i) => i !== item);
        } else {
            selectedItems = [...selectedItems, item];
        }
    }
</script>

{#each items as item}
    <!-- <Checkbox
        checked={selectedItems.includes(item)}
        label={item}
        onchange={toggleItem}
    /> -->
    <label class="flex items-center space-x-2 cursor-pointer">
        <input
            type="checkbox"
            class="checkbox"
            checked={selectedItems.includes(item)}
            onchange={() => toggleItem(item)}
        />
        <span>{item}</span>
    </label>
{/each}
