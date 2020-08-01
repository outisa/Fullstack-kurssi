import React from 'react';
import Header from './components/Header';
import Content, { CourseContent } from './components/Content';
import Total from './components/Total';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CourseContent[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 7
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
