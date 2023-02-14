import diagnoses from '../data/diagnoses';
import { DiagnoseEntry } from '../types';


const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};
