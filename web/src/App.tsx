import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Repos } from './Repos';
import { Repo } from './Repo';

export function App() {
  const [message, setMessage] = useState('');
  const [languages, setLanguages] = useState<any[]>([]);
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
        const languageList = processedList.map(
          (el: { [x: string]: any }) => el.language
        );
        setLanguages(Array.from(new Set(languageList)));
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
    <>
      {data.length > 0 ? (
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/">
              <Repos
                data={data}
                languages={languages}
                message={message}
                fetch={fetchRepositories}
              />
            </Route>
            <Route path="/repo/:name">
              <Repo data={data} />
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
}
