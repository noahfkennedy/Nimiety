//Declare the installed frameworks
const express = require('express');
const bodyParser = require('body-parser');

let note = [{id: 1, body: 'We have a text' }, { id: 2, body: 'This is a second text ' }];

//call the express and Body-parser
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
//We installed the ejs and created a file inside the views

//Serving static files
app.use(express.static('public'));
//We installed the ejs and created a file inside the views
app.set('view engine', 'ejs');

//We set up the route for the App. We first use the app.get option.
app.get('/', function (req, res) {
    res.render('notes', {
        note: note
    });
});

app.post("/addNotes", function (req, res) {
    //Assigning note id to the notes using Math.random
    const userNote = {};
    userNote.id = Math.random() * 100;
    userNote.body = req.body.newNote
    note.push(userNote);
    //Then we redirect it to the root route
    res.redirect('/');
});

//Handling the delete request

app.post('/deleteNote/:id', function (req, res) {
    console.log(req.params.id);
    const deleteNotes = note.filter(item => item.id != req.params.id);
    note = deleteNotes;
    return res.redirect('/');
});

app.listen(5000, function()
{console.log("NoteApp server is running at port 5000...")
});