import React, { Component } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'medium-draft/lib/index.css';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
import ImageUploadButton from './ImageUploadButton';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { saveInput } from '../../../redux/actions/input';
import mediumDraftExporter from 'medium-draft/lib/exporter';


export class ArticleCreatePage extends Component {

  constructor(props) {
    super(props);

    this.sideButtons = [{
      title: 'Image',
      component: ImageUploadButton,
    }];

    this.state = {
      editorState: createEditorState(),
      titleEditorState: createEditorState(),
      tags: []
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
    
    this.refsEditor = React.createRef();
  }

  componentDidMount() {
    this.refsEditor.current.focus();
  }

  handleTagChange(tags) {
    this.setState({tags})
  }

  saveTitle(titleEditorState) {
    this.setState({ titleEditorState });
    // const { saveInput } = this.props;
    // const field = e.target.name;
    // const value = e.target.value;
    // saveInput({ process: 'createArticle', field, value });
    const renderedHTML = mediumDraftExporter(titleEditorState.getCurrentContent());
    console.log(renderedHTML);

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

    
    const { inputData: { title } } = this.props;
    const { editorState, titleEditorState } = this.state;

    return (
      <div className='post-content'>
        <header className='post-content__header'>
          <div className='post-content__label'>
            Provide the title
            <br />
            <Editor
              placeholder='Your Title'
              editorState={titleEditorState}
              onChange={this.saveTitle.bind(this)} 
              sideButtons={[]}
            />
            {/* <input className='post-content__text' type="text" onChange={this.saveTitle.bind(this)} /> */}
          </div>
          <div className='post-content__title'>
           {title}
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

          <TagsInput value={this.state.tags} onChange={this.handleTagChange.bind(this)} />  
        </div>
      </div>
    );
  }
}

ArticleCreatePage.propTypes = {
  inputData: PropTypes.object,
  saveInput: PropTypes.func,
}

const mapStateToProps = state => ({
  inputData: state.inputData.createArticle
});

const mapDispatchToProps = dispatch => ({
  saveInput: (payload) => dispatch(saveInput(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreatePage);