import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageNavigator from 'react-paginate';
import ContentArea from './ContentArea';
import axios from '../../utils/axiosConfig';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';
import NoArticlesFound from './NoArticlesFound';
import Spinner from '../spinner/Spinner';
import './styles.scss';

export class Paginator extends Component {
  state = {};

  api = process.env.API_ROOT_URL;

  async componentDidMount () {
    const { url } = this.props;
    this.setState({ loading: true });
    window.scrollTo(0, 0);
    const { data: { data: items, count } } = await axios.get(`${this.api}${url}`);
    this.setState({ loading: false });
    this.setState({ url, items, pageCount: Math.ceil(count/10) });
  }

  async componentDidUpdate ({ url: prevUrl }) {
    const { url } = this.props;
    if (url !== prevUrl) {
      this.setState({ loading: true });
      window.scrollTo(0, 0);
      const { data: { data: items, count } } = await axios.get(`${this.api}${url}`);
      this.setState({ loading: false });
      this.setState({ url, items, pageCount: Math.ceil(count/10) });
    }
  }

  handlePageChange = async ({ selected: page }) => {
    const { url } = this.state;
    this.setState({ loading: true });
    window.scrollTo(0, 0);
    const { data: { data: items } } = await axios.get(`${this.api}${url}&n=${page}`);
    this.setState({ loading: false });
    this.setState({ items });
  };

  render() {
    const { state: { loading, pageCount, items = [] }, handlePageChange } = this;

    const articles = items.map(article => ({
      ...article,
      featuredImage: extractImageFromBody(article.body),
      dateCreated: toTimeFromNow(article.createdAt)
    }));

    return loading
      ? <div className='paginator-spinner-container'>
          <Spinner loading={loading} />
        </div>
      : articles[0]
        ? (
          <div className="paginator">
            <ContentArea items={articles} />
            {
              pageCount > 1
                &&
                <PageNavigator
                  previousLabel={'prev'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
            }
          </div>
      ) : (
        <NoArticlesFound />
      )
  }
}

Paginator.propTypes = {
  url: PropTypes.string
}

export default Paginator;
