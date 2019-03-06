import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { getFilteredArticles } from '../../redux/actions/filters';
import { getTags } from '../../redux/actions/tags';
import { getAuthors } from '../../redux/actions/authors';
import './styles.scss'

export class SearchForm extends Component { 
  state = {
    searchString: '',
    selectedTag: '',
    selectedAuthor: '',
    authorOptions: [],
    tagOptions: [],
    toastOptions: {
      hideProgressBar: true,
      closeButton: false,
      toastId: 'searchToast',
      className: 'toast-custom-style'
    }
  }

  async componentDidMount() {
    const { props: { isSearchOnly, handleGetAuthors, handleGetTags } } = this;

    if (!isSearchOnly) {
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

    await handleFilter(searchString, selectedTag.value, selectedAuthor.value);
    
    history.push('/filter');
  }

  render() {
    const { 
      props: { isSearchOnly, className }, 
      state: { searchString, selectedAuthor, selectedTag, authorOptions, tagOptions },
      onSearchChange, onAuthorChange, onTagChange, onSubmit 
    } = this;

    return (
      <form onSubmit={onSubmit}>
        <input
          className={className}
          type='text'
          placeholder='Search for articles...'
          value={searchString}
          onChange={onSearchChange}
        />
        {
          !isSearchOnly &&
          <div className='flex filter-section'>
            <span>Filter</span>
            <Select
              placeholder='Authors'
              value={selectedAuthor}
              options={authorOptions}
              onChange={onAuthorChange}
              isClearable={true}
            ></Select>
            <Select
              placeholder='Tags'
              value={selectedTag}
              options={tagOptions}
              onChange={onTagChange}
              isClearable={true}
            ></Select>
            <button className='button button--search'>Search</button>
          </div>
        }
      </form>
    ) 
  }
}

SearchForm.propTypes = {
  handleFilter: PropTypes.func,
  isSearchOnly: PropTypes.bool,
  authors: PropTypes.array,
  tags: PropTypes.array,
  history: PropTypes.object,
  handleGetAuthors: PropTypes.func,
  handleGetTags: PropTypes.func,
  className: PropTypes.string
};

const mapStateToProps = ({ authors, tags }) => ({ authors, tags });

const mapDispatchToProps = (dispatch) => ({
  handleFilter: (search, tag, author) => dispatch(getFilteredArticles(search, tag, author)),
  handleGetAuthors: () => dispatch(getAuthors()),
  handleGetTags: () => dispatch(getTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
