import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../Button";
import { v4 as uuidv4 } from "uuid";

import styles from './Pagination.module.css'

const Pagination = ({ pagination, onPageChange }) => {
  const { page, limit, total } = pagination;
  
  const totalPages = Math.ceil(total / limit);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const [renderItem, setRenderItem] = useState(pageNumbers);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setRenderItem(pageNumbers);
  }, [pagination]);

  const handlePrev = () => {
    handlePageChange(currentPage - 1 < 0 ? 1 : currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    handlePageChange(currentPage + 1 > totalPages ? totalPages : currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["inner"]}>
        <span
          onClick={handlePrev}
          className={`${styles["item"]} ${
            currentPage <= 1 ? styles["item--disabled"] : ""
          }`}
        >
          <MdKeyboardArrowLeft />
        </span>
        {renderItem.map((item, index) => (
          <React.Fragment key={uuidv4()}>
            {item < maxPageNumberLimit + 1 && item > minPageNumberLimit ? (
              <span
                onClick={() => handlePageChange(item)}
                className={`${styles["item"]} ${
                  item === +page ? styles["active"] : ""
                }`}
              >
                {item}
              </span>
            ) : null}
          </React.Fragment>
        ))}
        <span
          onClick={handleNext}
          className={`${styles["item"]} ${
            currentPage >= totalPages ? styles["item--disabled"] : ""
          }`}
        >
          <MdKeyboardArrowRight />
        </span>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
