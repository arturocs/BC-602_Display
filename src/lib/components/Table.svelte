<script lang="ts">
    import { formatValue, getColumns, getUnits } from "$lib/utils";
    const { data = [], columns = [] } = $props();
    let reversed_data = $derived(data.slice().reverse());
</script>

<div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
        <thead class="bg-base-200">
            <tr>
                {#each getColumns(columns, data) as col}
                    <th class="text-sm font-bold">{col}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each reversed_data as row}
                <tr>
                    {#each getColumns(columns, data, false) as col}
                        <td class="text-sm">{formatValue((row as any)[col])}</td
                        >
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
