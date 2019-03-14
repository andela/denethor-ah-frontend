import React from 'react';
import { SideBar } from './side-bar';
import { ContentArea } from './content-area';
import { Switch, Route } from 'react-router-dom';
import { TopReads } from '../articles/top-reads';
import './style.scss';

const DashBoard = () => {
  return (
    <div className={`dashboard-page-wrapper`}>
      <SideBar />
      <ContentArea>
        <Switch>
          <Route path='/dashboard/top-reads' component={TopReads} />
        </Switch>
      </ContentArea>
    </div>
  );
}
export default DashBoard;