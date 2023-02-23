<script lang="ts">
import type { Subject } from "../subjects";
import { subjects } from "../state";
import MediaQuery from 'svelte-media-queries';
import SubjectInput from "./SubjectInput.svelte";

let subjectToAdd: Subject = {
    name: "",
    weight: 3,
    grade: 3
}

</script>

<MediaQuery query="(max-width: 650px)" let:matches={isScreenSmall}>
    {#if isScreenSmall}
        <div class="subjects small-screen">
            {#each $subjects as subject}
                <SubjectInput bind:value={subject} action="remove" />
                <div class="divider"></div>
            {/each}
            <SubjectInput bind:value={subjectToAdd} action="add" />
        </div>
    {:else}
        <div class="subjects">
            <h4 class="subject-name-header">Tantárgy neve</h4>
            <h4>Kredit érték</h4>
            <h4>Eredmény</h4>
            <h4><span class="action-header">Kezelés</span></h4>
            {#each $subjects as subject}
                <SubjectInput bind:value={subject} action="remove" />
            {/each}
            <SubjectInput bind:value={subjectToAdd} action="add" />
        </div>
    {/if}
</MediaQuery>

<style lang="scss">
@import "../styles/button.scss";

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

.subjects.small-screen {
    display: flex;
    flex-direction: column;

    .divider {
        border-top: 1px solid #e5e7eb;
    }
}
</style>