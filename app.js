//Ebony Hargro 
//Submission for Treehouse Techdegree Unit 6
//Aiming for: Meets


//Adding variables to require the necessary dependencies
const express = require('express');
const app = express();
const { projects } = require('./data.json');

//Setting view engine to Pug
app.set('view engine', 'pug');

//Using a static route and the express.static method to serve te static files located in the public folder
app.use(express.static('public'));

//Setting up routes
    //Index route
app.get('/', (req, res) => {
    
    res.render('index');
    res.locals = projects;
});
    //About route
app.get('/about', (req, res) => {
    res.render('about');
});
    //Dynamic project routes
app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    const proj = projects[id];
    res.render('projects', proj);
});
//Starting server
app.listen(3000, () => {
    console.log('This app is running on localhost:3000.');
});
//Handling errors - undefined routes
if ('./noroute' || './project/noroute') {
    const undefinedError = new Error();
    undefinedError.status = 404;
    undefMessage = "Sorry, but you have navigated to a non-existent page!";
    undefinedError.message = undefMessage;
    console.log(`${undefMessage} Error Status: ${undefinedError.status}.`);
};

//Handling errors - global error 
app.use((req, res, next) => {
    const err = new Error('Uh-oh! ');
    err.status = 500;
    const globalErr = "Looks like there is an error here. 😱";
    err.message = globalErr;
    next();
})