//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello. I'm Keplet!";
const aboutContent = "Keplet has been my journal for years and this time and giving her (I always she's a she) a total make over. This blog is a mixture of my interest in both writing and web design and very excited of what it will become in the future. Thank you for droppin by and enjoy my random thoughts and two-cents in life.";
const contactContent = "Ping me on my social media!";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
  });

});
app.get("/blog", function(req, res) {
  res.render("blog", {
    posts: posts
  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  }); //js objects can be the same name as best practice
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

//to add the new post into the array
app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);

  res.redirect("/blog");
});

//tap in to dynamic parameter in url
//converted to lower case using lodash library
app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
      const storedTitle = _.lowerCase(post.title);
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      }

  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
