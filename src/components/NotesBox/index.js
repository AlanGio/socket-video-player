import React from 'react';
import uniqueId from 'lodash';

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
      {notes.map((note) => (
        <Note {...note} key={uniqueId('note_')} />
      ))}
    </div>
  );
};

export default NotesBox;
