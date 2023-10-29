import { Grammar, TokenProcessorOptionTypes } from 'bnfdx';

export type Tokens =
  | 'document'
  | 'layout_identifier'
  | 'class_style_identifier'
  | 'number'
  | 'negative_coordinate'
  | 'comma_wsp'
  | 'comma'
  | 'integer_constant'
  | 'floating_point_constant'
  | 'fractional_constant'
  | 'exponent'
  | 'sign'
  | 'digit_sequence'
  | 'digit'
  | 'wsp';

export const Lang: Grammar<Tokens> = {
  entry: 'document',
  map: {
    document: {
      options: [/h/gim],
    },
    layout_identifier: {
      options: [/h/gim],
    },
    class_style_identifier: {
      options: [/h/gim],
    },
    number: {
      options: [
        [{ value: 'sign', option: TokenProcessorOptionTypes.ZERO_OR_ONE }, 'integer_constant'],
        [
          { value: 'sign', option: TokenProcessorOptionTypes.ZERO_OR_ONE },
          'floating_point_constant',
        ],
      ],
    },
    negative_coordinate: {
      options: [
        [/[-]/, 'integer_constant'],
        [/[-]/, 'floating_point_constant'],
      ],
    },
    comma_wsp: {
      options: [
        [
          { value: 'wsp', option: TokenProcessorOptionTypes.ONE_OR_MORE },
          { value: 'comma', option: TokenProcessorOptionTypes.ZERO_OR_ONE },
          { value: 'wsp', option: TokenProcessorOptionTypes.ZERO_OR_MORE },
        ],
        ['comma', { value: 'wsp', option: TokenProcessorOptionTypes.ZERO_OR_MORE }],
      ],
    },
    comma: { options: [/[,]/] },
    integer_constant: { options: ['digit_sequence'] },
    floating_point_constant: {
      options: [
        [
          'fractional_constant',
          { value: 'exponent', option: TokenProcessorOptionTypes.ZERO_OR_ONE },
        ],
        ['digit_sequence', 'exponent'],
      ],
    },
    fractional_constant: {
      options: [
        [
          { value: 'digit_sequence', option: TokenProcessorOptionTypes.ZERO_OR_ONE },
          /\./,
          'digit_sequence',
        ],
        ['digit_sequence', /\./],
      ],
    },
    exponent: {
      options: [
        [
          /[eE]/,
          { value: 'sign', option: TokenProcessorOptionTypes.ZERO_OR_ONE },
          'digit_sequence',
        ],
      ],
    },
    sign: {
      options: [/[+-]/],
    },
    digit_sequence: {
      options: ['digit', ['digit', 'digit_sequence']],
    },
    digit: { options: [/[0-9]/] },
    wsp: { options: [/ /, /\t/, /\n/] },
  },
};
