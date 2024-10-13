// index.js

function generateRandomPassword(length = 8, options = {}) {
    const { useUppercase = true, useNumbers = true, useSpecials = false } = options;

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = useUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const numbers = useNumbers ? "0123456789" : "";
    const specials = useSpecials ? "!@#$%^&*()-_=+[]{}|;:,.<>?/" : "";

    const allCharacters = lowercase + uppercase + numbers + specials;

    if (allCharacters.length === 0) {
        throw new Error("At least one character type must be enabled");
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

module.exports = {
    generateRandomPassword,
};