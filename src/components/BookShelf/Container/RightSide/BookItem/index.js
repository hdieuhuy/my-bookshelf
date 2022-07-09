import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import { isNumber } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import parse from "html-react-parser";

import { removeBook } from "src/store/bookSlice";
import { formatPrice } from "src/helpers";

import { notification, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import ModalAddUpdateBook from "src/components/Modals/ModalAddUpdateBook";

import ImagePlaceholder from "src/assets/img/placeholder_img.png";

const BookItem = ({
  id,
  title,
  price,
  authors,
  bookList,
  thumbnail,
  saleability,
  searchText: shortDescription,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalUpdate, setModalUpdate] = useState(false);

  const defaultValue = bookList.find((item) => item?.id === id);

  /**
   * Functions
   */
  const handleGoDetail = () => {
    navigate(`/${id}`);
  };

  const handleRemoveItem = () => {
    notification.success({ message: "Remove a book successfully" });
    dispatch(removeBook(id));
  };

  /**
   * Views
   */
  const renderAuthors = authors?.map((item, index) => {
    if (index === authors.length - 1) return item;

    return `${item}, `;
  });

  const renderPrice = useMemo(() => {
    if (!isNumber(price?.listPrice) || !isNumber(price?.retailPrice))
      return <span>FREE!</span>;

    return (
      <div>
        <span>{formatPrice(price?.retailPrice)}</span>

        <span style={{ padding: "0 4px" }}>-</span>

        <span>{formatPrice(price?.listPrice)}</span>
      </div>
    );
  }, [price]);

  return (
    <div className="book-item">
      <Tooltip title={parse(shortDescription)} placement="right">
        <div className="book-item__thumbnail" onClick={handleGoDetail}>
          <img src={thumbnail || ImagePlaceholder} alt="" />

          {saleability === "FOR_SALE" && (
            <div className="book-item__thumbnail__sale">sale!</div>
          )}
        </div>
      </Tooltip>

      <div className="book-item__actions">
        <div
          className="book-item__actions__item"
          onClick={() => setModalUpdate(true)}
        >
          <Icon icon="akar-icons:pencil" />
        </div>

        <div className="book-item__actions__item" onClick={handleRemoveItem}>
          <Icon icon="ant-design:delete-outlined" />
        </div>
      </div>

      <div className="book-item__title">{title}</div>

      <div className="book-item__authors">{renderAuthors}</div>
      <div className="book-item__price">{renderPrice}</div>

      {isModalUpdate && (
        <ModalAddUpdateBook
          defaultValue={defaultValue}
          visible={isModalUpdate}
          onCancel={() => setModalUpdate(false)}
        />
      )}
    </div>
  );
};

export default BookItem;

BookItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.object,
  thumbnail: PropTypes.string,
  bookList: PropTypes.arrayOf(PropTypes.any),
  authors: PropTypes.arrayOf(PropTypes.string),
};

BookItem.defaultProps = {
  title: "",
  thumbnail: "",
  price: {},
  authors: [],
  bookList: [],
};
