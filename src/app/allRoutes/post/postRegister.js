const Users = require("../../../model/modelUsers");
const bcrypt = require("bcryptjs");

exports.postRegister = async (req, res) => {
    const { name, password, is_admin } = req.body;
    try {
        let isAdmin = true;
        let nameCase = name.toLowerCase();
        if (!name || !password) {
            return res.status(400).send({ message: "name/password cannot be empty" });
        }
        if (!is_admin) {
            isAdmin = false;
        }
        if (name.includes(" ")) {
            return res.status(400).send({ message: "name must not contain space" });
        }
        const checkName = await Users.findOne({ where: { name: nameCase } });
        if (checkName !== null) {
            return res.status(400).send({ message: "name has been used" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({ name: nameCase, password: hashedPassword, is_admin: isAdmin });
        res.status(200).send({ message: "OK" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};