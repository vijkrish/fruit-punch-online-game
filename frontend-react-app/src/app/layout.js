// src/app/layout.js
import React from 'react';

const RootLayout = ({ children }) => {
  return (
    <html>
      <head>
        <title>Fruit Punch Game</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
