<script lang="ts">
import NumberInput from "./NumberInput.svelte";
import XIcon from '../icons/XIcon.svelte';
import PlusIcon from '../icons/PlusIcon.svelte';
import { writable } from "svelte/store";
import type { Subject } from "../subjects";
import { subjects } from "../state";

let subjectName = "";
let subjectWeight = writable(3);
let subjectGrade = writable(3);

function addSubject(){
    let subject: Subject = {
        name: subjectName,
        weight: $subjectWeight,
        grade: $subjectGrade
    }
    subjects.update(subjects=>{
        return [...subjects, subject];
    })
    subjectName = "";
}

function removeSubject(subject: Subject){
    subjects.update((subjects)=>{
        let newArray = [...subjects];
        newArray.splice(newArray.indexOf(subject),1);
        return newArray;
    })
}
</script>

<div class="subjects">
    <h4 class="subject-name-header">Tantárgy neve</h4>
    <h4>Kredit érték</h4>
    <h4>Eredmény</h4>
    <h4><span class="action-header">Kezelés</span></h4>
    {#each $subjects as subject}
        <input class="subject-name" type="text" bind:value={subject.name} placeholder="Tantárgy neve">
        <NumberInput bind:value={subject.weight} min={1} max={30} />
        <NumberInput bind:value={subject.grade} min={1} max={5} />
        <span class="action">
            <button class="remove" on:click={()=>{removeSubject(subject)}}>
                <XIcon />
            </button>
        </span>
    {/each}
    <input class="subject-name" type="text" bind:value={subjectName} placeholder="Tantárgy neve">
    <NumberInput value={$subjectWeight} min={1} max={30} />
    <NumberInput value={$subjectGrade} min={1} max={5} />
    <span class="action">
        <button class="add" on:click={addSubject}>
            <PlusIcon />
        </button>
    </span>
</div>

<style lang="scss">
@import "../styles/button.scss";

@mixin action-button {
    @include row-input-common;
    display: grid;
    place-content: center;
}

.subjects {
    display: grid;
    grid-template-columns: 1fr repeat(3, auto);
    column-gap: 20px;
    row-gap: 10px;

    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .subject-name {
        @include row-input-common;
        width: unset;
        padding: 0 14px;
        border: none;
        background-color: #f1f5f9;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
        text-align: left;
        min-width: 50px;

        &::placeholder {
            color: #4b5563;
        }

        border: 2px solid transparent;

        &:focus {
            border-color: black;
        }
    }

    .action {
        button {
            @include action-button;
            color: #fff;
            border: none;
            transition: background-color 0.3s ease;

            &.remove {
                background-color: #6b7280;
                &:hover {
                    background-color: #535a66;
                }
            }

            &.add {
                background-color: #0f172a;
                &:hover {
                    background-color: #373b44;
                }
            }
        }
    }
}
@media screen and (max-width: 550px){
    .subjects {
        h4 {
            width: min-content;
            justify-self: center;
        }
    }
    .action-header {
        display: none;
    }
}
</style>