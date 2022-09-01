const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const ENDPOINT = 'todo-api'
const app = express();

app.use(express.static('public'));

app.engine('handlebars', engine({
    helpers: {
        isCompleted: function (status) {
            if (status == "completed") {
                return true
            } else {
                return false
            }
        },
    },
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    fetch(`http://${ENDPOINT}/`)
        .then(response => response.json())
        .then(data => res.render('index', {
            items: data
        }
        ));
});

// Redirect POST requests to the API

app.post('/', (req, res) => {
    const data = { task: `${req.body.task}` };
    fetch(`http://${ENDPOINT}/`, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res.redirect('/'))
});

// Route updates

app.get('/:status/:id', (req, res) => {
    const data = { id: `${req.params.id}`, status: `${req.params.status}`};
    fetch(`http://${ENDPOINT}/update`, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res.redirect('/'))
});

// Route deletions    

app.get('/:id', (req, res) => {
    const data = { id: `${req.params.id}` };
    fetch(`http://${ENDPOINT}/delete`, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res.redirect('/'))
});

// port where app is served

app.listen(80, () => {
    console.log('The web server has started on port 80');
});