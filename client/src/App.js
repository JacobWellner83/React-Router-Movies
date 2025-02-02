import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      listedMovie: null
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    const findMovie = savedList.find(el => movie.id === el.id);
    if (findMovie) {
      this.setState({ movieInList: `You have that movie saved.` });
      setTimeout(() => this.setState({ movieInList: null }), 2000);
    } else {
      savedList.push(movie);
    }

    this.setState({ savedList });
  };

  render() {
    const { listedMovie } = this.state;
    return (
      <div>
        {listedMovie !== null ? (
          <h3 className="movie-notice">{listedMovie}</h3>
        ) : null}
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route
          path="/movies/:id"
          render={props => (
            <Movie {...props} addToSavedList={this.addToSavedList} />
          )}
        />
      </div>
    );
  }
}
