//Ebony Hargro 
//Submission for Treehouse Techdegree Unit 6
//Aiming for: Meets


//Adding variables to require the necessary dependencies
const path = require('path');
const express = require('express');
const { projects } = require('./data.json');
const app = express();

//Setting view engine to Pug
app.set('view engine', 'pug');

//Using a static route and the express.static method to serve te static files located in the public folder
app.use(express.static('public'));

//Setting up routes
    //Index route
app.get('/', (req, res, next) => {
    res.render('index', {projects});
});
    //About route
app.get('/about', (req, res) => {
    res.render('about');
});
    //Dynamic project routes
app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    if (project) {
        res.locals.data = projects;
        res.render('project', {project});
    } else {
        const undefinedError = new Error();
        undefinedError.status = 404;
        undefMessage = "Sorry, but you have navigated to a non-existent page!";
        undefinedError.message = undefMessage;
        console.log(`${undefMessage} Error Status: ${undefinedError.status}.`);
        next(undefinedError);
        }
    });
    
// });

//Starting server
app.listen(3000, () => {
    console.log('This app is running on localhost:3000.');
});

// //Handling errors - global error 
app.use((err, req, res, next) => {
    err.status = 500;
    const globalErr = "Looks like there is an error here. 😱";
    err.message = globalErr;
    res.render(err.status);
});
