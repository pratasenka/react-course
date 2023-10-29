import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import MovieListPage from './components/movie-list-page/movie-list-page';
import { ModalDialog } from './components/modal-dialog/modal-dialog';
import { EditMovieDetails } from './components/edit-movie-details/edit-movie-details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route
            path="new"
            element={(
              <ModalDialog
                title="Add Movie"
              >
                <EditMovieDetails />
              </ModalDialog>
            )}
          />
          <Route path=":movieId" element={<MovieListPage />}>
            <Route
              path="edit"
              element={(
                <ModalDialog
                  title="Edit Movie"
                >
                  <EditMovieDetails />
                </ModalDialog>
              )}
            />
          </Route>
        </Route>

        <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
