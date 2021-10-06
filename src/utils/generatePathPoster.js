export default function generatePathPoster(name, size = 'w500') {
  return name === null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/${size}${name}`;
}