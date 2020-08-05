import React from 'react';
import { Entry } from '../types';
import { Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const getColor = (rating: number) => {
    if (rating === 0) {
      return 'green';
    } else if (rating === 1) {
      return 'yellow';
    } else if (rating === 2) {
      return 'orange';
    }
    return 'red';
  };

  switch (entry.type) {
    case "Hospital":
      return ( 
        <div>
          <p>Discharge date: {entry.discharge.dischargeDate} <br />
          Discharge criteria: {entry.discharge.criteria}</p>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p>Health rating: <Icon color={getColor(entry.healthCheckRating)} name='heart'/> </p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {entry.sickLeave ? 
            <>
            <p><strong>Employer: {entry.employerName}</strong> <br />
            <strong>SickLeave:</strong> <br />
            Starting day: {entry.sickLeave.startDate} <br />
            Ending day: {entry.sickLeave.endDate}</p>
            </> :
            <p><strong>Employer: {entry.employerName}</strong></p>}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
