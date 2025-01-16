import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
  <div className="artwork">
    <h2>Here's your dog image!</h2>
    <img src={artwork} alt="Random Dog" />
  </div>
) : (
  <p>No dog image found.</p>
)}

    </div>
  );
}
