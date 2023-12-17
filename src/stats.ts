import { derived } from "svelte/store";
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
    return s / 30;
}

function getCorrectedCreditIndex(subjects: Subject[]){
    let s = sum(getCompletedSubjects(subjects).map(e=>e.grade as number * e.weight));
    let correction = getCompletedCreditCount(subjects) / getTotalCreditCount(subjects);
    return (s / 30) * correction;
}

function formatNumber(n: number){
    if (isNaN(n)){
        return "0.0000";
    }
    return n.toFixed(4);
}

export const totalCreditCount = derived(subjects, ($subjects)=>{
    return getTotalCreditCount($subjects);
})

export const completedCreditCount = derived(subjects, ($subjects)=>{
    return getCompletedCreditCount($subjects);
})

export const weightedAverage = derived(subjects, ($subjects)=>{
    return formatNumber(getWeightedAverage($subjects));
})

export const creditIndex = derived(subjects, ($subjects)=>{
    return formatNumber(getCreditIndex($subjects));
})

export const correctedCreditIndex = derived(subjects, ($subjects)=>{
    return formatNumber(getCorrectedCreditIndex($subjects));
})