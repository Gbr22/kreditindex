<script lang="ts">
import FilePicker from "../components/FilePicker.svelte";
import Results from "../components/Results.svelte";
import Semesters from "../components/Semesters.svelte";
import Subjects from "../components/Subjects.svelte";
</script>

<div class="page">
    <header>
        <h1>Kreditindex és átlag kalkulátor</h1>
        <div class="picker"><FilePicker /></div>
    </header>
    <section class="semesters">
        <Semesters />
    </section>
    <section class="subjects">
        <h2>Tárgyak</h2>
        <Subjects />
    </section>
    
    <section>
        <h2>Statisztika</h2>
        <Results />
    </section>
</div>

<style lang="scss">
:global(body) {
    font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif; 
    background-color: #f1f5f9;
}
:global(h1, h2, h3, h4, h5, h6){
    font-family: Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif;
}
:global(*) {
    font-family: inherit;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.page {
    --section-padding: 20px;
    padding: 10vh 15vw;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1, h2 {
        font-size: min(calc(6vw), 28px);
    }

    header {
        display: flex;
        flex-direction: row;
        gap: 20px;

        h1 {
            flex: 1;
        }

        .picker {
            display: grid;
            place-content: center;
        }
    }
    header, section {
        border-radius: calc(var(--section-padding) / 2);
        padding: var(--section-padding);
        background-color: #fff;
        box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.08);
    }

    section {
        h2 {
            margin-bottom: calc(var(--section-padding) / 2);
        }
    }
}

@media screen and (max-width: 850px){
    .page {
        --section-padding: 20px;
        padding: 20px;
    }
}

@media screen and (max-width: 650px){
    .page {
        section {
            h2 {
                text-align: center;
            }
        }
        .subjects {
            padding-top: 10px;
            padding-bottom: 10px;
            h2 {
                display: none;
            }
        }
    }
}
</style>