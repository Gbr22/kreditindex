<script lang="ts">
export let number: number;
</script>

<span class="input">
    <span class="buttons">
        <button class="minus">-</button>
        <span class="number">{number}</span>
        <button class="plus">+</button>
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

        .number, button {
            @include row-input-common;
            display: grid;
            justify-content: center;
            align-items: center;
            background-color: #f1f5f9;
            border: none;
            font-size: 16px;
        }
        button {
            background-color: transparent;
            position: absolute;
            top: 0;
            margin: 0 8px;
            display: none;

            &.plus {
                left: 100%;
            }
            &.minus {
                right: 100%;
            }

            &:hover {
                border: 2px solid black;
            }
        }
    }
}
</style>