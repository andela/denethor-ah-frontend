import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'medium-draft/lib/index.css';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
import TagsInput from 'react-tagsinput';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import mediumDraftImporter from 'medium-draft/lib/importer';
import { convertToRaw } from 'draft-js';
import ImageUploadButton from './ImageUploadButton';
import 'react-tagsinput/react-tagsinput.css';
import { saveInput } from '../../../redux/actions/input';
import { createArticle } from '../../../redux/actions/articles';
import './style.scss';


export class ArticleCreatePage extends Component {

  sideButtons = [{
    title: 'Image',
    component: ImageUploadButton,
  }];

  state = {
    editorState: createEditorState(),
    titleEditorState: createEditorState(),
    tags: []
  };

  refsEditor = React.createRef();

  componentDidMount() {
    const { newArticleInput: { title = '', body = '', tags = '', categoryId = 0 } } = this.props;
    this.setState({
      editorState: createEditorState(convertToRaw(mediumDraftImporter(body))),
      titleEditorState: createEditorState(convertToRaw(mediumDraftImporter(title))),
      tags: tags.length ? tags.split(',') : [],
      categoryId
    });
  }

  onChange = (editorState) => {
    this.setState({ editorState });
    const { saveInput } = this.props;
    const articleBodyHTML = mediumDraftExporter(editorState.getCurrentContent());
    const field = 'body';
    const value = articleBodyHTML;
    saveInput({ process: 'createArticle', field, value });
  };

  handleTagChange = (tags) => {
    this.setState({tags});
    const { saveInput } = this.props;
    const value = tags.join(',');
    saveInput({ process: 'createArticle', field: 'tags', value });
  }

  saveTitle = (titleEditorState) => {
    this.setState({ titleEditorState });
    const { saveInput } = this.props;
    const articleTitleHTML = mediumDraftExporter(titleEditorState.getCurrentContent());
    const field = 'title';
    const value = articleTitleHTML;
    saveInput({ process: 'createArticle', field, value });
  }

  selectCategory = (e) => {
    const { saveInput, } = this.props;
    const categoryId = e.target.value;
    saveInput({ process: 'createArticle', field: 'categoryId', value: categoryId });
  }

  submitArticle = () => {
    const { newArticleInput, createArticle } = this.props;
    createArticle(newArticleInput).then(response => {
      console.log('success', response);
    }).catch(error => {
      console.log(error, 'Error');
    })
  }

  render() {
    const blockButtons = [{
      label: 'H1',
      style: 'header-one',
      icon: 'header',
      description: 'Heading 1',
    },
    {
      label: 'H2',
      style: 'header-two',
      icon: 'header',
      description: 'Heading 2',
    }];
    
    const { editorState, titleEditorState, categoryId } = this.state;
    const { categories } = this.props;

    const categoryOptions = [<option value='' key={-1}>Select Category</option>];
    categories.forEach((category, index) => {
      categoryOptions.push(<option key={index} value={category.id}>{category.name}</option>);
    });


    return (
      <div className='post-content'>
        <header className='post-content__header'>
          <div className='post-content__label'>
            Provide the title
            <br />
            <Editor
              placeholder='Your Title'
              editorState={titleEditorState}
              onChange={this.saveTitle} 
              sideButtons={[]}
            />
          </div>
        </header>
  
        <div className='post-content__body'>
          <Editor
            ref={this.refsEditor}
            editorState={editorState}
            onChange={this.onChange} 
            sideButtons={this.sideButtons}
            blockButtons={blockButtons}
          />

          <TagsInput value={this.state.tags} onChange={this.handleTagChange} />  

          <select 
            name='categoryId'
            className='article-select'
            onBlur={this.selectCategory}
            onChange={this.selectCategory}
            value={categoryId}
            placeholder='Select Category'>
            {categoryOptions}
          </select>

          <button 
            className='article-submit' 
            type='submit' 
            onClick={this.submitArticle}>
            Create Post
          </button>
        </div>
      </div>
    );
  }
}

ArticleCreatePage.propTypes = {
  newArticleInput: PropTypes.object,
  saveInput: PropTypes.func,
  categories: PropTypes.array,
  createArticle: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    newArticleInput: state.inputData.createArticle,
    categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveInput: (payload) => dispatch(saveInput(payload)),
    createArticle: payload => dispatch(createArticle(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreatePage);