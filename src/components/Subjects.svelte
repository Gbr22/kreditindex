<script lang="ts">
import { globalStore } from "../store";
import NumberInput from "./NumberInput.svelte";
import XIcon from '../icons/XIcon.svelte';
import PlusIcon from '../icons/PlusIcon.svelte';
</script>

<div class="subjects">
    <h4 class="subject-name-header">Tantárgy neve</h4>
    <h4>Kredit érték</h4>
    <h4>Eredmény</h4>
    <h4>Kezelés</h4>
    {#each $globalStore.subjects as subject}
        <input class="subject-name" type="text" value={subject.name} placeholder="Tantárgy neve">
        <NumberInput number={subject.weight} />
        <NumberInput number={subject.grade} />
        <span class="action">
            <button class="remove">
                <XIcon />
            </button>
        </span>
    {/each}
    <input class="subject-name" type="text" value={""} placeholder="Tantárgy neve">
    <NumberInput number={5} />
    <NumberInput number={5} />
    <span class="action">
        <button class="add">
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
    }

    .subject-name {
        @include row-input-common;
        width: unset;
        padding: 0 16px;
        border: none;
        background-color: #f1f5f9;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;

        &::placeholder {
            color: #4b5563;
        }

        &:focus {
            outline: 2px solid black;
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
</style>