const express = require('express');
const app = express();

app.use(express.static('public'));

// This array stores a group of objects for books we might recommend.

const bookstore = [
{ title: 'My Brilliant Friend', author: 'Elena Ferrante'},
{ title: 'Piranesi', author: 'Susanna Clarke'},
{ title: 'The Summer Book', author: 'Tove Jansson'},
{ title: 'Middlemarch', author: 'George Eliot'},
{ title: 'Song of Solomon', author: 'Toni Morrison'},
{ title: 'The Tale of Genji', author: 'Lady Murasaki'}
]

// This function will generate a random integer.

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

/* 
This function requests a random integer with a range defined by the length of the array.
Then it indexes the array and return the appropriate object.
*/

function randomizeBook() {
    let range = bookstore.length; 
    let rng = getRandomInt(range);
    return bookstore[rng];
}

// The server responds to GET requests with a JSON object for one of the books from the array.

app.get('/', (req, res) => {
    res.json(randomizeBook());
});

// The server is running on port 80, which is the expected default.

app.listen(80, () => {
    console.log('The web server has started on port 80');
});