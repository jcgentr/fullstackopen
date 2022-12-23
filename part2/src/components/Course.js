import React from "react";

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts
        .map((part) => part.exercises)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
    </p>
  );
};
