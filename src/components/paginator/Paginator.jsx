import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageNavigator from 'react-paginate';
import ContentArea from './ContentArea';
import './styles.scss';

export class Paginator extends Component {
  state = {
    offset: 0,
    limit: 10
  };

  componentDidMount () {
    const { props: { items: { length } }, state: { limit } } = this;
    this.setState({ pageCount: Math.ceil(length/limit) });
    window.scrollTo(0, 0);
  }

  handlePageChange = ({ selected: page }) => {
    const { limit } = this.state;
    this.setState({ offset: page * limit });
    window.scrollTo(0, 0);
  };

  render() {
    const { state: { offset, limit, pageCount }, props: { items }, handlePageChange } = this;

    const pageContent = items.filter((item, i) => (i >= offset) && (i < offset + limit));

    return (
      <div className="paginator">
        <ContentArea items={pageContent} />
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
    )
  }
}

Paginator.propTypes = {
  items: PropTypes.array
}

export default Paginator;
