<script lang="ts">
import BriefcaseIcon from "../icons/BriefcaseIcon.svelte";
import { currentFile } from "../state";

function pickFile(){
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.setAttribute("accept",".xlsx");
    input.onchange = ()=>{
        let file = input?.files?.[0];
        if (file){
            currentFile.set(file);
        }
    }

    input.click();
}
</script>

<button on:click={pickFile}>
    <BriefcaseIcon />
    <span>Importálás</span>
</button>

<style lang="scss">
button {
    background-color: #0061b7;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border: none;
    padding: 0.5em 0.7em;
    border-radius: 0.5em;
    transition: background-color 0.3s ease;
    gap: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    :global(svg) {
        width: 1.3em;
        height: 1.3em;
    }

    &:hover {
        background-color: #004f94;
    }
}
</style>