import { createSlice } from "@reduxjs/toolkit";
import { getUniqueArr } from "src/helpers";

const bookSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    getListBook(_, action) {
      const _state = [...getUniqueArr(action.payload, "id")]?.map((item) => ({
        id: item?.id,
        etag: item?.etag,
        title: item?.volumeInfo?.title,
        authors: item?.volumeInfo?.authors,
        subTitle: item?.volumeInfo?.subtitle,
        publisher: item?.volumeInfo?.publisher,
        pageCount: item?.volumeInfo?.pageCount,
        saleability: item?.saleInfo?.saleability,
        searchText: item?.searchInfo?.textSnippet,
        previewLink: item?.volumeInfo?.previewLink,
        description: item?.volumeInfo?.description,
        publishDate: item?.volumeInfo?.publishedDate,
        thumbnail: item?.volumeInfo?.imageLinks?.thumbnail,
        price: {
          listPrice: item?.saleInfo?.listPrice?.amount,
          retailPrice: item?.saleInfo?.retailPrice?.amount,
        },
      }));

      return _state;
    },

    addNewBook(state, action) {
      const _state = [...state, action.payload];

      return _state;
    },

    updateBook(state, action) {
      const _state = [...state];
      const bookIndex = _state.findIndex(
        (item) => item?.id === action.payload.id
      );

      return [
        ..._state.slice(0, bookIndex),
        { ...action.payload },
        ..._state.slice(bookIndex + 1),
      ];
    },

    removeBook(state, action) {
      const _state = [...state];
      const bookIndex = _state.findIndex((item) => item?.id === action.payload);

      return [..._state.slice(0, bookIndex), ..._state.slice(bookIndex + 1)];
    },
  },
});

const { actions, reducer } = bookSlice;
export const { getListBook, addNewBook, removeBook, updateBook } = actions;

export default reducer;
