<script setup lang="ts">
import SubjectInput from './SubjectInput.vue';
import { allSemestersSymbol, currentSemesterId, subjects } from '@/state';
import type { Subject } from '@/subjects';
import { useMediaQuery } from '@vueuse/core'

const isScreenSmall = useMediaQuery('(max-width: 650px)')

let subjectToAdd: Subject = {
    name: "",
    weight: 3,
    grade: 3,
    id: ""
}

</script>

<template>
    <template v-if="isScreenSmall">
        <div class="subjects small-screen">
            <SubjectInput :value="subjectToAdd" type="add" v-if="currentSemesterId != allSemestersSymbol" />
            <template v-for="subject in subjects" :key="subject.id">
                <SubjectInput :value="subject" type="remove" />
                <div class="divider"></div>
            </template>
        </div>
    </template>
    <template v-else>
        <div class="subjects">
            <h4 class="subject-name-header">Tantárgy neve</h4>
            <h4>Kredit érték</h4>
            <h4>Eredmény</h4>
            <h4><span class="action-header">Kezelés</span></h4>
            <SubjectInput :value="subjectToAdd" type="add" v-if="currentSemesterId != allSemestersSymbol" />
            <SubjectInput :value="subject" type="remove" v-for="subject in subjects" :key="subject.id" />
        </div>
    </template>
</template>

<style scoped lang="scss">
@import "../styles/button.scss";

.subjects {
    display: grid;
    grid-template-columns: 1fr repeat(3, auto);
    column-gap: 20px;
    row-gap: 10px;

    h4 {
        text-align: center;
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