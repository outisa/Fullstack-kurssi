/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/restrict-template-expressions*/
import { Gender, NewPatient } from './types';

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender:  parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date) && regexDate.test(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const regexDate = new RegExp('^[+ 0-9]{4}-[0-9]{2}-[0-9]{2}$');
const regexSnn = new RegExp ('^[+ 0-9]{6}-[0-9A-Z]{3,4}$');

const isSnn = (text: any): boolean => {
  return regexSnn.test(text);
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSnn(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
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
  if (name.length < 6 || name.length > 50) {
    throw new Error('Name must be between 6 and 50 characters long.');
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