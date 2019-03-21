import React from 'react';
import PropTypes from 'prop-types';

const UsersList = ({ users }) => {
  const usersList = users.map(({ imageUrl, firstname }, index) => {
    return (
      <div key={index} className='user-card'>
        <div className='user-card_avatar'>
          <img src={imageUrl} alt="user avatar"/>
        </div>
        <div className='user-card__text'>
          <h1>{firstname}</h1>
        </div>
      </div>
    )
  })
  return (
    <div>
      {usersList}
    </div>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired
}

export default UsersList;