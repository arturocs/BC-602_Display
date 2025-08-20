<script lang="ts">
    import { formatDate, formatKey } from "$lib/utils";

    const { data = [], columns=[] } = $props();

    // Función para obtener las claves a mostrar
    function getColumns(format:boolean = true) {
        const f = format ? formatKey : (v: string) => v;
        if (columns.length) 
            return columns.map(f);
        if (!data?.length) 
            return [];
        return Object.keys(data[0]).map(f);
    }

    function formatValue(val: any) {
        if (val == null) return "-";
        if (typeof val === "boolean") return val ? "Yes" : "No";
        if (val instanceof Date) {
            return formatDate(val);
        }
        if (typeof val === "number") {
            return Number(val.toFixed(2));
        }
        return String(val);
    }
</script>

<div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
        <thead class="bg-base-200">
            <tr>
                {#each getColumns() as col}
                    <th class="text-sm font-bold">{col}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data as row}
                <tr>
                    {#each getColumns(false) as col}
                        <td class="text-sm">{formatValue((row as any)[col])}</td
                        >
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
