const Token = require('./Token');

const tokenize = (str) => {
    //array of tokens
    const result = [];
    //remove spaces
    str.replace(/\s+/g, "");
    //convert to array of characters
    str = str.split("");

    str.forEach((char, idx) => {
        if(isDigit(char)) {
            result.push(new Token('Literal', char));
        } else if (isLetter(char)) {
            result.push(new Token('Variable', char));
        } else if (isOperator(char)) {
            result.push(new Token('Operator', char));
        } else if (isLeftParenthesis(char)) {
            result.push(new Token('Left Parenthesis', char));
        } else if(isRightParenthesis(char)) {
            result.push(new Token('Right Parenthesis', char));
        } else if (isComma(char)) {
            result.push(new Token('Function Argument Separator', char));
        }
    });
    return result;
};