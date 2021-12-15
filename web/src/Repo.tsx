import React from 'react';
import { useParams } from 'react-router-dom';

export function Repo() {
  const { name } = useParams<any>();
  return <div>{name}</div>;
}
