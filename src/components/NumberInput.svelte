<script lang="ts">
export let value: number;
export let min: number;
export let max: number;

function keepRange(n: number){
    if (n < min){
        return min;
    }
    if (n > max){
        return max;
    }
    return n;
}

function plus(){
    value = keepRange(value+1);
}
function minus(){
    value = keepRange(value-1);
}
</script>

<span class="input">
    <span class="buttons">
        <button class="minus" on:click={minus}>-</button>
        <span class="number">{value}</span>
        <button class="plus" on:click={plus}>+</button>
    </span>
</span>

<style lang="scss">
@import "../styles/button.scss";

.input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
        .buttons button {
            display: block;
        }
    }
    
    .buttons {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .number {
            @include row-input-common;
        }
        .number, button {
            display: grid;
            justify-content: center;
            align-items: center;
            background-color: #e4e4e7;
            border: none;
            font-size: 16px;
        }
        button {
            --size: 28px;
            width: var(--size);
            height: var(--size);
            margin: 0 8px;
            border-radius: 50%;

            &:hover {
                border: 2px solid black;
            }
        }
    }
}
</style>