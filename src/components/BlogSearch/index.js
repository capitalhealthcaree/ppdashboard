import React, { useState } from "react";
import SearchBar from "./blogSearchBar";
import SearchResults from "./blogSeachReasult";
import api from "../../services/api";

const App = () => {
  // let list = [];
  const [list, setList] = useState([{}]);
  //https://ppbackend-eight.vercel.app/
  // const posts = await axios.get(
  // SSR_ENDPOINT + "blogs/" + slug[0] + "/" + slug[1] + "/"
  // );
  const handleSearch = async (query) => {
    try {
      const response = await api.get(`blogs/${query}`);
      if (response && response.data && response.data.data) {
        setList(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults list={list} />
    </div>
  );
};

export default App;
