@{%
const moo = require('moo');

const lexer = moo.compile({
  ws: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /[0-9]+/,
  word: /[a-z]+/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  arrow: '->',
  lparen: '(',
  rparen: ')',
  lbrace: '{',
  rbrace: '}',
  semicolon: ';',
  comma: ',',
  plus: '+',
  equals: '='
});
%}

# Lexer
@lexer lexer

# Whitespace
_ -> %ws | null

# Statements
statement -> block {% d => d[0] %}
           | assignment {% d => d[0] %}

# Block
block -> %lbrace _ statements %rbrace { d => ({ type: 'block', statements: d[2] }) }

# Assignments
assignment -> identifier %equals expression %semicolon { d => ({ type: 'assignment', identifier: d[0], expression: d[2] }) }

# Expressions
expression -> identifier { d => d[0] }
           | number { d => ({ type: 'number', value: d[0] }) }
           | string { d => ({ type: 'string', value: d[0] }) }

# Identifiers
identifier -> %word { d => ({ type: 'identifier', name: d[0].value }) }

# Number
number -> %number { d => Number(d[0].value) }

# String
string -> %string { d => d[0].value.slice(1, -1) }

# Statements
statements -> (statement _)* { d => d.map(([s]) => s) }

# Main Entry
main -> _ statement _ { d => d[1] }
