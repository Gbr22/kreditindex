<script setup lang="ts">
import { allSemestersSymbol, currentSemesterId, currentSemesterIdValue, semesters, type SelectedSemesterId, createSemester, deleteSemester, renameSemester } from "@/state";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";

function updateSemeseterId(id: SelectedSemesterId){
    currentSemesterIdValue.value = id;
}
function create(){
    const s = createSemester();
    updateSemeseterId(s.id);
}
function edit(){
    const current = currentSemesterId.value;
    if (current == allSemestersSymbol){
        alert("Átnevezéshez válassz ki egy konrét félévet!");
        return;
    }
    const name = prompt("Mi legyen az új neve?")?.trim();
    if (!name){
        return;
    }
    renameSemester(current,name);
}
function remove(){
    deleteSemester(currentSemesterId.value);
}
</script>

<template>
    <div class="container">
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
        <div class="options">
            <button class="add" @click="create">
                <PlusIcon />
            </button>
            <button class="edit" @click="edit">
                <EditIcon />
            </button>
            <button class="delete" @click="remove">
                <TrashIcon />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    min-width: 100%;
    width: max-content;
    gap: 10px;
    --height: 32px;
    height: var(--height);

    button {
        transition: background-color 0.3s ease;
    }

    .semesters {
        display: flex;
        gap: 10px;

        button {
            font-size: 15px;
            border: none;
            padding: 0 0.7em;
            height: var(--height);
            border-radius: 0.5em;
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
    .options {
        display: flex;
        font-size: 15px;
        width: max-content;
        height: var(--height);
        overflow: hidden;
        border-radius: 0.5em;

        color: rgb(66, 66, 66);

        button {
            background-color: rgb(237, 237, 237);
            height: var(--height);
            width: auto;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
            :deep(svg){
                --size: 15px;
                width: var(--size);
                height: var(--size);
            }

            &:first-child {
                padding-left: 1px;
            }
            &:last-child {
                padding-right: 1px;
            }

            &:hover {
                background-color: rgb(212, 212, 212);
            }

            &.add {
                color: #12651b;
            }
            &.edit {
                color: #00539c;
            }
            &.delete {
                color: #992b26;
            }
        }
    }
}
</style>