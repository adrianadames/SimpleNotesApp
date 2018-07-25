import React from 'react';
import NoteCard from './NoteCard';

const NotesList = props => {
    return (
        props.noteEntries.map(noteEntry => {
            return (
                <NoteCard
                    noteEntry = {noteEntry}
                    key = {noteEntry.id}
                />
            );
        })
    );
}

export default NotesList;


// some additional things you might need:
// Heading font: Roboto Bold
// Everything else font: Raleway Medium

// Heading and main font color: #4A4A4A
// Button font color: #FFFFFF

// Sidebar background: #D8D8D8
// Main background: #F3F3F3
// Main button background: #2BC1C4
// Delete button background: #D0021B
// Border color used throughout: #979797