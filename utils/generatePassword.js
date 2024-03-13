/* Function to generate combination of password */
const generatePass = (length) => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i < length; i++) {
        let char = Math.floor(Math.random()
            * str.length);

        pass += str.charAt(char)
    }

    return pass;
}

module.exports = generatePass
