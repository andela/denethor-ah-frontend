import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = ({ color }) => {
  return (
    <svg width="33" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.6874 19.6992L24.7889 19.2602L24.4478 19.9585L25.0402 20.4615L25.6874 19.6992ZM23.3872 22.9934L24.0344 22.2311L23.3166 21.6217L22.6652 22.3015L23.3872 22.9934ZM28.2277 27.103L28.8749 26.3407L28.2277 27.103ZM31.0467 26.8728L30.2844 26.2256V26.2256L31.0467 26.8728ZM30.8165 24.0537L30.1693 24.8161H30.1693L30.8165 24.0537ZM26 14C26 15.8888 25.5643 17.673 24.7889 19.2602L26.5859 20.1381C27.492 18.2836 28 16.1997 28 14H26ZM14 2C20.6274 2 26 7.37258 26 14H28C28 6.26801 21.732 0 14 0V2ZM2 14C2 7.37258 7.37258 2 14 2V0C6.26801 0 0 6.26801 0 14H2ZM14 26C7.37258 26 2 20.6274 2 14H0C0 21.732 6.26801 28 14 28V26ZM22.6652 22.3015C20.4797 24.5821 17.4063 26 14 26V28C17.9737 28 21.5621 26.3432 24.1092 23.6853L22.6652 22.3015ZM28.8749 26.3407L24.0344 22.2311L22.74 23.7557L27.5805 27.8653L28.8749 26.3407ZM30.2844 26.2256C29.927 26.6466 29.2959 26.6981 28.8749 26.3407L27.5805 27.8653C28.8435 28.9376 30.7367 28.783 31.809 27.52L30.2844 26.2256ZM30.1693 24.8161C30.5903 25.1735 30.6419 25.8046 30.2844 26.2256L31.809 27.52C32.8814 26.2569 32.7268 24.3637 31.4637 23.2914L30.1693 24.8161ZM25.0402 20.4615L30.1693 24.8161L31.4637 23.2914L26.3346 18.9369L25.0402 20.4615Z" fill={color} />
    </svg>
  );
}

SearchIcon.propTypes = {
  color: PropTypes.string,
};

export default SearchIcon;