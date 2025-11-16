<script lang="ts">
    import type { MeasurementData } from "$lib/interfaces";

    const { data = [] } = $props();

    function uniqueValues<T>(
        arr: MeasurementData[],
        key: keyof MeasurementData,
    ): T[] {
        const vals = arr.map((d) => d[key]).filter((v) => v != null);
        return Array.from(new Set(vals)) as T[];
    }

    function formatNumeric(key: keyof MeasurementData) {
        const vals = data
            .map((d) => d[key])
            .filter((v) => typeof v === "number") as number[];
        if (!vals.length) return "-";
        const min = Math.min(...vals);
        const max = Math.max(...vals);
        return min === max ? `${min}` : `${min} - ${max}`;
    }

    function formatText(key: keyof MeasurementData) {
        const vals = uniqueValues<string>(data, key);
        if (!vals.length) return "-";
        return vals.length === 1 ? vals[0] : vals.join(", ");
    }
</script>

<div class="card bg-base-100 shadow max-w-fit m-8">
    <div class="card-body m-2">
        <h2 class="card-title text-lg mb-2">User Information</h2>

        <div class="grid grid-cols-5 gap-8">
            <div class="flex">
                <span class="font-bold mr-4">Model:</span>
                <span>{formatText("model")}</span>
            </div>

            <div class="flex">
                <span class="font-bold mr-4">Sex:</span>
                <span>{formatText("sex")}</span>
            </div>

            <div class="flex">
                <span class="font-bold mr-4">Age:</span>
                <span>{formatNumeric("age")}</span>
            </div>

            <div class="flex">
                <span class="font-bold mr-4">Height (cm):</span>
                <span>{formatNumeric("height")}</span>
            </div>

            <div class="flex">
                <span class="font-bold mr-4">Activity level:</span>
                <span>{formatText("activity_level")}</span>
            </div>
        </div>
    </div>
</div>
