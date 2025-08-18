<script lang="ts">
	import type { MeasurementData } from "$lib/interfaces";
	import { parseFile } from "$lib/utils";
	export let measurements: MeasurementData[] = [];
	async function handleFileChange(event: any) {
		const file = event.target.files?.[0];
		if (file) {
			measurements = await parseFile(file);
		}
	}
</script>

<!-- Hidden file input -->
<input id="fileInput" type="file" class="hidden" on:change={handleFileChange} />

<!-- Button styled with TailwindCSS + DaisyUI -->
<label for="fileInput" class="btn btn-primary cursor-pointer">
	Upload File
</label>
