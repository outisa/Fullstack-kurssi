import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient | undefined;
  diagnoses: Array<Diagnosis>;
};

const initialState: State = {
  patients: {},
  patient: undefined,
  diagnoses: []
};

export const setDiagnosisList = (diagnosisList: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const setPatientList = (patientList: Patient []): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addNewPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const showPatient = (patientToShow: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patientToShow
  };
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
