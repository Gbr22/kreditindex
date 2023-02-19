<script lang="ts">
import FilePicker from "../components/FilePicker.svelte";
import Results from "../components/Results.svelte";
	import Subjects from "../components/Subjects.svelte";
import { globalStore } from "../store";
</script>

<div class="page">
    <header>
        <h1>Kreditindex és átlag kalkulátor</h1>
        <div class="picker"><FilePicker /></div>
    </header>
    <section>
        <h2>Tárgyak</h2>
        <Subjects />
    </section>
    
    <section>
        <h2>Statisztika</h2>
        <Results />
    </section>
</div>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,700;1,400&display=swap');

:global(body) {
    font-family: Rubik;
    background-color: #f1f5f9;
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
        font-size: 28px;
    }

    header {
        display: flex;
        flex-direction: row;

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
</style>