import React, { Component } from 'react';
import axios from 'axios';


export default class Loading extends Component {
  state = {
    loading: 'loading'
  }

  async componentDidMount() {
    try {
      const link = `${process.env.API_ROOT_URL}/users/${this.props.match.params.id}/verify`;
      const { data: { data: { user: { token } } } } = await axios.patch(link);
      window.localStorage.setItem('token', token);
      this.props.history.push('/dashboard');
      } catch(error) {
        console.log(error);
      }
  }

  render() {
    return <div className="redirect-loader">{this.state.loading}<span className="spinner"></span></div>
  }
}
