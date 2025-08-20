<script lang="ts">
    import LineChart1 from "$lib/components/LineChart1.svelte";
        import LineChart2 from "$lib/components/LineChart2.svelte";

    import UploadButton from "$lib/components/UploadButton.svelte";
    import "../app.css";
    let measurements = $state([]);
    $effect(() => {
        console.log("Measurements updated:", measurements);
    });
</script>

<UploadButton bind:measurements></UploadButton>

<LineChart1
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
></LineChart1>

<LineChart1
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
></LineChart1>

<LineChart2
    {measurements}

></LineChart2>
