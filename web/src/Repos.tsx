import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Repos(props: any) {
  const message = props.message;
  const languages: any[] = props.languages;
  const data: any[] = props.data;
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const fetchRepositories = props.fetch;
  const repoFilter = (e: any) => {
    const language = e.target.id === '' ? null : e.target.id;
    const filteredList = data.filter((el) => el.language === language);
    setFilteredData(filteredList);
  };
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
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
                <h1>
                  <Link to={'/repo/' + el.name}>{el.name}</Link>
                </h1>
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
