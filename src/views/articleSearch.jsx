
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { searchFuntionality } from '../redux/actions/searchFunctionality'
import Footer from '../components/footer'

export class FooterSearchView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchInput: '',
      };
    }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleOnKeyPress = (event) => {
    if (event.key === 'Enter') {
    this.setState({ [event.target.id]: event.target.value });
     this.props.saveSearchInput(this.state.searchInput);
    }
  }

 render() {
      return (
          <Footer 
          onChange={this.handleOnChange }
          onKeyPress={this.handleOnKeyPress}
          />
      );
    }
  }

  const mapStateToProps = state => ({
      textTyped: state.placeholderReducer,
  });
const mapDispatchToprops = dispatch => ({
    saveSearchInput: (searchInput) => dispatch(searchFuntionality(searchInput)),
});

export default connect(mapStateToProps, mapDispatchToprops)(FooterSearchView);