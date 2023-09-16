import React from "react"
import { useState } from "react";

import './App.css';

import { SearchForm } from "./components/search-form/search-form";
import { SelectGenre } from "./components/select-genre/select-genre";
import { Button } from "./components/button/button";

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
      <div className="App-header App-header-background-image">
        <div className="App-header-content App-header-background-blur">
          <div className="App-header-company-name">
            <span className="App-header-company-name-bold">netflix</span>
            <span>roulette</span>

          </div>
          <Button>+ Add Movie</Button>
          <div className="App-header-search">
            <div>FIND YOUR MOVIE</div>
            <SearchForm
              searchText={searchText}
              search={searchCallback}
            />
          </div>

        </div>
      </div>

      <div className="App-content">

        {/* <SelectGenre
          genres={genres}
          activeGenres={activeGenres}
          setActiveGenres={changeActiveGenresCallback}
        /> */}
      </div >
    </div>
  </>
  );
}

export default App;
