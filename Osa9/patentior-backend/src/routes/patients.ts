import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, {toNewHealthCheckEntry, toNewHospitalEntry, toNewOccupationalEntry} from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatient(id));
});

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  let newEntry = null;
  /*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/
  if (req.body.type === 'Hospital') {
    newEntry = toNewHospitalEntry(req.body);
  /*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/
  } else if (req.body.type === 'HealthCheck') {
    newEntry = toNewHealthCheckEntry(req.body);
  } else {
    newEntry = toNewOccupationalEntry(req.body);
    console.log(newEntry);
  }
  const addedEntry  = patientService.addEntry(newEntry, id);
  res.json(addedEntry);
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});
export default router;