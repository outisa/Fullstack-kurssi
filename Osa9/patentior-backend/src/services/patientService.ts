import { PublicPatient, NewPatient, Patient, Entry, NewOccupational, NewHealthCheck, NewHospitalEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';

let patientsToHandle = patients;
const getPublicPatients = (): PublicPatient [] => {
  return patientsToHandle.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewOccupational | NewHealthCheck | NewHospitalEntry, id: string, ): Entry |undefined => {
  const patient = patientsToHandle.find(patient => patient.id === id);
  const entryToAdd = {
    id: uuidv4(),
    ...entry
  };
  if (!patient || !entryToAdd) {
    return undefined;
  }

  let entries: Entry[] | undefined = patient.entries;
  if (!entries){
    entries = [];
  }
  
  const newEntries = entries.concat(entryToAdd);
  const modifiedPatient = {
    ...patient,
    entries: newEntries,
  };
  
  patientsToHandle = patientsToHandle.map((patient: Patient )=> patient.id !== id ? patient : modifiedPatient);
  return entryToAdd;
};

const getPatient = (id: string): Patient | null => {
  const patient = patientsToHandle.find(patient => patient.id === id);
  if (patient) {
    return patient;
  } else 
  return null;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };
  patientsToHandle.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatients,
  addPatient,
  getPatient,
  addEntry,
};