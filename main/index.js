import path from 'path';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import applyApi from '../api';

export default () => {
  const app = express();
  app.use(morgan('dev'));
  app.use(express.static(path.resolve(__dirname, '../public')));

  const template = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
  applyApi(app);

  app.get('*', (req, res) => {
    res.send(template);
  });

  return app;
};
