import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './index.scss';

class  NavTab extends React.Component {

  componentDidMount () {
    
  }

  render() {
    return (
      <div className="nav-tabs">
        <Link to="/articles?category=fashion" >FASHION</Link>
        <Link to="/articles?category=politics">POLITICS</Link>
        <Link to="/articles?category=health">HEALTH</Link>
        <Link to="/articles?category=education">EDUCATION</Link>
        <Link to="/articles?category=wellness">WELLNESS</Link>
        <Link to="/articles?category=tech">TECH</Link>
        <Link to="/articles?category=design">DESIGN</Link>
    </div>
    )
  }
}


export default (withRouter(NavTab));
