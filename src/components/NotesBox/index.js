import React from 'react';
import lodash from 'lodash';

import './index.scss';

const Note = ({ text }) => (
  <div className="note">
    {text}
  </div>
);

const NotesBox = ({ notes }) => {
  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="notes-box">
      <h4>Notes:</h4>
      {notes.map((note) => (
        <Note {...note} key={lodash.uniqueId('note_')} />
      ))}
    </div>
  );
};

export default NotesBox;
