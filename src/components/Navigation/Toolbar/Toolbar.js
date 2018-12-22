import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo/>
    <nav>
      NAV...    
    </nav>
  </header>
);

export default Toolbar;