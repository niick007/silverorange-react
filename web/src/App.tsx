import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export function App() {
  const [message, setMessage] = useState('');
  const [languages, setLanguages] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
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
        const languageList = processedList.map(
          (el: { [x: string]: any }) => el.language
        );
        setLanguages(Array.from(new Set(languageList)));
        const sortedList = processedList.sort(
          (dateA: { [x: string]: number }, dateB: { [x: string]: number }) =>
            dateB.created_at - dateA.created_at
        );
        setData(sortedList);
        setFilteredData(sortedList);
      })
      .catch(function (error) {
        setMessage('Unexpected error, please try refreshing the page.');
      });
  };
  const repoFilter = (e: any) => {
    const language = e.target.id === '' ? null : e.target.id;
    const filteredList = data.filter((el) => el.language === language);
    setFilteredData(filteredList);
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
        <div>
          <button className="btn btn-success" onClick={fetchRepositories}>
            Refresh
          </button>
          {languages.map((el) => (
            <button
              id={el}
              className="btn btn-primary"
              key={el}
              onClick={repoFilter}
            >
              {el === null ? 'No Language' : el}
            </button>
          ))}
        </div>
        <div className="card">
          <div className="card-body">
            {filteredData.map((el) => (
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
