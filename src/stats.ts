import { derived } from "svelte/store";
import { globalStore } from "./store";
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
    return s / 30;
}

function getCorrectedCreditIndex(subjects: Subject[]){
    let s = sum(getCompletedSubjects(subjects).map(e=>e.grade as number * e.weight));
    let correction = getCompletedCreditCount(subjects) / getTotalCreditCount(subjects);
    return (s / 30) * correction;
}

function formatNumber(n: number){
    if (isNaN(n)){
        return "0.00";
    }
    return n.toFixed(2);
}

export const totalCreditCount = derived(globalStore, ($globalStore)=>{
    return getTotalCreditCount($globalStore.subjects);
})

export const completedCreditCount = derived(globalStore, ($globalStore)=>{
    return getCompletedCreditCount($globalStore.subjects);
})

export const weightedAverage = derived(globalStore, ($globalStore)=>{
    return formatNumber(getWeightedAverage($globalStore.subjects));
})

export const creditIndex = derived(globalStore, ($globalStore)=>{
    return formatNumber(getCreditIndex($globalStore.subjects));
})

export const correctedCreditIndex = derived(globalStore, ($globalStore)=>{
    return formatNumber(getCorrectedCreditIndex($globalStore.subjects));
})