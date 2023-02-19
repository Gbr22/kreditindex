import type { Row } from "read-excel-file";

export interface Subject {
    name: string
    weight: number
    grade?: number
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

export function getSubjects(rows: Row[]){
    rows.splice(0,1); // remove header
    let subjects: Subject[] = [];
    for(let row of rows){
        let name = String(row[1]);
        name = name.split(",")[0];
        name = name.trim();
        let weight = Number(row[2]);
        let gradeText = String(row[7]);
        let gradeMatches = [...gradeText.matchAll(gradeRegex)];
        let grade: number | undefined;
        let last = gradeMatches[gradeMatches.length-1];
        if (last){
            let lastText = last[0];
            grade = gradeMap[lastText];
        }
        let subject: Subject = {
            name,
            weight,
            grade
        }
        if (weight != 0 && !isNaN(weight)){
            subjects.push(subject);
        }
    }
    return subjects;
}