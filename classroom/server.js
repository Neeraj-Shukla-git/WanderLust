const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

// Send Signed Cookies 

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
    res.cookie("made-in", "India", { signed: true}); 
    res.send("signed cookie send");
});

// Verify Signed Cookies

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified");
});

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "namaste");
    res.cookie("origin", "India");
    res.send("We sent you a cookie!");
});  


app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`Hi, ${name}`);
})

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("Hi, i am root!");
});


app.use("/users", users);
app.use("/posts", posts);



app.listen(3000, () => {
    console.log("server is listening to 3000");
});

