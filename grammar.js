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

    starter: $ => seq(
      repeat($.number),
      choice(
      "#",
      "*",
      "-",
      "$",
      "~",
      ",",
      ".",
      "%",
      '+',
      "PS:",
      "TODO:",
      '>'
    )),

    _symbol: $ => choice(
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
      '"',
    ),

    symbol: $ => prec(0, choice('>', $._symbol)),

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

    title_definition: $ => prec(1, seq(
      optional("\n"),
      $.title_starter,
      repeat($.text)
    )),

    header_definition: $ => prec(2, seq(
      optional("\n"),
      '\t',
      $.header_starter,
      repeat($.text)
    )),

    subheader_definition: $ => prec(3, seq(
      optional("\n"),
      '\t\t',
      $.subheader_starter,
      repeat($.text)
    )),

    section_definition: $ => prec(4, seq(
      optional("\n"),
      '\t\t\t',
      repeat('\t'),
      $.section_starter,
      repeat($.text)
    )),

    normal_definition: $ => prec(-1, seq(
      '\n',
      repeat('\t'),
    )),

    text: $ => choice(
      $.bold_text,
      $.identifier,
      $.expression,
      $.underlined_text,
    ),

    expression: $ => prec(5, seq(
      $.text,
      $.symbol
    )),

    identifier: $ => prec(4, choice(
      /[a-zA-Z0-9_]\w*/
    )),

    number: $ => choice(
      /[0-9]/
    ),

    bold_identifier: $ => prec(6, choice(
      $.identifier,
      ' ',
      $.bsymbol,
    )),

    bsymbol: $ => prec(6, $._symbol),

    bold_symbol_s: $ => prec(6, '<'),
    bold_symbol_e: $ => prec(6, '>'),

    bold_text: $ => prec(6, seq(
      $.bold_symbol_s,
      repeat($.bold_identifier),
      repeat1($.bold_symbol_e),
      optional(' ')
    )),

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
