function addNotesToFavourites(id: number) {
        // hämtar vår favNotes array från localStorage || skapar en ny för förstagångsanvändare
        const favNotes: { title: string; note: string; date: string, edit: string; id: number }[] = JSON.parse(localStorage.getItem('favNotes') || '[]');

        // Hämtar den rätta anteckningen baserat på id i savedNotes 
        const savedNotes: { title: string; note: string; date: string, edit: string; id: number }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');
        const clickedNote = savedNotes.find((note) => note.id === id); // sparar till clickedNote
    
        if (clickedNote) {
            // undersöker om den redan finns i favoriter
            const isAlreadyFavourite = favNotes.some((note, i) => {
                if (note.id === clickedNote.id) { // <-- använder id som jämförelse
                    // tar bort if true
                    favNotes.splice(i, 1);
    
                    // sparar och uppdaterar array i localStorage
                    localStorage.setItem('favNotes', JSON.stringify(favNotes));
                    return true; 
                }
                return false;
            });
    
            if (!isAlreadyFavourite) {
                // lägger till i favNotes om den inte redan finns
                favNotes.push({ title: clickedNote.title, note: clickedNote.note, date: clickedNote.date, edit: clickedNote.edit, id: clickedNote.id });
    
                // sparar till localStorage
                localStorage.setItem('favNotes', JSON.stringify(favNotes));
            }
        }
}

//funktion som tar bort anteckingen från localStorage
function deleteNoteFromLocalStorage(id: number) {
    // hämtar rätt anteckning
    const savedNotes: { title: string; note: string; date: string, edit: string; id: number }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

    // hittar rätt index baserat på anteckningens id
    const deletedNoteIndex = savedNotes.findIndex(note => note.id === id);

    if (deletedNoteIndex !== -1) {
        // raderar rätt anteckning i savedNotes
        const deletedNote = savedNotes.splice(deletedNoteIndex, 1)[0];

        //updaterar savedNotes
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

        // ska radera kortet från DOMen (osäker på att det fungerar som det ska)
        const cardToRemove = document.querySelector(`[data-index="${deletedNoteIndex}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }

        // hämtar favNotes
        const favNotes: { title: string; note: string; date: string, edit: string; id: number }[] = JSON.parse(localStorage.getItem('favNotes') || '[]');

        // filterar ut antckningen baserat på id - uppdaterar favNotes
        const updatedFavNotes = favNotes.filter(note => note.id !== id);
        localStorage.setItem('favNotes', JSON.stringify(updatedFavNotes));

        // sidan laddas om för att visa resultatet
        location.reload();
    }
}

function updateAndSaveNote(updatedTitle: string, updatedNote: string, dateCreated: string, editDate: string, id: number) {
    const savedNotes: Note[] = getSavedNotes();
    const savedNoteIndex = savedNotes.findIndex(note => note.id === id);

    if (savedNoteIndex !== -1) {
        savedNotes[savedNoteIndex] = { title: updatedTitle, note: updatedNote, date: dateCreated, edit: editDate, id };
        saveNotesToLocalStorage(savedNotes);
        updateFavNoteIfExists(updatedTitle, updatedNote, dateCreated, editDate, id);
        location.reload();
    }
}

// undersöker om antckningen som ska uppdateras redan finns i favNotes - uppdaterar därefter
function updateFavNoteIfExists( updatedTitle: string, updatedNoteText: string, dateCreated: string, editDate: string, id: number) {
    const favNotes: { title: string; note: string; date: string, edit: string; id: number }[] = JSON.parse(localStorage.getItem('favNotes') || '[]');

    // hittar rätt note efter id
    const index = favNotes.findIndex(note => note.id === id);

    if (index !== -1) {
        // om den finns - uppdateras innehållet i rätt index
        favNotes[index] = { title: updatedTitle, note: updatedNoteText, date: dateCreated, edit: editDate, id };

        // sparar till localStorag
        localStorage.setItem('favNotes', JSON.stringify(favNotes));
    }
}

//hämtar alla sparade notes
function getSavedNotes(): Note[] {
    const savedNotesString: string | null = localStorage.getItem('savedNotes');
    return savedNotesString ? JSON.parse(savedNotesString) : [];
}

function saveNotesToLocalStorage(notes: Note[]) {
    localStorage.setItem('savedNotes', JSON.stringify(notes));
}

function createButtons() {
    mainOutputContainer.innerHTML = `
        <button class="more-button" id="more-button">More</button>
        <div class="floating-control-menu" id="floating-control-container">
            <button class="new-note-button" id="new-note-button">New</button>
            <button class="print-button" id="print-button">Print</button>
            <button class="fav-button" id="fav-button">Star</button>
        </div>`;
}

