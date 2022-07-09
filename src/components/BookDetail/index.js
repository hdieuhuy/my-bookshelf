import React, { useState, useEffect, useMemo } from "react";
import { config } from "src/core/config";

import axios from "axios";
import parse from "html-react-parser";
import { isEmpty, isNumber } from "lodash";
import { useParams } from "react-router-dom";

import { formatPrice } from "src/helpers";

import { Icon } from "@iconify/react";
import Header from "../Layouts/Header";
import ImagePlaceholder from "src/assets/img/placeholder_img.png";
import { useSelector } from "react-redux";

const BookDetail = () => {
  const { id } = useParams();
  const isNewItem = id?.includes("new");

  const bookList = useSelector((state) => state.book);

  const [loading, setLoading] = useState(true);
  const [bookDetailInfo, setBookDetailInfo] = useState({});

  /**
   * Get details book from api
   */
  useEffect(() => {
    if (isEmpty(id) || isNewItem) return;

    axios.get(`${config(id).BASE_URL_GET_BOOK_DETAIL}`).then((res) => {
      setLoading(false);
      setBookDetailInfo({
        title: res?.data?.volumeInfo?.title,
        authors: res?.data?.volumeInfo?.authors,
        subtitle: res?.data?.volumeInfo?.subtitle,
        pageCount: res?.data?.volumeInfo?.pageCount,
        publisher: res?.data?.volumeInfo?.publisher,
        saleability: res?.data?.saleInfo?.saleability,
        description: res?.data?.volumeInfo?.description,
        previewLink: res?.data?.volumeInfo?.previewLink,
        publishDate: res?.data?.volumeInfo?.publishedDate,
        listPrice: res?.data?.saleInfo?.listPrice?.amount,
        retailPrice: res?.data?.saleInfo?.retailPrice?.amount,
        thumbnail: res?.data?.volumeInfo?.imageLinks?.thumbnail,
      });
    });
  }, [id, isNewItem]);

  /**
   * Get detail book from store
   */
  useEffect(() => {
    if (isEmpty(id) || isEmpty(bookList) || !isNewItem) return;

    const currentBook = bookList.find((item) => item?.id === id);

    setLoading(false);
    return setBookDetailInfo({
      title: currentBook?.title,
      authors: currentBook?.authors,
      subtitle: currentBook?.subtitle,
      pageCount: currentBook?.pageCount,
      publisher: currentBook?.publisher,
      saleability: currentBook?.saleability,
      description: currentBook?.description,
      previewLink: currentBook?.previewLink,
      publishDate: currentBook?.publishDate,
      listPrice: currentBook?.listPrice,
      retailPrice: currentBook?.price?.retailPrice,
      thumbnail: currentBook?.thumbnail,
    });
  }, [id, bookList, isNewItem]);

  /**
   * Views
   */
  const renderSale = bookDetailInfo?.saleability === "FOR_SALE" && (
    <div className="content__right-side__sale">sale!</div>
  );

  const renderPrice = useMemo(() => {
    const listPrice = bookDetailInfo?.listPrice;
    const retailPrice = bookDetailInfo?.retailPrice;

    if (!isNumber(listPrice) || !isNumber(retailPrice))
      return <span className="content__right-side__price">FREE!</span>;

    return (
      <div className="content__right-side__price">
        <span>{formatPrice(retailPrice)}</span>

        <span style={{ padding: "0 4px" }}>-</span>

        <span>{formatPrice(listPrice)}</span>
      </div>
    );
  }, [bookDetailInfo]);

  const renderAuthors = bookDetailInfo?.authors?.map((item, index) => {
    if (index === bookDetailInfo?.authors.length - 1) return item;

    return `${item}, `;
  });

  const renderInformation = useMemo(() => {
    const informationObj = [
      {
        label: "Publisher",
        value: bookDetailInfo?.publisher,
      },

      {
        label: "Publish day",
        value: bookDetailInfo?.publishDate,
      },

      {
        label: "Number of pages",
        value: bookDetailInfo?.pageCount,
      },
    ];

    return informationObj.map((item, index) => (
      <div className="information-item" key={`information-item-book-${index}`}>
        <div className="label">{item?.label}</div>

        <div className="value">{item?.value}</div>
      </div>
    ));
  }, [bookDetailInfo]);

  const renderSeeMore = bookDetailInfo?.previewLink && (
    <a
      href={bookDetailInfo?.previewLink}
      className="content__right-side__seemore"
      target="_blank"
      rel="noreferrer"
    >
      See more...
    </a>
  );

  if (loading) {
    return (
      <div className="book-detail-loading">
        <Header />

        <Icon icon="eos-icons:loading" />
      </div>
    );
  }

  return (
    <div className="book-detail">
      <Header />

      <div className="content">
        <div className="content__left-side">
          <img
            src={bookDetailInfo?.thumbnail || ImagePlaceholder}
            alt=""
            className="content__left-side__thumbnail"
          />
        </div>

        <div className="content__right-side">
          {renderSale}

          <div className="content__right-side__title">
            {bookDetailInfo?.title}
          </div>

          <div className="content__right-side__subtitle">
            {bookDetailInfo?.subtitle}
          </div>

          <div className="content__right-side__authors">
            Authors: {renderAuthors}
          </div>

          {renderPrice}

          <div className="content__right-side__description">
            {parse(bookDetailInfo?.description || "")}
          </div>

          {renderSeeMore}

          <div className="content__right-side__information">
            {renderInformation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
