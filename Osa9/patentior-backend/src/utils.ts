/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Gender, NewPatient, Entry, NewHealthCheck, NewHospitalEntry, NewOccupational, HealthCheckRating, Diagnosis } from './types';
import diagnoses from '../data/diagnoses';
//HERE NEEDS TO DO SOMETHING
export const toNewHealthCheckEntry = (object: any): NewHealthCheck => {
  return {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  return {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  };
};

export const toNewOccupationalEntry = (object: any): NewOccupational => {
  return {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    employerName: parseName(object.employerName),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    sickLeave: parseSickLeave(object.sickLeave),
  };
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender:  parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
};

const isDate = (date: string): boolean => {
  console.log(date);
  console.log(Boolean(Date.parse(date) && regexDate.test(date)));
  return Boolean(Date.parse(date) && regexDate.test(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const regexDate = new RegExp('^[+ 0-9]{4}-[0-9]{2}-[0-9]{2}$');
const regexSnn = new RegExp ('^[+ 0-9]{6}-[0-9A-Z]{3,4}$');

const isSnn = (text: any): boolean => {
  return regexSnn.test(text);
};

const isDischarge = (object: any): boolean => {
  return isDate(object.dischargeDate) && isString(object.criteria);
};

const isRightType = (type: any): boolean => {
  console.log(type);
  return type === 'Hospital' || type === 'OccupationalHealthcare' || type === 'HealthCheck';
};

const isCode = (code:  any): boolean =>{
  const diagnose = diagnoses.find((diagnose: Diagnosis) => diagnose.code === code);
  return diagnose === undefined ? false : true;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> | undefined => {
  if (!codes) {
    return undefined;
  }
  const codesToCheck = codes as Array<Diagnosis['code']>;
  codesToCheck.forEach((element: string) => {
    if(!isCode(element)) {
      throw new Error(`All of the codes are not existing ones: ${element}`);
    }
  });
  return codes as Array<Diagnosis['code']>;
};

const parseSickLeave = (sickLeave: any): {startDate: string, endDate: string} | undefined => {
  if (!sickLeave || sickLeave.startDate === "") {
    return undefined;
  }
  if (!isDate(sickLeave.startDate) && !isDate(sickLeave.endDate)) {
    throw new Error(`Incorrect or missing start date: ${sickLeave.startDate}  or end date: ${sickLeave.endDate}  `);
  }
  return  {startDate: sickLeave.startDate as string, endDate: sickLeave.endDate as string};
};
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

const parseDescription = (description: any): string => {
  if (!description ||!isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSnn(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseDischarge = (discharge: any): {dischargeDate: string, criteria: string} => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }
  
  return {dischargeDate: discharge.dischargeDate as string, criteria: discharge.criteria as string};
};

const parseType = (type: any): any => {
  if (!type || !isRightType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  if (type === "Hospital") {
    return "Hospital";
  } else if (type == "OccupationalHealthcare") {
    return "OccupationalHealthcare";
  }
  return "HealthCheck";
};

const parseEntries = (entries: any): Entry[]=> {
  if (!entries) {
    return [];
  }
  const entriesToCheck = entries as Entry[];
  entriesToCheck.forEach((element: Entry)=> {
    if (!isRightType(element.type)) {
      throw new Error(`One or more of the entry types are invalid type: ${element.type}`);
    }
  });
  return entries as Entry[];
};
const parseGender = (gender: any): Gender => {
  if (!Gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  if (name.length < 2 || name.length > 50) {
    throw new Error('Name must be between 2 and 50 characters long.');
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

export default toNewPatient;