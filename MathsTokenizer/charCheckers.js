exports.isComma = (ch) => {
    return (ch === ',');
}

exports.isDigit = (ch) => {
    return /\d/.test(ch);
}

exports.isLetter =(ch) => {
    return /[a-z]/i.test(ch);
}

exports.isOperator = (ch) => {
    return /\+|-|\*|\/|\^/.test(ch);
}

exports.isLeftParenthesis = (ch) => {
    return (ch === '(');
}

exports.isRightParenthesis = (ch) => {
    return (ch === ')');
}

