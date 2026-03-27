const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");

async function Register(req, res) {
  const { username, email, password } = req.body;

  const ifUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (ifUserExists) {
    return res.status(400).json({
      message: "Email or Username already exists!",
    });
  }

  const User = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: User._id,
      user: User.username,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax", // 🔥 important
    secure: false, // localhost pe false hi rahega
  });

  res.status(201).json({
    message: "Registered Successfuly! 🎉",
    user: {
      username,
      email,
    },
  });
}

async function Login(req, res) {
  const { username, email, password } = req.body;

  const User = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!User) {
    return res.status(401).json({
      message: "Your username or email is invalid!",
    });
  }

  if (password !== User.password) {
    return res.status(401).json({
      message: "Password is Incorrect!",
    });
  }

  const token = jwt.sign(
    {
      id: User._id,
      user: User.username,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax", // 🔥 important
    secure: false, // localhost pe false hi rahega
  });

  res.status(201).json({
    message: "Login Successfuly! 🎉",
    user: {
      username,
      email: User.email,
    },
  });
}

module.exports = { Register, Login };
