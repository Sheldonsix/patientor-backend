import { NewPatientEntry, Gender, Entry, SickLeave, OccupationalHealthcareEntry, HospitalEntry, Discharge, HealthCheckRating, HealthCheckEntry } from "./types";

type Fileds = { name: unknown, ssn: unknown, occupation: unknown, gender: unknown, dateOfBirth: unknown, entries: any }

const toNewPatientEntry = ({ name, ssn, occupation, dateOfBirth, gender, entries }: Fileds): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseInputString(name),
        occupation: parseInputString(occupation),
        ssn: parseSSN(ssn),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        entries: parseEntry(entries)
    };
    return newEntry;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (str: any): str is Gender => {
    return Object.values(Gender).includes(str);
};

const isSSN = (ssn: string): boolean => {
    let ssnRegexp = /[0-9]{6}-[0-9]{2,4}[a-z]*/;
    return ssnRegexp.test(ssn);
}

// const isArrayString = (array: unknown): array is Array<string> => {
//     if (array instanceof Array) {
//         array.forEach(item => {
//             if (isString(item)) return;
//             return false
//         })
//         return true;
//     }
//     return false;
// }

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
    if (sickLeave instanceof Object && Object.keys(sickLeave).includes('startDate') && Object.keys(sickLeave).includes('endDate')
        && isDate(Object.values(sickLeave)[0]) && isDate(Object.values(sickLeave)[1])) {
            return true;
        }
        return false;
} 

const isDischarge = (discharge: unknown): discharge is Discharge => {
    if(discharge instanceof Object && Object.keys(discharge).includes('date') && Object.keys(discharge).includes('criteria')
    && isDate(Object.values(discharge)[0]) && isString(Object.values(discharge)[1])){
        return true;
    }
    return false;
}

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
    if(Object.values(HealthCheckRating).includes(healthCheckRating)) {
        return true
    }
    return false;
}

const parseInputString = (input: unknown): string => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing name');
    }

    return input;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date:' + date);
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender:' + gender);
    }

    return gender;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn:' + ssn);
    }
    return ssn;
};

const parseEntry = (entries: any): Entry[] => {
    if (!entries) {
        throw new Error('Incorrect or missing entries:' + entries);
    }
    return entries;
}

const parsediagnosisCodes = (diagnosisCodes: unknown): Array<string> | undefined => {
    if(diagnosisCodes === undefined) return undefined;
    if(isString(diagnosisCodes)) {
        return diagnosisCodes.split(',');
    }
    return undefined;
}

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if(sickLeave === undefined) return undefined;
    if(!isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickLeave:' + sickLeave);
    }
    return sickLeave;
}

const parseDischarge = (discharge: unknown) : Discharge => {
    if(!isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge:' + discharge);
    }
    return discharge;
}

const parseHealthCheckRating = (healthCheckRating: unknown) : HealthCheckRating => {
    if(!isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating:' + healthCheckRating);
    }
    return healthCheckRating;
}

type NewEntryField = { id: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, type: unknown, employerName: unknown, sickLeave: unknown , discharge: unknown, healthCheckRating: unknown}


export const toNewOccupationalHealthcareEntry = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }: NewEntryField): Omit<OccupationalHealthcareEntry, 'id'>  => {
    return {
        description: parseInputString(description),
        date: parseDate(date),
        specialist: parseInputString(specialist),
        diagnosisCodes: parsediagnosisCodes(diagnosisCodes),
        employerName: parseInputString(employerName),
        sickLeave: parseSickLeave(sickLeave),
        type: 'OccupationalHealthcare'
    }
}

export const toNewHospitalEntry = ({date, specialist, diagnosisCodes, description, discharge} : NewEntryField) : Omit<HospitalEntry, 'id'>   => {
    return {
        date: parseDate(date),
        specialist: parseInputString(specialist),
        diagnosisCodes: parsediagnosisCodes(diagnosisCodes),
        description: parseInputString(description),
        discharge: parseDischarge(discharge),
        type: 'Hospital'
    }
}

export const toNewHealthCheckEntry = ({ date, specialist, description, healthCheckRating}: NewEntryField) : Omit<HealthCheckEntry, 'id'>  => {
    return {
        date: parseDate(date),
        specialist: parseInputString(specialist),
        description: parseInputString(description),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        type: 'HealthCheck'
    }
}

export default toNewPatientEntry;