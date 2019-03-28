import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Select from 'react-select';

import getFilteredArticles from '../../redux/actions/filters';
import { getTags } from '../../redux/actions/tags';
import getAuthors from '../../redux/actions/authors';
import './styles.scss'

export class SearchForm extends Component { 
  state = {
    searchString: '',
    selectedTag: '',
    selectedAuthor: '',
    authorOptions: [],
    tagOptions: [],
    disableButton: false,
    toastOptions: {
      hideProgressBar: true,
      closeButton: false,
      toastId: 'searchToast',
      className: 'toast-custom-style'
    }
  }

  async componentDidUpdate(prevProps) {
    const { props: { isLoggedIn, handleGetAuthors, handleGetTags } } = this;

    if (isLoggedIn !== prevProps.isLoggedIn) {
      
      await handleGetAuthors();
      await handleGetTags()

      const authorOptions = this.props.authors.map(({ username }) => ({ value: username, label: username }));
      const tagOptions = this.props.tags.map(({ id, tagText }) => ({ value: id, label: tagText }));

      this.setState({ authorOptions });
      this.setState({ tagOptions });
    }
  }

  onSearchChange = ({ target: { value } }) => this.setState({ searchString: value });
  onAuthorChange = (value) => this.setState({ selectedAuthor: value });
  onTagChange = (value) => this.setState({ selectedTag: value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { 
      state: { searchString, selectedTag, selectedAuthor, toastOptions },
      props: { handleFilter, history } 
    } = this;

    if (!searchString && !selectedTag && !selectedAuthor) {
      return toast.error('No filter parameter was entered', toastOptions);
    }

    this.setState({ disableButton: true });
    await handleFilter(searchString, selectedTag.value, selectedAuthor.value);
    this.setState({ disableButton: false });
    history.push('/filter');
  }

  render() {
    const { 
      props: { isLoggedIn, location: { pathname }, profile: { username = '' } =  {} }, 
      state: { searchString, selectedAuthor, selectedTag, authorOptions, tagOptions, disableButton },
      onSearchChange, onAuthorChange, onTagChange, onSubmit 
    } = this;

    return (
      <form onSubmit={onSubmit}>
        <div className={`search-bar ${!isLoggedIn ? 'w-100' : ''}`}>
          <input
            type='text'
            placeholder={
              pathname.includes("/dashboard") ?
              'You can only filter dashboard publications by Tags' :
              'Search for articles...'
            }
            value={searchString}
            onChange={onSearchChange}
            disabled={pathname.includes("/dashboard")}
          />
        </div>
        {
          isLoggedIn &&
          <div className='flex filter-section'>
            <Select
              placeholder='Authors'
              value={pathname.includes("/dashboard") ? { value: username, label: username } : selectedAuthor}
              options={authorOptions}
              onChange={onAuthorChange}
              isClearable={true}
              isDisabled={pathname.includes("/dashboard")}
            ></Select>
            <Select
              placeholder='Tags'
              value={selectedTag}
              options={tagOptions}
              onChange={onTagChange}
              isClearable={true}
            ></Select>
            <button 
              className='button button--search' 
              disabled={disableButton}
            >
              <span className={disableButton ? 'hidden' : undefined}>Search</span>
              <span className={disableButton ? 'spinner spinner--button' : undefined} />
            </button>
          </div>
        }
      </form>
    ) 
  }
}

SearchForm.propTypes = {
  handleFilter: PropTypes.func,
  authors: PropTypes.array,
  tags: PropTypes.array,
  history: PropTypes.object,
  handleGetAuthors: PropTypes.func,
  handleGetTags: PropTypes.func,
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  location: PropTypes.object,
  profile: PropTypes.object
};

const mapStateToProps = ({ authors, tags, profile }) => ({ authors, tags, profile });

const mapDispatchToProps = (dispatch) => ({
  handleFilter: (search, tag, author) => dispatch(getFilteredArticles(search, tag, author)),
  handleGetAuthors: () => dispatch(getAuthors()),
  handleGetTags: () => dispatch(getTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
