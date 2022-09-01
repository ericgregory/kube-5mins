const express = require('express');
const bodyParser = require('body-parser');
const con = require('./models/taskModel');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => { 
    let query = `SELECT * FROM Todo`;
    let items = []
    con.execute(query, (err, result) => {
        if (err) throw err;
        items = result
        console.log(items)
        res.json(items);
        })
    });

app.post('/update', (req, res) => {
    let intCheck = req.body.id * 1;
    if (Number.isInteger(intCheck)) {
    console.log(req.body)
    let query = "UPDATE Todo SET status='" + req.body.status + "' WHERE task_id=" + req.body.id;
    con.execute(query, (err, result) => {
        if (err) throw err;
        console.log(result)
    });
} else {
    console.log('There was a problem');
};
});

app.post('/delete', (req, res) => {
let intCheck = req.body.id * 1;
if (Number.isInteger(intCheck)) {
    console.log(req.body)
        let query = "DELETE FROM Todo WHERE task_id=" + req.body.id
        con.execute(query, (err, result) => {
          if (err) throw err;
          console.log(result);
    })
} else {
    console.log('There was a problem');
}
});

app.post('/', (req, res) => {
    console.log(req.body.task);    
    let query = "INSERT INTO Todo (task, status) VALUES ?";
    data = [
        [req.body.task, "ongoing"]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});

// port where app is served
app.listen(80, () => {
    console.log('The web server has started on port 80');
});