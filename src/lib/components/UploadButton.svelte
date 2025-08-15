<script lang="ts">
  import { parseFile } from "$lib/utils";

  async function handleFileChange(event:any) {
    const file = event.target.files?.[0];
    if (file) {
     await parseFile(file)
    }
  }
</script>

<!-- Hidden file input -->
<input 
  id="fileInput" 
  type="file" 
  class="hidden" 
  on:change={handleFileChange}
/>

<!-- Button styled with TailwindCSS + DaisyUI -->
<label 
  for="fileInput" 
  class="btn btn-primary cursor-pointer"
>
  Upload File
</label>