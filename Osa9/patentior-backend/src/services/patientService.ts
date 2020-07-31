import { PatientDataWithoutSsn, NewPatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';

const getPatientsWithoutSnn = (): PatientDataWithoutSsn [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
}

export default {
  getPatientsWithoutSnn,
  addPatient,
};