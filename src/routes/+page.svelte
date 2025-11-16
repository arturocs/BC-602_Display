<script lang="ts">
    import CheckboxList from "$lib/components/CheckboxList.svelte";
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

<header class="navbar mb-4">
    <div class="flex-1 ml-4">
        <span class="font-bold text-xl">BC-602 Data Viewer</span>
    </div>
</header>

<UploadButton bind:measurements/>

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
/>

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
    height={500}
/>

<StaticData data={measurements}/>

<CheckboxList items={ [  
    "model",
    "date",
    "guest",
    "sex",
    "age",
    "height",
    "activity_level",
    "total_weight",
    "bmi",
    "total_fat",
    "right_arm_fat",
    "left_arm_fat",
    "right_leg_fat",
    "left_leg_fat",
    "trunk_fat",
    "total_muscle",
    "right_arm_muscle",
    "left_arm_muscle",
    "right_leg_muscle",
    "left_leg_muscle",
    "trunk_muscle",
    "bone_mass",
    "visceral_fat",
    "daily_calorie_intake",
    "metabolic_age",
    "water",
]}/>

<Table
    columns={[
        "date",
        "total_weight",
        "bmi",
        "total_fat",
        "right_arm_fat",
        "left_arm_fat",
        "right_leg_fat",
        "left_leg_fat",
        "trunk_fat",
        "total_muscle",
        "right_arm_muscle",
        "left_arm_muscle",
        "right_leg_muscle",
        "left_leg_muscle",
        "trunk_muscle",
        "bone_mass",
        "visceral_fat",
        "daily_calorie_intake",
        "metabolic_age",
        "water",
    ]}
    data={measurements}
/>

{#if measurements.length > 0}
    <DownloadButton data={measurements}/>
{/if}
