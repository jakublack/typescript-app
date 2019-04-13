import React from 'react'

import './Film.scss';

export interface Film {
    vote_average: number;
    title: string;
    poster_path: string;
    vote_count: number;
}

interface PropsFilm {
    data: Film;
    click: (event: React.MouseEvent<HTMLElement>) => void;
    clickRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const film = (props: PropsFilm) => {

    let { vote_average: rating, title, poster_path, vote_count } = props.data;

    let filmTitle = title === undefined ? "No title for this film" : title;

    return (
        <div className="Film">
            <div className="Film__image-wrapper" onClick={props.click}>
                <img className = "Film__image" src={`https://image.tmdb.org/t/p/w500/${poster_path}`}/>
            </div>
            <p className = "Film__title">{filmTitle}</p>
            <p className="Film__rating">This film rating is {rating} by {vote_count} votes </p>
            <button className = "Film__button" onClick={props.clickRemove}>Remove from list</button>
        </div>
    )
};

export default film;

