import patients  from "../data/patients";
import { PatientEntry, NewPatientEntry, NewEntry} from "../types";
import {v1 as uuid} from "uuid";

const getEntries = (): Array<PatientEntry> => {
    return patients;
}

const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        }
    });
};

const findPatientByID = (id : string) : PatientEntry | undefined => {
    return patients.find(item => item.id === id);
}

const addPatient = (entry: NewPatientEntry) : PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryByID = (id:string, entry: NewEntry) :  PatientEntry | undefined=> {
    const addedPatient = patients.find(patient => patient.id === id);
    addedPatient?.entries.push({
        id: uuid(),
        ...entry
    });
    return addedPatient;
}




export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findPatientByID,
    addEntryByID
}
