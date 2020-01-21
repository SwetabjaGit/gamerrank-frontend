import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';


const Paginate = props => {

  const { pagesCount, currentPage, setCurrentPage } = props;

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  return (
    <div className="pagination-wrapper">

      <Pagination size="lg" aria-label="Page navigation example">
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink onClick={e => handleClick(e, 0)} first href="#" />
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={e => handleClick(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>

        {[...Array(pagesCount)].map((page, i) => (
          <PaginationItem active={i === currentPage} key={i}>
            <PaginationLink onClick={e => handleClick(e, i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink
            onClick={e => handleClick(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink
            onClick={e => handleClick(e, pagesCount - 1)}
            last
            href="#"
          />
        </PaginationItem>
      </Pagination>

    </div>
  );
};

Paginate.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default Paginate;