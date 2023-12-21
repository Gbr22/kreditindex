<script setup lang="ts">
import { currentFile } from "@/state";
import BriefcaseIcon from "@/components/icons/BriefcaseIcon.vue";
function pickFile(){
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.setAttribute("accept",".xlsx");
    input.onchange = ()=>{
        let file = input?.files?.[0];
        if (file){
            currentFile.value = file;
        }
    }
    input.click();
}
</script>

<template>
    <button
        @click="pickFile"
    >
        <BriefcaseIcon />
        <span>Importálás</span>
    </button>
</template>

<style scoped lang="scss">
button {
    background-color: #0061b7;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border: none;
    padding: 0.5em 0.7em;
    border-radius: 0.5em;
    transition: background-color 0.3s ease;
    gap: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(svg) {
        width: 1.3em;
        height: 1.3em;
    }

    &:hover {
        background-color: #004f94;
    }
}
</style>