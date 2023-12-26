import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=ru-RU`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail
                ? currentMovieDetail.vote_average.toPrecision(2)
                : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail
                ? Math.floor(currentMovieDetail.runtime / 60) +
                  " ч. " +
                  (currentMovieDetail.runtime % 60) +
                  " мин."
                : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Описание</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        {
          <a href="" target="" style={{ textDecoration: "none" }}>
            <p>
              <span className="movie__favoriteButton movie__Button">
                В Избранное<i className=""></i>
              </span>
            </p>
          </a>
        }
        {
          <a
            href={`https://q.izifilm.info/search/${
              currentMovieDetail
                ? truncateTitleByWords(currentMovieDetail.title)
                : ""
            }`}
            target=""
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__watchLordButton movie__Button">
                LordFilm<i className=""></i>
              </span>
            </p>
          </a>
        }
        {
          <a
            href={`https://27oct.zetfix.online/index.php?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=${
              currentMovieDetail
                ? truncateTitleByWords(currentMovieDetail.title)
                : ""
            }`}
            target=""
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__watchZetflixButton movie__Button">
                ZetFlix<i className=""></i>
              </span>
            </p>
          </a>
        }
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
    </div>
  );
  function truncateTitleByWords(title, maxWords = 5) {
    const words = title.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ");
    }
    return title;
  }
};

export default Movie;
