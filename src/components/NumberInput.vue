<script setup lang="ts">

import { defineProps, defineEmits, ref } from "vue";

const props = defineProps<{
    min: number
    max: number
    modelValue: number
}>()

const { min, max } = props;

const n = ref<number>(props.modelValue);

const emit = defineEmits(['update:modelValue']);

function keepRange(n: number){
    if (n < min){
        return min;
    }
    if (n > max){
        return max;
    }
    return n;
}

function updateValue(diff: number){
    const newVal = keepRange(n.value + diff);
    emit("update:modelValue",newVal);
    n.value = newVal;
}
</script>

<template>
    <span class="input">
        <span class="buttons">
            <button class="minus" @click="updateValue(-1)">-</button>
            <span class="number">{{n}}</span>
            <button class="plus" @click="updateValue(+1)">+</button>
        </span>
    </span>
</template>

<style scoped lang="scss">
@import "../styles/button.scss";

.input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; 

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