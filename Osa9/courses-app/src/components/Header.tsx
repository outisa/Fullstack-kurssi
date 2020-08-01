import React from 'react';

interface CourseName {
  header: string;
}

const Header: React.FC<CourseName> = ({ header }) => {
  return <h1>{header}</h1>;
};

export default Header;