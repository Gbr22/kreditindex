<script setup lang="ts">
import { addSubject, currentSemesterId, removeSubject, updateSubject } from '@/state';
import { type Subject } from '@/subjects';
import { useMediaQuery } from '@vueuse/core';
import { defineProps, reactive, watch } from "vue";
import NumberInput from './NumberInput.vue';
import XIcon from "@/components/icons/XIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";

const props = defineProps<{
    value: Subject
    type: "add" | "remove"
}>()

const { value, type } = props;

const Icon = type == "add" ? PlusIcon : XIcon;

const subject = reactive({...value});
const isScreenSmall = useMediaQuery('(max-width: 650px)')

function onClick(){
    if (type == "add"){
        const copy: Subject = {...subject, id: crypto.randomUUID()};
        addSubject(copy,currentSemesterId.value);
        subject.name = "";
    }
    else if (type == "remove"){
        removeSubject(value.id);
    }
}

watch(subject, (newSubject)=>{
    if (type == "remove"){
        updateSubject(newSubject);
    }
})
</script>

<template>
    <template v-if="isScreenSmall">
        <div class="subject small-screen">
            <h4>Tantárgy</h4>
            <div class="top">
                <input class="subject-name" type="text" v-model="subject.name" placeholder="Tantárgy neve">
                <span class="action">
                    <button class="`${type}`" @click="onClick">
                        <Icon />
                    </button>
                </span>
            </div>
            <div class="bottom">
                <span class="weight">
                    <h4>Kredit</h4>
                    <NumberInput v-model="subject.weight" :min="1" :max="30" />
                </span>
                <span class="grade">
                    <h4>Jegy</h4>
                    <NumberInput v-model="subject.grade" :min="1" :max="5" />
                </span>
            </div>
        </div>
    </template>
    <template v-else>
        <input class="subject-name" type="text" v-model="subject.name" placeholder="Tantárgy neve">
        <span class="weight">
            <NumberInput v-model="subject.weight" :min="1" :max="30" />
        </span>
        <span class="grade">
            <NumberInput v-model="subject.grade" :min="1" :max="5" />
        </span>
        <span class="action">
            <button :class="`${type}`" @click="onClick">
                <Icon />
            </button>
        </span>
    </template>
</template>

<style scoped lang="scss">
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