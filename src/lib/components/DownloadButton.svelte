<script lang="ts">
    import { formatDate, generateCSV } from "$lib/utils";

    const { data = [], columns = [] } = $props();
    let reversed_data = $derived(data.slice().reverse());

    function downloadCSV() {
        const csvContent = generateCSV(reversed_data, columns);
        const url = URL.createObjectURL(csvContent);
        const link = document.createElement("a");
        const model = reversed_data[0]?.model ?? "Body_scale";
        const date = formatDate(reversed_data[0]?.date)
            .replace(/[\/:]/g, "-")
            .replace(", ", "_");

        link.setAttribute("href", url);
        link.setAttribute("download", `Data_${model}_${date}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<button class="btn btn-primary cursor-pointer" onclick={downloadCSV}>
    Download data as CSV
</button>
