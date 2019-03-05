import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import Main from './Main'

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Main/>
      </Switch>
    </BrowserRouter>
  )
}

export default Root;