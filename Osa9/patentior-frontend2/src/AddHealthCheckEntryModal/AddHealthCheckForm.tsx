import React from 'react';
import * as Yup from "yup";
import { Button, Grid } from 'semantic-ui-react';
import { TextField, DiagnosisSelection, NumberField} from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";
import { Formik, Field, Form } from 'formik';
import { useStateValue } from '../state';
import moment from 'moment';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  date: Yup.date().transform((_value, originalvalue) => {
      const correct = moment(originalvalue, "YYYY-MM-DD", true).toDate();
      return correct;
    })
    .max(new Date(), 'Date cannot be in the future')
    .required('Field is required!'),
  description: Yup.string()
    .min(2, 'Description is too short. Required length is over 2 characters.')
    .max(255, 'Description is too long. required length is under 255 characters.')
    .required('Field is required!'),
  specialist: Yup.string()
    .min(6, 'Name of the specialist is too short. Required length is over 6 characters.')
    .max(255, 'Name of the specialist is too long. required length is under 255 characters.')
    .required('Field is required!'),
  healthCheckRating: Yup.number().required('Field is required!')
});
const AddHealthCheckForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        healthCheckRating: 1,
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
              label="Health check rating"
              name="healthCheckRating"
              min={0}
              max={3}
              component={NumberField} 
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
                  Add health check entry
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckForm;