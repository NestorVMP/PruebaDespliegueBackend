const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

router.post("/register", UserController.insertUser);
router.post("/login", UserController.loginUser);

router.get("/check-session", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token no encontrado" });

    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token válido" });
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada" });
});

module.exports = router;
