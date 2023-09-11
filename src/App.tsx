import React from "react"
import { useState } from "react";

import './App.css';

import { Counter } from './components/counter/counter';
import { SearchForm } from "./components/search-form/search-form";
import { SelectGenre } from "./components/select-genre/select-genre";

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

function App() {
  const [activeGenres, setActiveGenres] = useState([genres[0]]);
  const [searchText, setSearchText] = useState('');

  const searchCallback = (searchText: string) => {
    console.log(searchText);
    setSearchText(searchText);
  }

  const changeActiveGenresCallback = (activeGenres: string[]) => {
    console.log(activeGenres);
    setActiveGenres(activeGenres);
  }

  return (<>
    <div className="App">
      <div className="App-header">
        <h1>Task 1</h1>
        <Counter initValue={0} />
      </div>

      <div className="App-content">
        <SearchForm
          searchText={searchText}
          search={searchCallback}
        />
        <SelectGenre
          genres={genres}
          activeGenres={activeGenres}
          setActiveGenres={changeActiveGenresCallback}
        />
      </div >
    </div>
  </>
  );
}

export default App;
