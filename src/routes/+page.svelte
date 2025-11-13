<script lang="ts">
    import DownloadButton from "$lib/components/DownloadButton.svelte";
    import LineChart from "$lib/components/LineChart.svelte";
    import StaticData from "$lib/components/StaticData.svelte";
    import Table from "$lib/components/Table.svelte";

    import UploadButton from "$lib/components/UploadButton.svelte";
    import "../app.css";
    let measurements = $state([]);
    $effect(() => {
        console.log("Measurements updated:", measurements);
    });
</script>

<UploadButton bind:measurements></UploadButton>

<LineChart
    title="Weight and Muscle Composition (Kg)"
    data={measurements}
    keys={[
        "total_weight",
        "total_muscle",
        "right_arm_muscle",
        "left_arm_muscle",
        "right_leg_muscle",
        "left_leg_muscle",
        "trunk_muscle",
        "bone_mass",
    ]}
></LineChart>

<LineChart
    title="Fat Percentage and Distribution"
    data={measurements}
    keys={[
        "total_fat",
        "right_arm_fat",
        "left_arm_fat",
        "right_leg_fat",
        "left_leg_fat",
        "trunk_fat",
        "water",
    ]}
></LineChart>

<StaticData data={measurements}></StaticData>

<Table data={measurements} />

{#if measurements.length > 0}
    <DownloadButton data={measurements}></DownloadButton>
{/if}
