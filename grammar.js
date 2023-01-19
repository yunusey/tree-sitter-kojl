module.exports = grammar({
  name: 'kojl',

  extras: $ => [' '],
  rules: $ => $.identifier,
  
  rules: {

    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.subheader_definition,
      $.header_definition,
      $.title_definition,
      $.section_definition,
      $.normal_definition
      // TODO: other kinds of definitions
    ),

    starter: $ => choice(
      "#",
      "*",
      "-",
      "$",
      "~",
      ",",
      ".",
      "%",
      '+'
    ),

    symbol: $ => choice(
      "#",
      "*",
      "-",
      "$",
      "~",
      ",",
      ".",
      "%",
      ';',
      '+',
      '`',
      '!',
      '@',
      '^',
      '&',
      '(',
      ')',
      '{',
      '}',
      '[',
      ']',
      '\\',
      '|',
      '/',
      '?',
      '\'',
      '=',
      '"'
    ),

    title_starter: $ => prec(1, seq(
      $.starter
    )),

    header_starter: $ => prec(2, seq(
      $.starter
    )),

    subheader_starter: $ => prec(3, seq(
      $.starter
    )),

    section_starter: $ => prec(4, seq(
      $.starter
    )),

    title_definition: $ => prec(4, seq(
      optional("\n"),
      $.title_starter,
      repeat($.text)
    )),

    header_definition: $ => prec(3, seq(
      optional("\n"),
      '\t',
      $.header_starter,
      repeat($.text)
    )),

    subheader_definition: $ => prec(2, seq(
      optional("\n"),
      '\t\t',
      $.subheader_starter,
      repeat($.text)
    )),

    section_definition: $ => prec(1, seq(
      optional("\n"),
      '\t\t\t',
      repeat('\t'),
      $.section_starter,
      repeat($.text)
    )),

    normal_definition: $ => prec(0, seq(
      '\n'
    )),

    text: $ => choice(
      $.identifier,
      $.expression,
      $.bold_text,
      $.underlined_text,
    ),

    expression: $ => prec(5, seq(
      $.text,
      $.symbol
    )),

    identifier: $ => choice(
      /[a-zA-Z0-9_]\w*/
    ),

    bold_identifier: $ => choice(
      $.identifier,
      ' ',
      $.symbol
    ),

    bold_symbol_s: $ => '<',
    bold_symbol_e: $ => '>',

    bold_text: $ => seq(
      $.bold_symbol_s,
      repeat($.bold_identifier),
      $.bold_symbol_e
    ),

    underlined_identifier: $ => choice(
      $.identifier,
      ' ',
      $.symbol
    ),

    underline_symbol: $ => ':',

    underlined_text: $ => seq(
      $.underline_symbol,
      repeat($.underlined_identifier),
      $.underline_symbol,
    ),

  }
});
