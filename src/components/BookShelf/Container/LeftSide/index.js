import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux/es/exports";
import { Input, Select, Button } from "antd";

import ModalAddUpdateBook from "src/components/Modals/ModalAddUpdateBook";

const { Option } = Select;

const LeftSide = ({ setSearchText, setFilterOptions }) => {
  const [isModalAdd, setModalAdd] = useState(false);

  const bookList = useSelector((state) => state.book);

  const listEtag = bookList.map((item) => item.etag);
  const listAuthors = bookList.map((item) => item.authors).flat();

  const uniqueListAuthors = [...new Set(listAuthors)];

  /**
   * Functions
   */
  const handleSearchBook = (e) => {
    const _text = e?.target?.value;

    setSearchText(_text);
  };

  const handleFilter = (key, values) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  /**
   * Views
   */
  return (
    <div className="left-side">
      <div className="left-side__title">Actions</div>

      <div className="left-side__add-new-book">
        <Button type="primary" onClick={() => setModalAdd(true)}>
          Add new book
        </Button>
      </div>

      <div className="left-side__search">
        <div className="left-side__search__title">Search</div>

        <Input
          placeholder="Search title or description"
          onChange={handleSearchBook}
        />
      </div>

      <div className="left-side__filter">
        <div className="left-side__search__title">Filter</div>

        <div className="left-side__filter__wrapper">
          <div className="label">Etag</div>

          <div className="filter-item">
            <Select
              allowClear
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: "100%" }}
              onChange={(values) => handleFilter("etag", values)}
            >
              {listEtag.map((item, index) => (
                <Option value={item} key={`etag-${index}`}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="left-side__filter__wrapper">
          <div className="label">Author</div>

          <div className="filter-item">
            <Select
              allowClear
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: "100%" }}
              onChange={(values) => handleFilter("authors", values)}
            >
              {uniqueListAuthors.map((item, index) => (
                <Option value={item} key={`author-item-${index}`}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <ModalAddUpdateBook
        visible={isModalAdd}
        onCancel={() => setModalAdd(false)}
      />
    </div>
  );
};

export default LeftSide;

LeftSide.propTypes = {
  setSearchText: PropTypes.func,
};

LeftSide.defaultProps = {
  setSearchText: () => {},
  setFilterOption: () => {},
};
