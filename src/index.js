// vim: ts=4 et sts=4 sw=4

import React from 'react';
import ReactDOM from 'react-dom';

import Demo from './demo';
import Examples from './examples';

ReactDOM.render(
   <Demo />,
   document.getElementById('demo-app')
);

ReactDOM.render(
   <Examples />,
   document.getElementById('examples-app')
);
