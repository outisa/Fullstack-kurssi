import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types'

const App = () => {
  const courseName = 'Half Stack application development';

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Let's go home",
      exerciseCount: 1000,
      description: "Never ending part"
    }
  ];

  return (
    <div>
      <Header header = {courseName}/>
      <Content courseParts={courseParts} />
      <Total total={courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}/>
    </div>
  );
}

export default App;
