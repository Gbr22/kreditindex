<script setup lang="ts">
import { allSemestersSymbol, currentSemesterId, currentSemesterIdValue, semesters, type SelectedSemesterId } from "@/state";

function updateSemeseterId(id: SelectedSemesterId){
    currentSemesterIdValue.value = id;
}
</script>

<template>
    <div class="semesters">
        <button
            :class="{active: currentSemesterId == allSemestersSymbol}"
            @click="()=>updateSemeseterId(allSemestersSymbol)"
        >
            Összes félév
        </button>
        <button
            v-for="semester in semesters"
            :key="semester.id"
            :class="{active: currentSemesterId == semester.id}"
            @click="()=>updateSemeseterId(semester.id)"
        >
            {{semester.name}}
        </button>
    </div>
</template>

<style scoped lang="scss">
.semesters {
    display: flex;
    gap: 10px;

    button {
        
        font-size: 15px;
        border: none;
        padding: 0.5em 0.7em;
        border-radius: 0.5em;
        transition: background-color 0.3s ease;
        gap: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgb(237, 237, 237);
        color: rgb(66, 66, 66);
        &:hover {
            background-color: rgb(212, 212, 212);
        }

        &.active {
            background-color: #93ccff;
            color: #00396b;
            &:hover {
                background-color: #70ade2;
            }
        }
    }
}
</style>