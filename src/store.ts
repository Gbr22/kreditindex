import readXlsxFile from 'read-excel-file';
import { derived, writable } from 'svelte/store';
import { getSubjects, type Subject } from './subjects';

interface GlobalState {
    file?: File
    subjects: Subject[] 
}

export const globalStore = writable<GlobalState>({
    subjects: []
});

const file = derived(globalStore, ($globalStore) => $globalStore.file);

file.subscribe(value=>{
    if (value == undefined){
        return;
    }
    readXlsxFile(value).then(table=>{
        let subjects = getSubjects(table);
        globalStore.update(state=>{
            return {
                ...state,
                subjects
            }
        })
    })
})