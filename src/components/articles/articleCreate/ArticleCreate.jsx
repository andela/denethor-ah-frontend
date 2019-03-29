import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'medium-draft/lib/index.css';
import validator from 'validator';
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
    const { newArticleInput: { title = '', body = '', tags = '', categoryId = 0, references } } = this.props;
    this.setState({
      editorState: createEditorState(convertToRaw(mediumDraftImporter(body))),
      titleEditorState: createEditorState(convertToRaw(mediumDraftImporter(title))),
      tags: tags.length ? tags.split(',') : [],
      categoryId,
      references
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
    const cleanTitleText = articleTitleHTML.replace(/<\/?[^>]+(>|$)/g, "");
    const value = cleanTitleText;
    saveInput({ process: 'createArticle', field, value });
    saveInput({ process: 'createArticle', field: 'description', value });
  }

  selectCategory = (e) => {
    const { saveInput, } = this.props;
    const categoryId = e.target.value;
    saveInput({ process: 'createArticle', field: 'categoryId', value: categoryId });
  }

  submitArticle = () => {
    let { newArticleInput, createArticle, history } = this.props;
    let data = {
      ...newArticleInput,
      title: validator.escape(newArticleInput.title),
      body: validator.escape(newArticleInput.body),
    };
    
    createArticle(data).then(response => {
      toast.success('Article created success');
      history.push(`/articles/${response.data.data.id}`);
    }).catch(error => {
      if(error.response && error.response.status === 422){
        toast.error('Please fill all fields');
      } else {
        toast.error('Unknown error');
      }
    });
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
    
    const { editorState, titleEditorState } = this.state;
    const { categoryId } = this.props.newArticleInput;
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
  history: PropTypes.object
}

function mapStateToProps(state) {
  return {
    newArticleInput: state.inputData.createArticle,
    categories: state.categories,
  }
}

const mapDispatchToProps = ({
  saveInput,
  createArticle
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreatePage);