/*
Below we're requiring our two dependencies and setting a very important constant: the API endpoint that we wish to consume. We're simply using the name of our randomreads-api Service. 
*/

const express = require('express');
const { engine } = require('express-handlebars');
const ENDPOINT = 'randomreads-api'

const app = express();

app.use(express.static('public'));

/*
Express-Handlebars gives us a super-simple view engine to render our webpage. Here we're configuring it to look for webpage files in a directory called 'views' and to use a wrapper file called 'main' as the default layout.
*/

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

/*
Now we've reached the juicy stuff. This will trigger when a GET request is made to the server. Here we're using fetch (an experimental but functional feature in Node at the time of this writing in July 2022), and we're using it to grab the JSON available at the API endpoint we defined up top. Then we're funneling the values inside the JSON payload into two variables that we can utilize when we build the index page. 
*/

app.get('/', async (req, res) => {
    fetch(`http://${ENDPOINT}/`)
        .then(response => response.json())
        .then(data => res.render('index', {
            title: data.title,
            author: data.author
        }
        ));
});

// Like the API, the web server is running on port 80, which is the expected default.

app.listen(80, () => {
    console.log('The web server has started on port 80');
});