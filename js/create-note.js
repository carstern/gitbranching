"use strict";
/*************************
 * Börja med en enkel CSS för att se tydligt resultat - inte ladda upp på github wayyoooo done
 */
/*************************
 * Task 1 - Presentera en notepad för användaren. Rubrik och textfält.
 *   addEventListener till skapa anteckning-knappen
 *      - skapar en basic 'mall' en input för rubrik, en textarea för brödtext
 *      - gör i main-output-container
 *      - datum för när den skapades/senast redigerades?
 */
// koppla till main-output-container
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
createNoteBtn.addEventListener('click', function () {
    //skapar en basic 'mall' en input för rubrik, en textarea för brödtext 
    // Create a new Date object
    const today = new Date();
    // Get the current date components
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-based, so we add 1
    const day = today.getDate();
    // Format the date as a string (e.g., "YYYY-MM-DD")
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    mainOutputContainer.innerHTML += `
    <input placeholder="Add your title">
    <p> Date created: ${formattedDate} </p>
    <textarea id="userInput" name="userInput" placeholder="Type your notes here"></textarea>`;
});
// key-event för input + textarea (tab) --> inputen sparas till savedNotesArray
/*************************
 * Task 2 - Spara anteckningen i localstorage
 *  skapar och sparar - vid knapp tryck för att spara?
 *      - localStorage savedNotesArray title: title - note: note
 */
/*************************
 * Task 3 - Presentera notes i containern
 *  länka till nav-output-container
 *      - skapa element:
 *
                <section class="card">
                <h3>title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vero velit ea repellendus id, vel corrupti, accusamus aperiam explicabo minima cupiditate perferendis illum totam nisi. Sequi nam veniam cupiditate nobis.</p>
                + 2 buttons - delete | star ==> vid hover
                || ... i mobile view ==> statiska knappar tilll en början - sen swipe funktion

        - hämtar titel + första 12 orden av brödtext från vår savedNotesarray
 */
/*************************
 * Task 4 - Skapa toggle på read/edit-view, anpassad för desktop, mobile/tablet
 *  finslipa 'spara knappen'
 *  - eventListner för enter/tab i desktop (knapp i mobile view?) - för mobilanpassning
 */
/*************************
 * Task 5 - Skapa knapp för ta bort, stjärnmarkera vid hover över anteckningarna
 * i desktop, liten meny i mobile/tablet
 *  Bygga vidare på Task 3
 *      - lägga till element för knappar - lämna funktionerna tomma
 */
