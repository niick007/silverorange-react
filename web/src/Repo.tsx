import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

export function Repo(props: any) {
  const { name } = useParams<any>();
  const [messages, setMessages] = useState('');
  const data: any[] = props.data;
  const [repoData, setRepoData] = useState<any[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [readme, setReadme] = useState('');

  useEffect(() => {
    setRepoData(data.filter((el: { name: string }) => el.name === name));
  }, [data, name]);
  useEffect(() => {
    if (repoData.length > 0) {
      if (repoData[0].hasOwnProperty('commits_url')) {
        axios
          .get(
            'http://api.github.com/repos/' + repoData[0].full_name + '/commits'
          )
          .then(function (response) {
            setCommits(response.data);
            setMessages('Data fetched successfully');
          })
          .catch(function (error) {
            setMessages('Unexpected error, please try refreshing the page.');
          });
      }
      axios
        .get(
          'https://raw.githubusercontent.com/' +
            repoData[0].full_name +
            '/master/README.md'
        )
        .then(function (response) {
          setReadme(response.data);
        })
        .catch(function (error) {
          error.response.status === 404
            ? setReadme('ReadMe not Found')
            : setReadme('Unable to load readme');
        });
    }
  }, [repoData]);
  return (
    <div className="jumbotron">
      <div className="container">
        <div>
          <p>{messages}</p>
        </div>
        {repoData.map((el) => (
          <div className="card" key={el}>
            <div className="card-body">
              <h1>Repo: {el.name}</h1>
              {el.hasOwnProperty('commits_url') && commits.length > 0 ? (
                <>
                  <p className="text-muted">
                    Most recent commit:{' '}
                    {new Date(commits[0].commit.author.date).toString()}
                  </p>
                  <p>Author: {commits[0].commit.author.name}</p>
                  <p>Commit message: {commits[0].commit.message}</p>
                </>
              ) : (
                <p>Commit object not found</p>
              )}
              {readme !== '' ? (
                <div>
                  <p>Readme:</p>
                  <Markdown>{readme}</Markdown>
                </div>
              ) : (
                <p>No Readme</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
