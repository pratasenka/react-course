import React from "react"

import './App.css';
import MovieListPage from "./components/movie-list-page/movie-list-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/:movieId?' element={<MovieListPage />} />
        <Route path='*' element={<h1 style={{ textAlign: 'center' }}>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    {/* <MovieListPage /> */}
  </>
  );
}

export default App;
