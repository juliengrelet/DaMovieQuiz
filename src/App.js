import './App.css';
// hook 
import { useState, useEffect } from 'react';
// components
import Movie from './components/Movie';
import Actor from './components/Actor';
// material ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// utils
import { getActorByIdMovie, getMovies } from './utils/callsAPI';
import getRandomNumber from './utils/getRandomNumber';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [actor, setActor] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [timer, setTimer] = useState(60);
  const [currentMovie, setCurrentMovie] = useState(1);
  const [winningAnswer, setWinningAnswer] = useState(0);
  const nbrAnswer = 20;

  useEffect(() => {
    (async () => {
      setMovies(await getMovies());
    })();
  }, []);

  useEffect(() => {
    if (timer === 0 || winningAnswer === nbrAnswer) {
      setEndGame(true);
      setStartGame(false);
    }
  }, [timer, winningAnswer]);

  useEffect(() => {
    (async () => {
      if (movies.length > 0) {
        const randomResponse = getRandomNumber(2),
          randomNumber = getRandomNumber(20);
          console.log('randomResponse : ', randomResponse);
        setActor(await getActorByIdMovie(movies[randomResponse === 0 ? randomNumber : currentMovie].id));
      }
    })();
  }, [movies, currentMovie]);

  useEffect(() => {
    const id = setInterval(() => {
      if (timer > 0 && startGame) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [startGame, timer, endGame]);

  const verifyActor = (response) => {
    let results = false;
    if (actor.movie_id === movies[currentMovie].id) {
      results = true;
    }
    if (response !== results) {
      setEndGame(true);
      setStartGame(false);
    } else {
      setWinningAnswer(winningAnswer + 1);
      setCurrentMovie(currentMovie + 1);
    }
  }

  const start = () => setStartGame(true);

  const restartGame = () => window.location.reload();

  return <div className="App" style={{ paddingTop: '100px' }}>
    {!endGame ? <h1>Cet acteur a-t-il joué dans ce film ?</h1> : null}
    {!endGame ? <h2>{timer}</h2> : <h2>Le jeu est terminé. votre score est {winningAnswer}/{nbrAnswer}</h2>}
    <Container maxWidth='lg'>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          {movies.length > 0 && movies[currentMovie] !== undefined ? <Movie title={movies[currentMovie].title} poster={movies[currentMovie].poster_path} key={movies[currentMovie].id} /> : <div>Loading</div>}
        </div>
        <div>
          {actor ? <Actor name={actor.name} poster={actor.profile_path} /> : <div>Loading</div>}
        </div>
      </Box>
      {startGame && currentMovie < nbrAnswer ? <Button variant="contained" onClick={() => verifyActor(true)}>Oui</Button> : null }
      {startGame && currentMovie < nbrAnswer ?  <Button variant="outlined" onClick={() => verifyActor(false)}>Non</Button> : null }
      {!startGame && !endGame ? <Button variant="contained" onClick={() => start()}>Commencer</Button> : null}
      {endGame ? <Button variant="contained" onClick={() => restartGame()}>Recommencer</Button> : null}
    </Container>
  </div>;
}
