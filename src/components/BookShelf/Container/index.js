import React, { useState } from "react";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Container = () => {
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    etag: [],
    authors: [],
  });

  return (
    <div className="container">
      <LeftSide
        setSearchText={setSearchText}
        setFilterOptions={setFilterOptions}
      />

      <RightSide searchText={searchText} filterOptions={filterOptions} />
    </div>
  );
};

export default Container;
