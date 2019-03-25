import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getArticles } from '../../redux/actions/articles';

class  NavTab extends React.Component {

  componentDidMount () {
    
  }

  render() {
    return (
      <div className="nav-tabs">
    <Link className="nav-tabs__fashion" to="/articles?category=fashion" >FASHION</Link>
    <Link className="nav-tabs__politics" to="/articles?category=politics">POLITICS</Link>
    <Link className="nav-tabs__health" to="/articles?category=health">HEALTH</Link>
    <Link className="nav-tabs__education" to="/articles?category=education">EDUCATION</Link>
    <Link className="nav-tabs__wellness" to="/articles?category=wellness">WELLNESS</Link>
    <Link className="nav-tabs__tech" to="/articles?category=tech">TECH</Link>
    <Link className="nav-tabs__design" to="/articles?category=design">DESIGN</Link>
  </div>
    )
  }
}

NavTab.propTypes = {
  getArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  articles: state.articles || [],
  categories: state.categories || []
})

export default connect(mapStateToProps, {getArticles})(withRouter(NavTab));
