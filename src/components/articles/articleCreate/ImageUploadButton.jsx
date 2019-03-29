import React from 'react';
import {
  ImageSideButton,
  Block,
  addNewBlock,
} from 'medium-draft';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CustomImageSideButton extends ImageSideButton {
  async onChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'yo1hksht');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/jsamcloud12/image/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.status === 200) {
          const data = await response.json();
          if (data.url) {
            this.props.setEditorState(addNewBlock(
              this.props.getEditorState(),
              Block.IMAGE, {
                src: data.url,
              }
            ));
          }
        }
      }
      finally { this.props.close() }
    }
    this.props.close();
  }

  render() {
    return (
      <button 
        className="md-sb-button md-sb-img-button md-add-btn-anim-enter-done" 
        type="button" 
        title="Add an Image">
        <label htmlFor="article-image-upload">
          <FontAwesomeIcon icon={faImage} color='#818181' size="1x" />
        </label>
        <input type="file" id="article-image-upload" accept="image/*" onChange={this.onChange} style={{display: 'none'}} />
      </button>
    )
  }
}