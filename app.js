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
app.use('/static', express.static('public'));

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
app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id];
    if (project) {
        res.locals.data = projects;
        return res.render('project', {project});
    }  else {
        const err = new Error();
        err.status = 404;
        err.message = "Sorry, you have navigated to a non-existent page!"
        console.log("Sorry, you have navigated to a non-existent page!");
        res.render('page-not-found');
        next(err);
    }
    });

//Handling errors 
    app.use((req, res, next) => {
        const err = new Error();
        err.status = 404;
        err.message = "Sorry, you have navigated to a non-existent page!";
        console.log("Sorry, you have navigated to a non-existent page!");
        res.status(404);
        res.render('page-not-found', {err});
    });


    app.use((err, req, res, next) => {
        //404 error
        if (err.status === 404) {
            err.message = "Sorry, you have navigated to a non-existent page!";
            console.log("Sorry, you have navigated to a non-existent page!");
            res.status(404);
            res.render('page-not-found', {err});
        } 
        //Global 500 error
        else {
            err.message = "Uh oh! Looks like there is a server error here. 😱";
            console.log("Uh oh! Looks like there is a server error here. 😱 500: Internal Server Error");
            res.status(err.status || 500);
            res.render('error', {err});
            }
        });
       

    //Starting server
app.listen(3000, () => {
    console.log('This app is running on localhost:3000.');
});
