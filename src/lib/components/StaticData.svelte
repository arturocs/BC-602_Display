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

<div class="card bg-base-100 shadow-xl w-full max-w-xs">
    <div class="card-body">
        <h2 class="card-title text-lg mb-2">User Information</h2>

        <div class="grid grid-cols-1 gap-4">
            <div>
                <span class="font-bold">Model:</span>
                <div>{formatText("model")}</div>
            </div>

            <div>
                <span class="font-bold">Sex:</span>
                <div>{formatText("sex")}</div>
            </div>

            <div>
                <span class="font-bold">Age:</span>
                <div>{formatNumeric("age")}</div>
            </div>

            <div>
                <span class="font-bold">Height (cm):</span>
                <div>{formatNumeric("height")}</div>
            </div>

            <div >
                <span class="font-bold">Activity level:</span>
                <div>{formatText("activity_level")}</div>
            </div>
        </div>
    </div>
</div>
