import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewHealthCheckEntry, toNewHospitalEntry, toNewOccupationalHealthcareEntry } from '../utils';

const patientRouter = express.Router();


patientRouter.get('/', (_req, res) => {
    res.send(patientService.getEntries());
})

patientRouter.get('/:id', (req, res) => {
    const patient = patientService.findPatientByID(req.params.id);
    if(patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
    // res.send(patientService.findPatientByID(id));
})

patientRouter.post('/:id/entries', (req, res) => {
    try {
        switch(req.body.type) {
            case "OccupationalHealthcare" :
                const newOccupationalHealthcareEntry = toNewOccupationalHealthcareEntry(req.body);
                const addedOccupationalHealthcareEntry = patientService.addEntryByID(req.params.id, newOccupationalHealthcareEntry);
                res.json(addedOccupationalHealthcareEntry);
                break;
            case "HealthCheck" :
                const newHealthCheckEntry = toNewHealthCheckEntry(req.body);
                const addedHealthCheckEntry = patientService.addEntryByID(req.params.id, newHealthCheckEntry)
                res.json(addedHealthCheckEntry);
                break;
            case "Hospital":
                const newHospitalEntry = toNewHospitalEntry(req.body);
                const addedHospitalEntry = patientService.addEntryByID(req.params.id, newHospitalEntry);
                res.json(addedHospitalEntry);
                break;
            default:
                throw new Error('invalid type');
            }
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

patientRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    // const newPatientEntry = patientService.addPatient({
    //     name,
    //     dateOfBirth,
    //     ssn,
    //     gender,
    //     occupation
    // });
    // res.json(newPatientEntry);
})

export default patientRouter;