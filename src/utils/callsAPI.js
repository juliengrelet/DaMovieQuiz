import getRandomNumber from "./getRandomNumber";

const API_KEY = '7ea5f490261a949e52930517e1b4657c';
const DOMAIN = 'https://api.themoviedb.org/3';
const LANG = '&language=fr-FR';

const getMovies = async () => {
  try {
    const req = await fetch(`${DOMAIN}/movie/upcoming?api_key=${API_KEY}${LANG}`),
      res = await req.json();
    return res.results;
  } catch(e) {
    console.log('error : ', e);
  }
}

const getActorByIdMovie = async (movie_id) => {
  try {
    const req = await fetch(`${DOMAIN}/movie/${movie_id}/credits?api_key=${API_KEY}${LANG}`);
    const res = await req.json();
    const randomNumber = getRandomNumber(res.cast.length);
    return {
      movie_id,
      ...res.cast[randomNumber],
    };
  } catch(e) {
    console.log('error : ', e);
  }
}

export {
  getMovies,
  getActorByIdMovie
}