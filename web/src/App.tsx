import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any[]>([]);
  const fetchRepositories = async () => {
    axios
      .get('http://localhost:4000/repos')
      .then(function (response) {
        setMessage('Data fetched successfully');
        const processedList = response.data.map(
          (el: { [x: string]: string | number | Date }) => {
            const date = new Date(el.created_at);
            el.created_at = date;
            return el;
          }
        );
        const sortedList = processedList.sort(
          (dateA: { [x: string]: number }, dateB: { [x: string]: number }) =>
            dateB.created_at - dateA.created_at
        );
        setData(sortedList);
      })
      .catch(function (error) {
        setMessage('Unexpected error, please try refreshing the page.');
      });
  };
  useEffect(() => {
    fetchRepositories();
  }, []);
  return (
    <div className="jumbotron">
      <div className="container">
        <header className="text-center">
          <h1>Repositories</h1>
          <div>{message}</div>
        </header>
        <div className="card">
          <div className="card-body">
            {data.map((el) => (
              <div className="mb-3 border-bottom" key={el}>
                <h1>{el.name}</h1>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <span className="text-muted">Language: </span>
                      {el.language}
                    </p>
                    <p>
                      <span className="text-muted">Created at: </span>
                      {el.created_at.toString()}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <span className="text-muted">Fork: </span>
                      {el.forks_count}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <label className="text-muted">Description</label>
                    <p>{el.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
