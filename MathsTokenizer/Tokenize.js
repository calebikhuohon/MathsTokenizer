const Token = require('./Token');
const {
    isComma,
    isDigit,
    isLeftParenthesis,
    isLetter,
    isOperator,
    isRightParenthesis
} = require('./charCheckers');


function tokenize(str) {
    //array of tokens
    let result = [];

    let letterBuffer = [];
    let numberBuffer = [];
    //remove spaces
    str.replace(/\s+/g, "");
    //convert to array of characters
    str = str.split("");

    str.forEach((char, idx) => {
      if(isDigit(char)) {
          numberBuffer.push(char);
      } else if (char == '.') {
          numberBuffer.push(char);
      } else if (isLetter(char)) {
          if(numberBuffer.length) {
              emptyNumberBufferAsLiteral();
              result.push(new Token('Operator', '*'));
          }
          letterBuffer.push(char);
      } else if (isOperator(char)) {
          emptyNumberBufferAsLiteral();
          emptyLetterBufferAsVariables();
          result.push(new Token('Operator', char));
      } else if (isLeftParenthesis(char)) {
          if(letterBuffer.length) {
              result.push(new Token('function', letterBuffer.join('')));
              letterBuffer = [];
          } else if (numberBuffer.length) {
              emptyNumberBufferAsLiteral();
              result.push(new Token('Operator', '*'));
          }
          result.push(new Token('Left Parenthesis', char));
      } else if (isRightParenthesis(char)) {
          emptyLetterBufferAsVariables();
          emptyNumberBufferAsLiteral();
          result.push(new Token('Right Parenthesis', char));
      } else if (isComma(char)) {
          emptyNumberBufferAsLiteral();
          emptyLetterBufferAsVariables();
          result.push(new Token('Function Argument Separator',char));
      }
    });

    if(numberBuffer.length) {
        emptyNumberBufferAsLiteral();
    }
    if(letterBuffer.length) {
        emptyLetterBufferAsVariables();
    }
    return result;

    function emptyLetterBufferAsVariables() {
        const l = letterBuffer.length;
        for (let i = 0; i < 1; i++) {
            result.push(new Token('Variable', letterBuffer[i]));
            if(i < l - 1) {
                //no more variables 
                result.push(new Token('Operator', '*'));
            }
        }
        letterBuffer = [];
    };
    
  function emptyNumberBufferAsLiteral() {
        if(numberBuffer.length) {
            result.push(new Token('Literal', numberBuffer.join('')));
            numberBuffer = [];
        }
    }
};

const tokens = tokenize('89sin(45) + 2.2x/7');
tokens.forEach((token, index) => {
    console.log(`${index} => ${token.type} (${token.value})`)
})

