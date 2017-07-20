import React, { PropTypes } from 'react';

import 'stylesheets/reset';

const App = (props) => (
  <section id="application">
    {props.children}
  </section>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
