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
    data={measurements}
    keys={[
        "weight",
        "muscle_body",
        "muscle_right_arm",
        "muscle_left_arm",
        "muscle_right_leg",
        "muscle_left_leg",
        "muscle_trunk",
        "bone_mass",
    ]}
></LineChart1>


<LineChart1
    data={measurements}
    keys={[
        "fat_body",
        "fat_right_arm",
        "fat_left_arm",
        "fat_right_leg",
        "fat_left_leg",
        "fat_trunk",
        "water",
    ]}
></LineChart1>

<LineChart2
    {measurements}

></LineChart2>
