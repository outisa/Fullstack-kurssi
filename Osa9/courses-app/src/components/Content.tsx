import React from 'react';

export interface CourseContent {
  name: string;
  exerciseCount: number;
}

export interface Courses {
  courseParts: CourseContent[] | any;
}


const Content: React.FC<Courses> = ({ courseParts }) => {
  return (
    courseParts.map((course: CourseContent) => <p key={course.name}> {course.name} {course.exerciseCount}</p>)
  );
};

export default Content;