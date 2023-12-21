import { computed } from "vue";
import { subjects } from "./state";
import type { Subject } from "./subjects";

function sum(numbers: number[]){
    return numbers.reduce((accumulator, n)=>accumulator + n, 0);
}

function getCompletedSubjects(subjects: Subject[]){
    return subjects.filter(e=>e.grade > 1);
}

function getTotalCreditCount(subjects: Subject[]){
    return sum(subjects.map(e=>e.weight));
}

function getCompletedCreditCount(subjects: Subject[]){
    return sum(getCompletedSubjects(subjects).map(e=>e.weight));
}

function getWeightedAverage(subjects: Subject[]){
    let s = sum(getCompletedSubjects(subjects).map(e=>e.grade as number * e.weight));
    return s / getCompletedCreditCount(subjects);
}

function getCreditIndex(subjects: Subject[]){
    let s = sum(getCompletedSubjects(subjects).map(e=>e.grade as number * e.weight));
    const credits = 30 * semesterCount(subjects);
    return s / credits;
}

function getCorrectedCreditIndex(subjects: Subject[]){
    let s = sum(getCompletedSubjects(subjects).map(e=>e.grade as number * e.weight));
    let correction = getCompletedCreditCount(subjects) / getTotalCreditCount(subjects);
    const credits = 30 * semesterCount(subjects);
    return ( s / credits ) * correction;
}

function formatNumber(n: number){
    if (isNaN(n)){
        return "0.0000";
    }
    return n.toFixed(4);
}

function semesterCount(subjects: Subject[]){
    /* const semesters = subjects.map(subject=>subject.semester);
    const set = new Set(semesters);
    return set.size; */
    return 1;
}

export const totalCreditCount = computed(()=>{
    return getTotalCreditCount(subjects.value);
})

export const completedCreditCount = computed(()=>{
    return getCompletedCreditCount(subjects.value);
})

export const weightedAverage = computed(()=>{
    return formatNumber(getWeightedAverage(subjects.value));
})

export const creditIndex = computed(()=>{
    return formatNumber(getCreditIndex(subjects.value));
})

export const correctedCreditIndex = computed(()=>{
    return formatNumber(getCorrectedCreditIndex(subjects.value));
})