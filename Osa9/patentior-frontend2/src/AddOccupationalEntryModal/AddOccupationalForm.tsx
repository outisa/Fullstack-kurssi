import React from 'react';
import * as Yup from "yup";
import { Button, Grid } from 'semantic-ui-react';
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { Formik, Field, Form } from 'formik';
import { useStateValue } from '../state';
import moment from 'moment';

export type OccupationalFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
}

const validationSchema= Yup.object().shape({
  date: Yup.date().transform((_value, originalvalue) =>{
      const correct = moment(originalvalue, "YYYY-MM-DD", true).toDate();
      return correct;
    })
    .max(new Date(), 'Date cannot be in the future')
    .required('Field is required'),
  description: Yup.string()
    .min(2, 'Description is too short. Required length is over 2 characters.')
    .max(255, 'Description is too long. required length is under 255 characters.')
    .required('Field is required!'),
  specialist: Yup.string()
    .min(6, 'Name of the specialist is too short. Required length is over 6 characters.')
    .max(255, 'Name of the specialist is too long. required length is under 255 characters.')
    .required('Field is required!'),
  employerName: Yup.string()
    .min(2, 'Name of the employer is too short. Required length is over 2 characters.')
    .max(50, 'Name of the employer is too long. required length is under 50 characters.')
    .required('Field is required!'),
  sickLeave: Yup.object().shape({
    startDate: Yup.date().transform((_value, originalvalue) =>{
      const correct = moment(originalvalue, "YYYY-MM-DD", true).toDate();
      return correct;
      })
      .min(new Date(), 'Date can not be in past!')
      .notRequired(),
    endDate: Yup.date().transform((_value, originalvalue) =>{
      const correct = moment(originalvalue, "YYYY-MM-DD", true).toDate();
      return correct;
      }).min(Yup.ref('startDate'), 'End date must be later than start date. Please scheck both fields!')
      .notRequired()
  })
});

const AddOccupationalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
           <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="Sick leave start date"
              name="sickLeave.startDate"
              component={TextField} 
            />
            <Field
              label="Sick leave end Date"
              placeholder="Sick leave end Date"
              name="sickLeave.endDate"
              component={TextField} 
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add Occupational entry
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalForm;