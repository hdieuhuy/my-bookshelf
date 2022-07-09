export const config = (id) => ({
  BASE_URL_GET_LIST_BOOK:
    "https://www.googleapis.com/books/v1/volumes?q=reactjs",

  BASE_URL_GET_BOOK_DETAIL: `https://www.googleapis.com/books/v1/volumes/${id}`,
});
