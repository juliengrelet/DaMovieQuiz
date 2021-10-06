import React from 'react';
import { generatePathPoster } from '../utils/utils';

export default function Movie({ title, poster }) {
  return <div className="card">
    <img src={generatePathPoster(poster, 'w300')} alt={title} />
    {title ? <p>{title}</p> : null}
  </div>
}