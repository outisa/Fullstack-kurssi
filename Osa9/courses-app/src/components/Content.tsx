import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

export interface Courses {
  courseParts: CoursePart[] | any;
}
type Course = CoursePart | never;

const Content: React.FC<Courses> = ({ courseParts }) => {
  return (
    courseParts.map((part: Course) => 
      <Part key={part.name} part={part} />
    ));
};

export default Content;