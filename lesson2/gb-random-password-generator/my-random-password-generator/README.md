# GB Random Password Generator

A simple library for generating random passwords.

## Installation

npm install gb-random-password-generator

## Usage

```javascript
const { generateRandomPassword } = require('gb-random-password-generator');

const password = generateRandomPassword(12, {
    useUppercase: true,
    useNumbers: true,
    useSpecials: true,
});

console.log('Generated Password:', password);

## Options
length: (number) The length of the password (default: 8).
useUppercase: (boolean) Include uppercase letters (default: true).
useNumbers: (boolean) Include numbers (default: true).
useSpecials: (boolean) Include special characters (default: false).

## License
MIT
```
