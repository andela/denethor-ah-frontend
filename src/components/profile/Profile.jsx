import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile, uploadProfilePicture } from '../../redux/actions/profile';
import RoundedImage from '../../components/RoundedImage';
import VerticalMargin from '../../components/VerticalMargin';
import HorizontalMargin from '../../components/HorizontalMargin';
import { RatingStars } from '../../components/rating-stars';
import { HorizontalLine } from '../../components/horizontal-line';
import { toast } from 'react-toastify';
import './styles.scss';


export class Profile extends Component {
  state = {
    bio: '',
    firstname: '',
    firstnameError: '',
    lastname: '',
    lastnameError: '',
    profileRecieved: false,
    processing: false,
    username: '',
    usernameError: '',
    newProfilePicture: ''
  };

  componentDidUpdate() {
    if(this.props.profile.firstname && !this.state.profileRecieved) {
      this.setState({
        firstname: this.props.profile.firstname,
        lastname: this.props.profile.lastname,
        username: this.props.profile.username,
        profileRecieved: true,
        bio: this.props.profile.bio || '',
      })
    }
  }

  onFirstnameBlur = () => {
    const { firstname } = this.state;
    if (firstname.trim().includes(' ')) {
      return this.setState(() => ({
        firstnameError: 'Names cannot contain spaces'
      }));
    }

    if (firstname.length < 3) {
      return this.setState(() => ({
        firstnameError: 'First name must be at least 3 characters'
      }));
    }
  }

  onFirstnameChange = ({ target: { value: firstname } }) => this.setState({ firstname, firstnameError: '' });

  onLastnameBlur = () => {
    const { lastname } = this.state;
    if (lastname.trim().includes(' ')) {
      return this.setState(() => ({
        lastnameError: 'Names cannot contain spaces'
      }));
    }

    if (lastname.length < 3) {
      return this.setState(() => ({
        lastnameError: 'Last name must be at least 3 characters'
      }));
    }
  }

  onLastnameChange = ({ target: { value: lastname } }) => this.setState({ lastname, lastnameError: '' });

  onUsernameBlur = () => {
    const { username } = this.state;
    if (username.trim().includes(' ')) {
      return this.setState(() => ({
        usernameError: 'Username cannot contain spaces'
      }));
    }

    if (this.state.username.length < 3) {
      return this.setState(() => ({
        usernameError: 'Username must be at least 3 characters'
      }));
    }
  }

  onUsernameChange = ({ target: { value: username } }) => this.setState({ username, usernameError: '' });

  onBioChange = ({ target: { value: bio } }) => this.setState({ bio, bioError: '' });

  onBioBlur = () => {
    const { bio } = this.state;
    if (bio.length > 0 && bio.length < 10) {
      return this.setState(() => ({
        bioError: 'Bio must be at least 10 characters if present'
      }));
    }
    if (bio.length > 100) {
      this.setState(() => ({
        bioError: 'Bio must be under 100 characters'
      }));
    }
  }

  onUpload = ({ target: { files: [newProfilePicture]} }) => {
    this.setState({ newProfilePicture })
  }

  handleSubmit = async () => {
    const { id } = this.props.profile;
    const { firstname, lastname, username, bio, newProfilePicture } = this.state;

    const payload = {
      firstname, lastname, username, ...(bio && { bio })
    };

    this.setState({ processing: true })

    let error = await this.props.updateProfile(id, payload);

    if(this.state.newProfilePicture) {
      error = await this.props.uploadProfilePicture(id, newProfilePicture)
    }

    this.setState({ processing: false });

    if (error) {
      return toast.error(error);
    }
    toast.success('Profile updated');
  }

  render() {
    const { 
      firstname,
      lastname,
      username,
      bio, 
      imageUrl = '/assets/img/placeholder-profile-picture.png', 
      body,
      publishedArticles,
      userAverageRating
    } = this.props.profile;

    const { firstnameError, lastnameError, usernameError, bioError, processing } = this.state;

    const disableButton = !!(firstnameError || lastnameError || usernameError || bioError || processing);

    return (
      <div>
        <div className='banner-section'>
          <div className='banner-image'>
            <img src={'/assets/img/map-typing.jpg'} alt='banner background' />
          </div>
          <div className='transparent-overlay' />
          <div className='banner-content'>
            <div className='auto-container'>
              <div className='banner-content-title'>
                {`${firstname} ${lastname}`}
                <div className='profile--bio'>
                  <p>{bio}</p>
                </div>
              </div>
              <div className='avatar-text-group'>
                <div className='user-profile-picture'>
                  <RoundedImage imageSource={imageUrl} alt='profile picture'/>
                  <VerticalMargin className='hide-for-medium' size={50} />
                </div>
                <HorizontalMargin className='show-for-medium' size={10} />
                <div className='profile-username-rate-group'>
                  <div className='profile-header-username'>{username}</div>
                  <div className ='profile-rating-container'>
                    <div className='profile-header-rating'>
                      <RatingStars rateNumber={userAverageRating ? userAverageRating.averageRating : 0} />
                    </div>
                    <div className='profile-header-rated-times'>
                      {
                        !userAverageRating
                          ? <span className='spinner spinner--ratings'></span>
                          : userAverageRating.ratingCount < 1
                            ? 'No ratings yet'
                            : `rated by ${userAverageRating.ratingCount} user${userAverageRating.ratingCount > 1
                              ? 's'
                              : ''}`
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='body-section'>
          <div className='auto-container wide-padding'>
            <div className='profile-body'>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
            <div className="profile__profiles-written">
              <h1>Articles Written: <span>{publishedArticles ? publishedArticles.length : 'None'}</span></h1>
            </div>
            <HorizontalLine />
            <div className='section-profile-info'>  
              <small className='update-profile-error-message'>
                &nbsp;{firstnameError}
              </small>
              <div>
                <span>First Name: </span>
                <input
                  onBlur={this.onFirstnameBlur}
                  onChange={this.onFirstnameChange}
                  value={this.state.firstname}
                  className={this.state.firstnameError && 'red-bg'}
                />
              </div>
              <small className='update-profile-error-message'>
                &nbsp;{lastnameError}
              </small>
              <div>
                <span>Last Name: </span>
                <input
                  className={this.state.lastnameError && 'red-bg'}
                  onBlur={this.onLastnameBlur}
                  onChange={this.onLastnameChange}
                  value={this.state.lastname}
                />
              </div>
              <small className='update-profile-error-message'>
                &nbsp;{usernameError}
              </small>
              <div>
                <span>Username: </span>
                <input
                  className={this.state.usernameError && 'red-bg'}
                  onBlur={this.onUsernameBlur}
                  onChange={this.onUsernameChange}
                  value={this.state.username}
                />
              </div>
              <small className='update-profile-error-message'>
                &nbsp;{bioError}
              </small>
              <div>
                <span>Bio: </span>
                <textarea
                  className={this.state.bioError && 'red-bg'}
                  onBlur={this.onBioBlur}
                  onChange={this.onBioChange}
                  value={this.state.bio}/>
              </div>
              <div>
                <span>Change profile picture: </span>
                <input
                  type='file'
                  onChange={this.onUpload}
                />
              </div>
              <div>
                <span></span>
                <button disabled={disableButton} onClick={this.handleSubmit}>
                  <span className={`button__text--login ${processing ? 'hidden' : undefined}`}>
                    Update
                  </span>
                  <span className={processing ? 'spinner spinner--button' : undefined}></span>
                </button>
              </div>
              <VerticalMargin className='show-for-medium' size={10} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  updateProfile: PropTypes.func,
  uploadProfilePicture: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (id, updatedProfile) => dispatch(updateProfile(id, updatedProfile)),
  uploadProfilePicture: (id, newProfilePicture) => dispatch(uploadProfilePicture(id, newProfilePicture))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
