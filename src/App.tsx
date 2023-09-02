import React from "react"
import { useState } from "react";

import './App.css';

import Counter from './components/counter/counter';
import SearchForm from "./components/search-form/search-form";
import SelectGenre from "./components/select-genre/select-genre";

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

function App() {
  const [activeGenres, setActiveGenres] = useState([genres[0]]);

  const searchCallback = (searchText: string) => {
    console.log(searchText);
  }

  const changeActiveGenresCallback = (activeGenres: string[]) => {
    console.log(activeGenres);
    setActiveGenres(activeGenres);
  }

  return (<>
    <div className="App-header">
      <h1>Task 1</h1>
      <Counter></Counter>
    </div>

    <div className="App">
      <SearchForm search={searchCallback}></SearchForm>
      <SelectGenre
        genres={genres}
        activeGenres={activeGenres}
        setActiveGenres={changeActiveGenresCallback}
      ></SelectGenre>

      <br></br>
    </div >
  </>
  );
}

export default App;
