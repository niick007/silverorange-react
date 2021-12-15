import { Router, Request, Response } from 'express';
import data from '../../data/repos.json';
export const repos = Router();

repos.get('/', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');
  res.status(200);
  res.json(data.filter((el) => el.fork === false));
});
