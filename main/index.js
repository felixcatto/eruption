import path from 'path';
import express from 'express';
import fs from 'fs';
// import morgan from 'morgan';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerLocation } from '@reach/router';
import App from '../client/components/App';
import applyApi from '../api';
import { supressConsoleLog } from '../lib/utils';

export default () => {
  const app = express();
  // app.use(morgan('dev'));
  app.use(express.static(path.resolve(__dirname, '../public')));

  const template = fs.readFileSync(path.resolve(__dirname, '../public/html/index.html'), 'utf8');
  applyApi(app);

  app.get('*', (req, res) => {
    const renderedComponent = supressConsoleLog(() =>
      renderToString(
        <ServerLocation url={req.url}>
          <App />
        </ServerLocation>
      )
    );

    const html = template.replace('{{content}}', renderedComponent);
    res.send(html);
  });

  return app;
};
