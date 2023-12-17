<script lang="ts">
import { completedCreditCount, correctedCreditIndex, creditIndex, totalCreditCount, weightedAverage } from "../stats";
</script>

<div class="stats">
    <div>
        <h3>Kreditek száma</h3>
        <span>{$completedCreditCount}/{$totalCreditCount}</span>
    </div>
    <div>
        <h3>Kreditindex</h3>
        <span>{$creditIndex}</span>
    </div>
    <div>
        <h3>Korrigált kreditindex</h3>
        <span>{$correctedCreditIndex}</span>
    </div>
    <div>
        <h3>Súlyozott átlag</h3>
        <span>{$weightedAverage}</span>
    </div>
</div>

<style lang="scss">
.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    & > div {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 5px;

        h3 {
            font-weight: 600;
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: center;
            font-size: 19px;
        }
        span {
            font-size: 17px;
            font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; 
        }
    }
}

@media screen and (max-width: 550px){
    .stats {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>