const jwt = require("jsonwebtoken");
const Users = require("../../../model/modelUsers");
const bcrypt = require("bcryptjs");
const config = require("../../../lib/config");
require("dotenv").config();

exports.postLogin = async (req, res) => {
    const { name, password } = req.body;
    try {
        let nameCase = name.toLowerCase();
        if (!name || !password) {
            return res.status(400).send({ message: "name/password cannot be empty" });
        }

        const checkName = await Users.findOne({ where: { name: nameCase } });
        if (!checkName) {
            return res.status(400).send({ message: "Invalid name or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, checkName.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid name or password" });
        }

        const token = jwt.sign(
            { id: checkName._id, name: checkName.name, is_admin: checkName.is_admin },
            config.tokenKey,
            { expiresIn: config.tokenExp }
        );
        res.status(200).send({ message: "Login successful", token });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};