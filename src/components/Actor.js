import { generatePathPoster } from '../utils/utils';

export default function Actor({ name, poster }) {
  return <div style={{ textAlign: 'center' }}>
    <img src={generatePathPoster(poster, 'w300')} alt={name} />
    <p>{name}</p>
  </div>

}