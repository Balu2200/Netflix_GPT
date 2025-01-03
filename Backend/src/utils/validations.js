const validator = require("validator");

const validateSignupData = (req) => {
    const {name, email, password } = req.body;

    if (!name) {
        throw new Error("Enter your name");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }

    return { name, email, password };
};

module.exports = {
    validateSignupData
};
