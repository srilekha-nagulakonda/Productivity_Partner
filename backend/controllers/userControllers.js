const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const JWT_SECRET_KEY = "sri";

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token received:", token);
  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// API for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Creating a new user and saving it to the database
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({
      status: "Success",
      data: {
        name: newUser.name,
        email: newUser.email,
        userNumber: newUser.userNumber,
      },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.json({ error: "Error inserting data in server" });
  }
};

// API for user login
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "No email existed" });
    }
~
    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ error: "Password not matched" });
    }

    // Include userNumber in the JWT payload
    const token = jwt.sign(
      { id: user._id, email: user.email, userNumber: user.userNumber },
      JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token);
    res.json({ status: "Success", token });
    // res.json({
    //   status: "Success",
    //   token,
    //   data: {
    //     name: user.name,
    //     email: user.email,
    //     userNumber: user.userNumber,
    //   },
    // });
  } catch (err) {
    console.error("Login error in server:", err);
    res.json({ error: "Login error in server" });
  }
};

module.exports = { registerUser, authUser, authenticateToken };
