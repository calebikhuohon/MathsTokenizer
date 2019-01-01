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

const exp = '89sin(45) + 2.2x/7';
const tokens = tokenize(exp);
tokens.forEach((token, index) => {
    console.log(` ${index}  => ${token.type} (${token.value})`);
    
    //Result
    // 0  => Literal (89)
    // 1  => Operator (*)
    // 2  => function (sin)
    // 3  => Left Parenthesis (()
    // 4  => Variable (undefined)
    // 5  => Literal (45)
    // 6  => Right Parenthesis ())
    // 7  => Variable (undefined)
    // 8  => Operator (+)
    // 9  => Literal (2.2)
    // 10  => Operator (*)
    // 11  => Variable (x)
    // 12  => Operator (/)
    // 13  => Literal (7)
})

