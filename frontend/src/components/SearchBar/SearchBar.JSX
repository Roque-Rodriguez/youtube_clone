import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    props.setSearchTerm(searchQuery);
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Please Enter Your Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
