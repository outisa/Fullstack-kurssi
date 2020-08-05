import React from 'react';
import axios from 'axios';
import { Icon, Container, Segment, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useStateValue, showPatient}  from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry} from '../types';
import { EntryFormValues } from '../AddHealthCheckEntryModal/AddHealthCheckForm';
import { HospitalFormValues } from '../AddHospitalEntryModal/AddHospitalEntryForm'; 
import AddHealthCheckEntryModal from '../AddHealthCheckEntryModal';
import AddHospitalEntryModal from '../AddHospitalEntryModal';
import AddOccupationalEntryModal from '../AddOccupationalEntryModal';
import { OccupationalFormValues } from '../AddOccupationalEntryModal/AddOccupationalForm';
import EntryDataBasic from './EntryDataBasic';
import EntryDetails from './EntryDetails';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch ] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const [modalHospital, setModalHospitalOpen] = React.useState<boolean>(false);
  const [modalHealthCheck, setModalHealthCheckOpen] = React.useState<boolean>(false);
  const [modalOccupational, setModalOccupationalOpen ] = React.useState<boolean>(false);
  const [entryAdded, setEntryAdded] = React.useState<boolean>(false);
  const openModalHealthCheck = (): void => setModalHealthCheckOpen(true);
  const openModalHospital = (): void => setModalHospitalOpen(true);
  const openModalOccupational = (): void => setModalOccupationalOpen(true);

  const closeModal = (): void => {
    setModalHospitalOpen(false);
    setModalHealthCheckOpen(false);
    setModalOccupationalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientToShow } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);    
        dispatch(showPatient(patientToShow));
      } catch (e) {
        console.error(e);
        setError(`Patient with id ${id} does not exist.`);
      }
    };
    if (patient === undefined || patient.id !== id || entryAdded) {
      fetchPatient();
      setEntryAdded(false);
    }
  }, [id, dispatch, patient, entryAdded ]);

  if(!id || patient === undefined ) {
    return null;
  }
  const getType = (gender: string) => {
    if (gender === 'male') {
      return 'man';
    } else if (gender === 'female') {
      return 'woman';
    }
    return 'other gender';
  };

  const submit = async (entryToAdd: Entry) => {
    try {
      const {data: addedEntry } =await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entryToAdd);
      console.log(addedEntry);
      setEntryAdded(true);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitNewEntry = (values: EntryFormValues ) => {
    const entryToAdd = {
      ...values,
      type: 'HealthCheck'
    };
    submit(entryToAdd as Entry);
  };

  const submitHospitalEntry = (values: HospitalFormValues) => {
    const entryToAdd = {
      ...values,
      type: 'Hospital'
    };
    submit(entryToAdd as Entry);
  };

  const submitOccupationalEntry = (values: OccupationalFormValues) => {
    const entryToAdd = {
      ...values,
      type: 'OccupationalHealthcare'
    };
    console.log(entryToAdd);
    submit(entryToAdd as Entry);
  };
  
  return (
    <Container>
        <h2> {patient.name} <Icon size='large' name={getType(patient.gender)}/></h2>
        <p>Ssn: {patient.ssn}<br />
        Occupation: {patient.occupation} <br />
        Date of Birth: {patient.dateOfBirth}</p>
        <h4>Entries</h4>
        {patient.entries ? patient.entries.map((entry: Entry) =>
          <Segment key={entry.id}>
          <EntryDataBasic entry={entry}/>
          <EntryDetails entry={entry}/>
          </Segment>) 
          : null
        }
        <AddHealthCheckEntryModal 
          modalOpen={modalHealthCheck}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <AddHospitalEntryModal 
          modalOpen={modalHospital}
          onSubmit={submitHospitalEntry}
          error={error}
          onClose={closeModal}   
        />
        <AddOccupationalEntryModal 
          modalOpen={modalOccupational}
          onSubmit={submitOccupationalEntry}
          error={error}
          onClose={closeModal}   
        />
        <Button onClick={() => openModalHealthCheck()}>Add New Health Check Entry</Button>
        <Button onClick={() => openModalHospital()}>Add New Hospital Entry</Button>
        <Button onClick={() => openModalOccupational()}>Add New Occupational Healthcare Entry</Button>
      </Container> 
  );
};

export default PatientPage;