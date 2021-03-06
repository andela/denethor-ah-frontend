import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { updateProfile, uploadProfilePicture } from '../../../redux/actions/profile';
import PropTypes from 'prop-types';
import VerticalMargin from '../../VerticalMargin';
import './styles.scss';

export class EditProfile extends Component {
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

  componentDidMount() {
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
        firstnameError: 'cannot contain spaces'
      }));
    }

    if (firstname.length < 3) {
      return this.setState(() => ({
        firstnameError: 'must be at least 3 characters'
      }));
    }
  }

  onFirstnameChange = ({ target: { value: firstname } }) => this.setState({ firstname, firstnameError: '' });

  onLastnameBlur = () => {
    const { lastname } = this.state;
    if (lastname.trim().includes(' ')) {
      return this.setState(() => ({
        lastnameError: 'cannot contain spaces'
      }));
    }

    if (lastname.length < 3) {
      return this.setState(() => ({
        lastnameError: 'must be at least 3 characters'
      }));
    }
  }

  onLastnameChange = ({ target: { value: lastname } }) => this.setState({ lastname, lastnameError: '' });

  onUsernameBlur = () => {
    const { username } = this.state;
    if (username.trim().includes(' ')) {
      return this.setState(() => ({
        usernameError: 'cannot contain spaces'
      }));
    }

    if (this.state.username.length < 3) {
      return this.setState(() => ({
        usernameError: 'must be at least 3 characters'
      }));
    }
  }

  onUsernameChange = ({ target: { value: username } }) => this.setState({ username, usernameError: '' });

  onBioChange = ({ target: { value: bio } }) => {
    if(bio.length < 100) this.setState({ bio, bioError: '' });
  }

  onBioBlur = () => {
    const { bio } = this.state;
    if (bio.length > 0 && bio.length < 10) {
      return this.setState(() => ({
        bioError: 'must be at least 10 characters if present'
      }));
    }
    if (bio.length > 100) {
      this.setState(() => ({
        bioError: 'must be under 100 characters'
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
    this.props.history.push('/dashboard/my-profile');
    toast.success('Profile updated');
  }

  render() {
    const { firstnameError, lastnameError, usernameError, bioError, processing } = this.state;

    const disableButton = !!(firstnameError || lastnameError || usernameError || bioError || processing);

    return (
      <div className='edit-profile body-section'>
        <div className='section-edit-profile-info'>  
          <div className='edit-profile__firstname'>
            <div>
              <span>First Name</span>
              <small className='update-profile-error-message'>
                &nbsp;{firstnameError}
              </small>
            </div>
            <div>
              <input
                onBlur={this.onFirstnameBlur}
                onChange={this.onFirstnameChange}
                value={this.state.firstname}
                className={this.state.firstnameError && 'red-bg'}
              />
            </div>
          </div>

          <div className='edit-profile__lastname'>
            <div>
              <span>Last Name </span>
              <span className='update-profile-error-message'>
                &nbsp;{lastnameError}
              </span>
            </div>
            <div>
              <input
                className={this.state.lastnameError && 'red-bg'}
                onBlur={this.onLastnameBlur}
                onChange={this.onLastnameChange}
                value={this.state.lastname}
              />
            </div>
          </div>

          <div className='edit-profile__username'>
            <div>
              <span>Username </span>
              <span className='update-profile-error-message'>
                &nbsp;{usernameError}
              </span>
            </div>
            <div>
              <input
                className={this.state.usernameError && 'red-bg'}
                onBlur={this.onUsernameBlur}
                onChange={this.onUsernameChange}
                value={this.state.username}
              />
            </div>
          </div>

            <div className="profile__bio">
              <div>
                <span>Bio </span>
                <span className='update-profile-error-message'>
                  &nbsp;{bioError}
                </span>
              </div>
              <div>
                <textarea
                  className={this.state.bioError && 'red-bg'}
                  onBlur={this.onBioBlur}
                  onChange={this.onBioChange}
                  value={this.state.bio}
                />
              </div>
            </div>
            <button className='button button--primary' disabled={disableButton} onClick={this.handleSubmit}>
              <span className={`button__text--login ${processing ? 'hidden' : undefined}`}>
                Update
              </span>
              <span className={processing ? 'spinner spinner--button' : undefined}></span>
            </button>
          <VerticalMargin className='show-for-medium' size={10} />
      </div>
    </div>
    );
  }
}

EditProfile.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
