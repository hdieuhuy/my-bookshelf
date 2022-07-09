import React, { useEffect, useState } from "react";
import { config } from "src/core/config";

import axios from "axios";
import { useDispatch } from "react-redux";
import { getListBook } from "src/store/bookSlice";

import Header from "../Layouts/Header";
import Container from "./Container";
import { Icon } from "@iconify/react";

const BookShelf = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  /**
   * Get list book from api
   */
  useEffect(() => {
    const handleGetListBook = (data) => {
      dispatch(getListBook(data));
    };

    axios.get(config().BASE_URL_GET_LIST_BOOK).then((res) => {
      handleGetListBook(res?.data?.items);
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bookshelf-loading">
        <Header />

        <Icon icon="eos-icons:loading" />
      </div>
    );
  }

  return (
    <div className="bookshelf">
      <Header />

      <Container />
    </div>
  );
};

export default BookShelf;
