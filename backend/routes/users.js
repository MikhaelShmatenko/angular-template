var express = require("express");
var router = express.Router();
let UserServices = require("../services/user-services");
let User = require("../models/User");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let usersArray = await UserServices.getUsers();
    res.json(usersArray);
  } catch (err) {
    res.status(500).json({ error: "No se pudo mostrar la lista de usuarios" });
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    let userArray = await UserServices.getUsersById(id);
    res.json(userArray);
  } catch (err) {
    res.status(500).json({ error: "No se pudo mostrar el usuario" });
  }
});

module.exports = router;
