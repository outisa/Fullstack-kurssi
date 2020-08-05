import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';

const EntryDataBasic: React.FC<{ entry: Entry }>= ({ entry }) => {
  const [ { diagnoses } ] = useStateValue();
  
  const getDiagnose = (diagnosis: string): string => {
    const diagnose = diagnoses.find(diagnose => diagnose.code === diagnosis);
    if (!diagnose) {
      return 'description dor this code is missing!';
    }
    return diagnose.name;
  };
  const getEntryType = (type: string) => {
    if (type==='Hospital') {
      return 'hospital';
    } else  if (type==='HealthCheck') {
      return 'user md';
    }
    return 'stethoscope';
  };

  return ( 
    <div>
      <h4>{entry.date} <Icon name={getEntryType(entry.type)}/></h4>
      <p>{entry.description }</p>
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(diagnosis => 
          <li key={diagnosis}>{diagnosis} {getDiagnose(diagnosis)}</li>) : null}
      </ul>
    </div>
  );  
};

export default EntryDataBasic;