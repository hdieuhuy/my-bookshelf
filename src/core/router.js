import React from "react";
import BookShelf from "src/components/BookShelf";
import BookDetail from "src/components/BookDetail";

const routes = [
  {
    path: "/",
    exact: true,
    element: <BookShelf />,
  },
  {
    path: "/:id",
    exact: true,
    element: <BookDetail />,
  },
  {
    path: "*",
    element: <div>error page</div>,
  },
];

export default routes;
