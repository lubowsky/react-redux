import React from 'react';


const Pagination = ({
  totalCount, itemsPerPage, setCurrentPage, currentPage
}) => {
  let pages = [];

  for(let i = 1; i <= Math.ceil(totalCount / itemsPerPage); i++) {
    pages.push(i)
  };
  return (
    <ul className="pagination justify-content-center">
      {pages.map((page, index) => {
        return (
          <li className="page-item" key={index}>
            <span className="page-link" onClick={() => setCurrentPage(page)}>
              {page}
            </span>
          </li>
        );
       })}
    </ul>
  )
};

export default Pagination;
