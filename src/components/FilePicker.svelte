<script lang="ts">
import { globalStore } from "../store";

function pickFile(){
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.setAttribute("accept",".xlsx");
    input.onchange = ()=>{
        let file = input?.files?.[0];
        if (file){
            $globalStore.file = file;
        }
    }

    input.click();
}
</script>

<button on:click={pickFile}>Importálás</button>