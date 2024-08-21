import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // For hashing passwords

const app = express();

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend"
})
.then(() => console.log("Database connected"))
.catch((e) => console.log(e));

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create User model
const User = mongoose.model("Users", userSchema);

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

// Authentication middleware
const isAuthentication = async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const decoded = jwt.verify(token, "abcdefghijk");
            req.user = await User.findById(decoded._id);
            next();
        } catch (error) {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

// Home route (redirects to /home)
app.get('/', (req, res) => {
    res.redirect("/home");
});

// Home route with authentication
app.get("/home", isAuthentication, (req, res) => {
    res.render("home", { name: req.user.username });
});

// Logout route
app.get("/logout", (req, res) => {
    res.cookie("token", "null", {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.redirect("/login");
});

// Login form route
app.get("/login", async(req, res) => {
    res.render("login", { alertMessage: null }); // render login page with no alert message
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
        return res.render("signup", { alertMessage: "User not found. Please sign up first." });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);// You should hash passwords for production use!

    if (!isMatch) {
        return res.render("login", { alertMessage: "Invalid credentials. Please try again.",username:username });
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, "abcdefghijk");

    // Set cookie and redirect to home page
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 120 * 1000) // 2 minutes
    });

    res.redirect("/home");
});


app.get("/signup", (req, res) => {
    res.render("signup", { alertMessage: null }); // render signup page with no alert message
});

app.post("/signup", async (req, res) => {
   
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        console.log("Username already taken. Please try another.")
        return res.render("signup", { alertMessage: "Username already taken. Please try another." });
    }

    // If username doesn't exist, create a new user
     const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password:hashedPassword});

    res.redirect("/login"); // Redirect to login page after successful signup
});


// Start the server
app.listen(5000, () => {
    console.log("Server is working fine");
});




// app.post('/contact', async (req, res) => {
//     const { name, email } = req.body;

//     // Check if the email already exists in the database
//     const existingMessage = await Message.findOne({ email });

//     if (existingMessage) {
//         // Email already exists, show an alert
//         res.render("index", { alertMessage: "Email is already registered!" });
//     } else {
//         // Create a new entry if email doesn't exist
//         await Message.create({ name, email });
//         res.redirect("/success");
//     }
// });








// import http from "http";
// import gfname from "./feature.js";
// import fs from "fs";

// // Read the home page content
// const home = fs.readFileSync('./index.html', 'utf-8');

// const server = http.createServer((req, res) => {
//   // Set the headers to text/html for all responses
//   res.setHeader('Content-Type', 'text/html');

//   if (req.url === "/about") {
//     res.statusCode = 200;
//     res.end("<h1>About Page</h1>");
//   } else if (req.url === "/") {
//     res.statusCode = 200;
//     res.end(home);  // Serve the home page HTML content
//   } else if (req.url === "/contact") {
//     res.statusCode = 200;
//     res.end("<h1>Contact Page</h1>");
//   } else {
//     // Page not found
//     res.statusCode = 404;
//     res.end("<h1>404 - Page not found</h1>");
//   }
// });

// server.listen(5000, () => {
//   console.log("Server is working on http://localhost:5000");
// });
