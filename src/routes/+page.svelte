<script lang="ts">
import FilePicker from "../components/FilePicker.svelte";
import { completedCreditCount, weightedAverage, totalCreditCount, creditIndex, correctedCreditIndex } from "../stats";
import { globalStore } from "../store";
</script>

<h1>Kreditindex és átlag kalkulátor</h1>
<FilePicker />
<p>{$globalStore.file?.name}</p>

<section>
    <h2>Tárgyak</h2>
    <table>
        <tr>
            <td>Tantárgy neve</td>
            <td>Kredit érték</td>
            <td>Eredmény</td>
            <td>Hozzáadás</td>
        </tr>
        {#each $globalStore.subjects as subject}
            <tr>
                <td><input type="text" value={subject.name}></td>
                <td>{subject.weight}</td>
                <td>{subject.grade}</td>
            </tr>
        {/each}
    </table>
</section>

<section>
    <h2>Statisztika</h2>
    <div>
        <div>Kreditek száma</div>
        <div>{$completedCreditCount}/{$totalCreditCount}</div>
    </div>
    <div>
        <div>Kreditindex</div>
        <div>{$creditIndex}</div>
    </div>
    <div>
        <div>Korrigált kreditindex</div>
        <div>{$correctedCreditIndex}</div>
    </div>
    <div>
        <div>Súlyozott átlag</div>
        <div>{$weightedAverage}</div>
    </div>
</section>