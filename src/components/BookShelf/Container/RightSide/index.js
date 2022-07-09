import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

import { Empty } from "antd";

import BookItem from "./BookItem";

const searchAndFilterBook = (data, searchText, filterOptions) => {
  return (
    [...data]

      // use for search item
      .filter((item) => {
        const _searchItems =
          item?.title?.toLowerCase()?.includes(searchText) ||
          item?.searchText?.toLowerCase()?.includes(searchText);

        if (isEmpty(searchText)) return item;

        return _searchItems;
      })

      // use for filter etag & authors
      .filter((item) => {
        const _filterItems =
          filterOptions?.etag?.includes(item?.etag) ||
          filterOptions?.authors?.some((el) => item?.authors?.includes(el));

        if (isEmpty(filterOptions.etag) && isEmpty(filterOptions.authors))
          return item;

        return _filterItems;
      })
  );
};

const RightSide = ({ searchText, filterOptions }) => {
  const bookList = useSelector((state) => state.book);

  const bookListWithSearch = searchAndFilterBook(
    bookList,
    searchText,
    filterOptions
  );

  console.log({ bookListWithSearch });

  const renderBookList = useMemo(() => {
    return bookListWithSearch.map((item, index) => (
      <BookItem
        {...item}
        key={`book-item-${index}`}
        bookList={bookListWithSearch}
      />
    ));
  }, [bookListWithSearch]);

  if (isEmpty(bookListWithSearch))
    return (
      <div className="right-side-empty">
        <Empty description="No matching books found" />
      </div>
    );

  return (
    <div className="right-side">
      <div className="right-side__title">Book List</div>

      <div className="right-side__book-list">{renderBookList}</div>
    </div>
  );
};

export default RightSide;

RightSide.propTypes = {
  searchText: PropTypes.string,
  filterOptions: PropTypes.object,
};

RightSide.defaultProps = {
  searchText: "",
  filterOptions: {},
};
