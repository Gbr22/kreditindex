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

export function processData(rows: Row[]): Semester[] {
    const header = rows.shift() || [];
    const isAllSemesters = header.includes("Félév");
    const shift = isAllSemesters ? 1 : 0;
    const nameCol = 1;
    const weightCol = 2;
    const semesterCol = 3;
    const gradeTextCol = 7+shift;

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
        const semester = isAllSemesters ? String(row[semesterCol]) : "Névtelen félév";
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
    })

    return semesters;
}