import axios from 'axios';
import { Router, Request, Response } from 'express';
import localData from '../../data/repos.json';
export const repos = Router();

repos.get('/', async (req: Request, res: Response) => {
  const data = localData.filter((el) => el.fork === false);
  let responseData: any = [];
  let statusCode = 200;
  await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then(function (response) {
      const gitData = response.data.filter(
        (el: { fork: boolean }) => el.fork === false
      );
      responseData = data.concat(gitData);
    })
    .catch(function (error) {
      statusCode = 500;
      responseData = { message: 'Could not fetch the git repos' };
    });
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');
  res.status(statusCode);
  res.json(responseData);
});
