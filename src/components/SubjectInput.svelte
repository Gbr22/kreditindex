<script lang="ts">
import PlusIcon from "../icons/PlusIcon.svelte";
import XIcon from "../icons/XIcon.svelte";
import { subjects } from "../state";
import type { Subject } from "../subjects";
import NumberInput from "./NumberInput.svelte";
import MediaQuery from 'svelte-media-queries';

export let value: Subject;
export let action: "add" | "remove";

let [Icon,executeAction] = (()=>{
    if (action == "add"){
        return [PlusIcon,addSubject];
    } else if (action == "remove"){
        return [XIcon,removeSubject];
    } else {
        throw new Error("Unreachable");
    }
})()


function addSubject(subject: Subject){
    subjects.update(subjects=>{
        return [...subjects, {...subject}];
    })
    subject.name = "";
}

function removeSubject(subject: Subject){
    subjects.update((subjects)=>{
        let newArray = [...subjects];
        newArray.splice(newArray.indexOf(subject),1);
        return newArray;
    })
}

</script>

<MediaQuery query="(max-width: 650px)" let:matches={isScreenSmall}>
    {#if isScreenSmall}
        <div class="subject small-screen">
            <h4>Tantárgy</h4>
            <div class="top">
                <input class="subject-name" type="text" bind:value={value.name} placeholder="Tantárgy neve">
                <span class="action">
                    <button class={action} on:click={()=>{executeAction(value)}}>
                        <Icon />
                    </button>
                </span>
            </div>
            <div class="bottom">
                <span class="weight">
                    <h4>Kredit</h4>
                    <NumberInput bind:value={value.weight} min={1} max={30} />
                </span>
                <span class="grade">
                    <h4>Jegy</h4>
                    <NumberInput bind:value={value.grade} min={1} max={5} />
                </span>
            </div>
        </div>
    {:else}
        <input class="subject-name" type="text" bind:value={value.name} placeholder="Tantárgy neve">
        <span class="weight"><NumberInput bind:value={value.weight} min={1} max={30} /></span>
        <span class="grade"><NumberInput bind:value={value.grade} min={1} max={5} /></span>
        <span class="action">
            <button class={action} on:click={()=>{executeAction(value)}}>
                <Icon />
            </button>
        </span>
    {/if}
    
</MediaQuery>


<style lang="scss">
@import "../styles/button.scss";

@mixin action-button {
    @include row-input-common;
    display: grid;
    place-content: center;
}

.subject-name {
    @include row-input-common;
    width: unset;
    padding: 0 14px;
    border: none;
    background-color: #f4f4f5;
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
    display: grid;
    place-content: center;
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

.subject {
    padding: 20px 0;
    display: grid;
    gap: 10px;

    .subject-name {
        flex: 1;
    }

    .top, .bottom {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    h4 {
        text-align: center;
        font-size: 17px;
        font-weight: 600;
    }

    .top {
        h4 {
            text-align: center;
            width: 100%;
        }
    }
    .bottom > * {
        display: grid;
        place-content: center;
        text-align: center;
        gap: 10px;
        flex: 1;
    }
}
</style>