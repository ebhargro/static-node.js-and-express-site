//Ebony Hargro 
//Submission for Treehouse Techdegree Unit 6
//Aiming for: Meets


//Adding variables to require the necessary dependencies
const express = require('express');
const app = express();
const data = require('data');
const path = require('path');

//Setting view engine to Pug
app.set('view engine', 'pug');

//Using a static route and the express.static method to serve te static files located in the public folder
app.use(express.static('public'));

//Setting up routes
    //Index route
app.get('/', (req, res) => {
    res.render('index');
    res.locals = data.projects;
});
    //About route
app.get('/about', (req, res) => {
    res.render('about');
});
    //Dynamic project routes
app.get('/project/:id}', (req, res) => {
    const { id } = req.params;
    const proj = data[id];
    res.render('project', proj);
});

app.listen(3000, () => {
    console.log('This app is running on localhost:3000!');
});