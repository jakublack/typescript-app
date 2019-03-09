import React from 'react';

import './App.scss';

import Film from '../components/Film/Film'

interface AppProps {

}

interface AppState {
  showBtn: boolean;
  films: Array<Film>;
}

interface Film {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  overview: string;
}
class App extends React.Component<AppProps, AppState>  {

  constructor(props: AppProps) {
    super(props);

    this.state = {
      films: [],
      showBtn: true,
    }
  }


  public showFilms() : void {
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=df3c5710c44169cdf3776559c77f511a')
      .then((response) => {
          return response.json();
      })
      .then((response) => {
        const films = response.results;

        console.log(films)

        this.setState({
          films: films,
          showBtn: false
        })

      })
      .catch( error => {
        console.error(error.message);
      })
  }

  public showDetails = (details : string):void => {
    console.log(details)
  }

  public clickRemoveHandler = (id: number): void => {

    // const filmNewList = this.state.films.filter(f => {
    //   return f.id !== id;
    // });

    const filmIndex = this.state.films.findIndex((f: Film) => {
      return f.id === id;
    });

    let films = [...this.state.films];

    films.splice(filmIndex, 1);

    this.setState( {films: films} );

  }

  public render() {
    let films = null;

    films = (
      <div className="App__wrapper-films">
        {this.state.films.map((film: Film) => {
          return <Film
            click={() => this.showDetails(film.overview)}
            clickRemove={() => this.clickRemoveHandler(film.id)}
            data={film}
            key={film.id}/>
        })}
      </div>
    );


    return (
      <div className="App">
        <h1>Today top list films</h1>

        {this.state.showBtn ?
          <button
            className="App__button App__button--show-films"
            onClick={()=>this.showFilms()}
          >Show films</button>
          : null}

          { films }

      </div>
    );
  }
}

export default App;
