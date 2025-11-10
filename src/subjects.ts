import type { Row } from "read-excel-file";

export interface Semester {
    name: string
    subjects: Subject[]
    id: string
}

export interface Subject {
    name: string
    weight: number
    grade: number
    id: string
}

const gradeMap: {[key: string]: number} = {
    "Jeles": 5,
    "Jó": 4,
    "Közepes": 3,
    "Elégséges": 2,
    "Elégtelen": 1,
};

let gradeRegexText = `(${Object.keys(gradeMap).join("|")})`;
let gradeRegex = new RegExp(gradeRegexText,"g");

function normalize(s: unknown) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function equals(a: unknown, b: unknown) {
    return normalize(a) === normalize(b);
}

function findColIndex(header: unknown[], whitelist: unknown[]) {
    return header.findIndex(col=>whitelist.some(w=>equals(col,w)));
}

export function processData(rows: Row[], fileName: string) {
    const header = rows.shift() || [];
    console.log("header",header);
    const semesterCol = findColIndex(header,["Félév","Félév neve"]);
    const nameCol = findColIndex(header,["Tantárgy","Tantárgy neve","Tárgy címe, előadó neve","Tárgy címe","Tárgynév","Tárgy","Név","Tárgy neve"]);
    const weightCol = findColIndex(header,["Kr.","Kredit"]);
    const gradeTextCol = findColIndex(header,["Jegy","Érdemjegy","Jegy szövegesen","Jegyek","Teljesítés, érdemjegy"]);
    const isAllSemesters = semesterCol != -1;

    const map = new Map<string, Subject[]>();

    function append(key: string, value: Subject){
        if (!map.has(key)){
            map.set(key,[]);
        }
        (map.get(key) as Subject[]).push(value);
    }
    
    for(let row of rows){
        let name = String(row[nameCol]);
        name = name.split(",")[0];
        name = name.trim();
        const weight = Number(row[weightCol]);
        const gradeText = String(row[gradeTextCol]);
        const gradeMatches = [...gradeText.matchAll(gradeRegex)];
        const semester = isAllSemesters ? String(row[semesterCol]) : fileName;
        let grade: number = 1;
        let last = gradeMatches[gradeMatches.length-1];
        if (last){
            let lastText = last[0];
            grade = gradeMap[lastText];
        }
        let subject: Subject = {
            name,
            weight,
            grade,
            id: crypto.randomUUID(),
        }
        if (weight != 0 && !isNaN(weight)){
            append(semester,subject);
        }
    }

    const semesters = [...map.entries()].map(([key,value])=>{
        return {
            name: key,
            subjects: value,
            id: crypto.randomUUID()
        } satisfies Semester;
    });

    return semesters;
}