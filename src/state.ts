import readXlsxFile from 'read-excel-file';
import { derived, writable } from 'svelte/store';
import { processData, type Semester, type Subject } from './subjects';

export const currentFile = writable<File | undefined>(undefined);

function getInitalSemesters(){
    if (!("localStorage" in globalThis)){
        return [];
    }
    let item = localStorage.getItem("semesters");
    if (!item){
        return [];
    }
    try {
        let semesters: Semester[] = JSON.parse(item);
        return semesters;
    } catch(_){
        return []; 
    }
}

export const semesters = writable<Semester[]>(getInitalSemesters());
export const allSemestersSymbol = Symbol("All semesters");

export type SelectedSemesterId = typeof allSemestersSymbol | string;

function serializeSelectedSemesterId(id: SelectedSemesterId){
    if (id === allSemestersSymbol){
        return JSON.stringify({
            type: "all"
        })
    }
    return JSON.stringify({
        type: "one",
        value: id
    })
}
function unserializeSelectedSemesterId(str: string): SelectedSemesterId {
    const obj = JSON.parse(str) as {
        type: "all"
    } | {
        type: "one",
        value: string
    };

    if (obj.type === "all"){
        return allSemestersSymbol;
    }
    else if (obj.type == "one"){
        return obj.value;
    }

    throw new Error("Unreachable");
}

export const hasMultipleSemesters = derived(semesters, ($semesters)=>{
    const res = $semesters.length > 1;
    return res;
})

function getInitalSemesterId(): SelectedSemesterId {
    if (!("localStorage" in globalThis)){
        return "";
    }
    const str = localStorage.getItem("selected_semester");
    if (!str){
        return "";
    }
    return unserializeSelectedSemesterId(str);
}

export const currentSemesterIdValue = writable<SelectedSemesterId>(getInitalSemesterId());

currentSemesterIdValue.subscribe(id=>{
    if ("localStorage" in globalThis){
        localStorage.setItem("selected_semester",serializeSelectedSemesterId(id));
    }
})

export const currentSemesterId = derived([semesters,currentSemesterIdValue],([$semesters,$currentSemesterValue])=>{
    if ($currentSemesterValue == allSemestersSymbol && $semesters.length > 1){
        return allSemestersSymbol;
    }
    const ids = $semesters.map(e=>e.id);
    if (ids.includes($currentSemesterValue as string)){
        return $currentSemesterValue;
    }
    return ids[0] || crypto.randomUUID();
})

export const currentSemester = derived([semesters,currentSemesterId], ([$semesters,$currentSemesterId])=>{
    const semester = $semesters.find(e=>e.id == $currentSemesterId);
    return semester;
})

export const subjects = derived([semesters,currentSemesterId], ([$semesters, $currentSemesterId])=>{
    if ($currentSemesterId == allSemestersSymbol){
        return $semesters.map(e=>e.subjects).flat();
    }
    const semester = $semesters.find(e=>e.id == $currentSemesterId);
    return semester?.subjects || [];
})

export function addSubject(subject: Subject, semesterId: string | typeof allSemestersSymbol){
    semesters.update(oldSemesters=>{
        const semesters = [...oldSemesters].map(semester=>{
            if (semester.id == semesterId){
                return {...semester, subjects: [...semester.subjects,subject]}
            }
            return {...semester, subjects: [...semester.subjects]};
        });
        return semesters;
    })
}
export function removeSubject(subjectId: string){
    semesters.update(oldSemesters=>{
        const semesters = [...oldSemesters].map(semester=>{
            return {
                ...semester,
                subjects: semester.subjects.filter(subject=>{
                    return subject.id != subjectId;
                })
            }
        });
        return semesters;
    })
}
export function updateSubject(subject: Subject){
    semesters.update(oldSemesters=>{
        const semesters = [...oldSemesters].map(semester=>{
            return {
                ...semester,
                subjects: semester.subjects.map(s=>{
                    if (s.id === subject.id){
                        return {...subject};
                    }
                    return {...s};
                })
            }
        });
        return semesters;
    })
}

currentFile.subscribe(value=>{
    if (value == undefined){
        return;
    }
    readXlsxFile(value).then(table=>{
        semesters.set(processData(table))
    })
})

semesters.subscribe(semesters=>{
    if ("localStorage" in globalThis){
        localStorage.setItem("semesters",JSON.stringify(semesters));
    }
})