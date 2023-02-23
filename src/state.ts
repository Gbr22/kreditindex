import readXlsxFile from 'read-excel-file';
import { derived, writable } from 'svelte/store';
import { getSubjects, type Subject } from './subjects';

export const currentFile = writable<File | undefined>(undefined);

function getInitalSubjects(){
    if (!("localStorage" in globalThis)){
        return [];
    }
    let item = localStorage.getItem("subjects");
    if (!item){
        return [];
    }
    try {
        let subjects: Subject[] = JSON.parse(item);
        return subjects;
    } catch(_){
        return []; 
    }
}

export const subjects = writable<Subject[]>(getInitalSubjects());

currentFile.subscribe(value=>{
    if (value == undefined){
        return;
    }
    readXlsxFile(value).then(table=>{
        subjects.set(getSubjects(table));
    })
})

subjects.subscribe(subjects=>{
    if ("localStorage" in globalThis){
        localStorage.setItem("subjects",JSON.stringify(subjects));
    }
})