import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import * as Yup from "yup";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { Formik, Field, Form } from 'formik';
import { useStateValue } from '../state';
import moment from 'moment';

export type HospitalFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
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
  discharge: Yup.object().shape({
    dischargeDate: Yup.date().transform((_value, originalvalue) =>{
        const correct = moment(originalvalue, "YYYY-MM-DD", true).toDate();
        return correct;
      })
      .required('Field is required'),
    criteria: Yup.string()
      .min(2, "Description of the criteria is too short! Must be over 2 characters.")
      .max(255, "Description of the field is too long! Must be under 255 chracters.")
      .required('Field is required')
  })
});
const AddHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        discharge: {
          dischargeDate: "",
          criteria: "",
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
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.dischargeDate"
              className="discharge.date"
              component={TextField} 
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
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
                  Add hospital entry
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalForm;