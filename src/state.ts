import readXlsxFile from 'read-excel-file';
import { computed, ref, reactive, watch } from 'vue';
import { processData, type Semester, type Subject } from './subjects';

export const currentFile = ref<File | undefined>(undefined);

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

export const semesters = reactive<Semester[]>(getInitalSemesters());
export const allSemestersSymbol = Symbol("All semesters");

export type SelectedSemesterId = typeof allSemestersSymbol | string;

export function createSemester(){
    const s: Semester = {
        name: "Új félév",
        subjects: [],
        id: crypto.randomUUID()
    };
    semesters.push(s);
    return s;
}
export function deleteSemester(id: SelectedSemesterId){
    if (id === allSemestersSymbol){
        semesters.splice(0,semesters.length);
        return;
    }
    const semesterIndex = semesters.findIndex(e=>e.id === id);
    if (semesterIndex === -1){
        return;
    }
    semesters.splice(semesterIndex, 1);
    return;
}

export function renameSemester(id: SelectedSemesterId, name: string){
    if (id === allSemestersSymbol){
        return;
    }
    const semester = semesters.find(e=>e.id == id);
    if (!semester){
        return;
    }
    semester.name = name;
}

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

export const hasMultipleSemesters = computed(()=>{
    const res = semesters.length > 1;
    return res;
});

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

export const currentSemesterIdValue = ref<SelectedSemesterId>(getInitalSemesterId());

watch(currentSemesterIdValue,(id)=>{
    if ("localStorage" in globalThis){
        localStorage.setItem("selected_semester",serializeSelectedSemesterId(id));
    }
})

export const currentSemesterId = computed<SelectedSemesterId>(()=>{
    if (currentSemesterIdValue.value == allSemestersSymbol){
        return allSemestersSymbol;
    }
    const ids = semesters.map(e=>e.id);
    if (ids.includes(currentSemesterIdValue.value as string)){
        return currentSemesterIdValue.value;
    }
    return ids[ids.length-1] || allSemestersSymbol;
})

export const currentSemester = computed(()=>{
    const semester = semesters.find(e=>e.id == currentSemesterId.value);
    return semester;
})

export const subjects = computed(()=>{
    if (currentSemesterId.value == allSemestersSymbol){
        return semesters.map(e=>e.subjects).flat();
    }
    const semester = semesters.find(e=>e.id == currentSemesterId.value);
    return semester?.subjects || [];
})

export function addSubject(subject: Subject, semesterId: string | typeof allSemestersSymbol){
    const semester = semesters.find(e=>e.id == semesterId);
    if (!semester){
        return;
    }
    semester.subjects.push(subject);
}
export function removeSubject(subjectId: string){
    const semester = semesters.find(e=>e.subjects.map(e=>e.id).includes(subjectId));
    if (!semester){
        return;
    }
    const subjectIndex = semester.subjects.findIndex(e=>e.id == subjectId);
    if (subjectIndex == -1){
        return;
    }
    semester.subjects.splice(subjectIndex,1);
}
export function updateSubject(newSubject: Subject){
    const semester = semesters.find(e=>e.subjects.map(e=>e.id).includes(newSubject.id));
    if (!semester){
        return;
    }
    const subject = semester.subjects.find(e=>e.id == newSubject.id);
    if (!subject){
        return;
    }
    Object.assign(subject,newSubject);
}

watch(currentFile,(value)=>{
    if (value == undefined){
        return;
    }
    readXlsxFile(value).then(table=>{
        semesters.splice(0,semesters.length);
        semesters.push(...processData(table));
    })
})

watch(semesters,(semesters)=>{
    if ("localStorage" in globalThis){
        localStorage.setItem("semesters",JSON.stringify(semesters));
    }
})