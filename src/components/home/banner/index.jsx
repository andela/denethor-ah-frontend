import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Screen from './screen';
import './styles.scss';


export const Banner = ({ bannerScreen: content, history, isLoggedIn }) => {
  return (
    <div className="banner">
      <div className={"banner__slogan"}>
        <div>
          <h1 className="banner__yellow-text hidden-on-mobile">The place <br /> writers love...</h1>
          <h1><span className="banner__yellow-text-mobile">Great writers,</span><br />Quality Content</h1>
          {
            !isLoggedIn
              ? <button onClick={() => history.push('/signup')}>Get Started</button>
              : <button onClick={() => history.push('/dashboard')}>Dashboard</button>
          }
        </div>
      </div>
      <Screen content={content} />
    </div>
  );
}

Banner.propTypes={
  bannerScreen: PropTypes.string,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

const BannerWithRouter = withRouter(Banner);

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(BannerWithRouter);
