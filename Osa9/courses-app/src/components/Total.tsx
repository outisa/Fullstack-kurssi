import React from 'react';

interface ExercisesTotal {
  total: number;
}
const Total: React.FC<ExercisesTotal> = ({ total }) => {
  return( 
    <p>Total number of exercises: {total }</p>
  );
};

export default Total;