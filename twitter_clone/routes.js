var fixtures = require('./fixtures')

var CREATE_USER_HTML = 'create_user.html'
var LOGIN_HTML = "login.ejs"
var INDEX_EJS = "index.ejs"

module.exports = function(app, passport) {
    app.get('/api/tweets', function(request, response) {
        var userID = request.query.userId;
        var userTweets = fixtures.USER_TWEETS;

        if (userId == undefined)
            return response.send(404);

        userTweets = userTweets.filter(function(item) { return item.userId == userID; });
        userTweets.sort(function(e1, e2) { return e1.created - e2.created; });

        return response.send({ tweets: userTweets });
    });

    app.get('/api/user', function(request, response) {
        var id = request.query.id
        var users = fixtures.USER_OBJECTS;

        if (id == undefined)
            return response.send(404);

        users = users.filter(function(item) { return item.id == id; });

        return response.send({ user: users });
    });

    app.get('/api/tweet', function(request, response) {
        var tweetID = request.query.tweetId
        var allTweets = fixtures.USER_TWEETS

        if (tweetID == undefined)
            return response.send(404);

        return response.send({tweet: allTweets.filter(function(item) { return item.id == tweetID; })});
    });

    app.get('/api/create-user', handleCreateUser)
    app.post('/api/create-user', handleCreateUser)


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render(INDEX_EJS); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render(LOGIN_HTML, { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

     // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function handleCreateUser(request, response) {
    if (request.method == 'POST') {
       var user = fixtures.createUserFromWebForm(request.body.name, request.body.email, request.body.password)
       return response.send({user: user})
    }

    response.sendfile(CREATE_USER_HTML)
}
