import React from 'react'
import { CoursePart } from '../types'


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
interface Parts {
  part: CoursePart | never;
}
const Part: React.FC<Parts> = ({ part }) => {
  switch(part.name) {
    case "Let's go home":
      return <p>Name: {part.name}, Number of exercises: {part.exerciseCount}, Description: {part.description}</p>;      
    case "Fundamentals":
      return <p>Name: {part.name}, Number of exercises: {part.exerciseCount}, Description: {part.description}</p>;
    case "Using props to pass data":
      return <p>Name: {part.name}, Number of exercises: {part.exerciseCount}, Number of group projects: {part.groupProjectCount}</p>;
    case "Deeper type usage":
      return <p>Name: {part.name}, Number of exercises: {part.exerciseCount}, Description: {part.description}, Link: {part.exerciseSubmissionLink}</p>;
    default:
      return assertNever(part);      
  }
}
export default Part;