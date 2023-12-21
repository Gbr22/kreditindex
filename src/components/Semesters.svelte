<script lang="ts">
import type { Subject } from "../subjects";
import { semesters, subjects, currentSemesterId, currentSemesterIdValue, hasMultipleSemesters, allSemestersSymbol } from "../state";
import { derived } from "svelte/store";
</script>

<div class="semesters">
    {#if $hasMultipleSemesters}
        <button class="{$currentSemesterId == allSemestersSymbol ? 'active' : ''}"
        on:click={()=>void currentSemesterIdValue.set(allSemestersSymbol)}
        >
            Összes félév
        </button>
    {/if}
    {#each $semesters as semester (semester.id)}
        <button
            class="{$currentSemesterId == semester.id ? 'active' : ''}"
            on:click={()=>void currentSemesterIdValue.set(semester.id)}
        >
            {semester.name}
        </button>
    {/each}
</div>

<style lang="scss">
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