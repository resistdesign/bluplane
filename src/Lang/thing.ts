import { GrammarMapTokenTypeDescriptor, TokenProcessorOptionTypes } from 'bnfdx';

export type BluplaneTokenTypes =
  | 'layout_block'
  | 'layout_row'
  | 'dimension'
  | 'area_name'
  | 'style_block'
  | 'css_property'
  | 'css_value';

export const BluplaneGrammarMap: Record<
  BluplaneTokenTypes,
  GrammarMapTokenTypeDescriptor<BluplaneTokenTypes>
> = {
  layout_block: {
    options: [{ value: 'layout_row', option: TokenProcessorOptionTypes.ONE_OR_MORE }],
  },
  layout_row: {
    options: [
      { value: 'area_name', option: TokenProcessorOptionTypes.ONE_OR_MORE },
      {
        value: 'dimension',
        option: TokenProcessorOptionTypes.ZERO_OR_ONE,
      },
    ],
  },
  dimension: {
    options: [{ value: /\d+fr/, option: TokenProcessorOptionTypes.ZERO_OR_ONE }],
  },
  area_name: {
    options: [{ value: /"[a-zA-Z0-9_\s]+"/, option: TokenProcessorOptionTypes.ZERO_OR_ONE }],
  },
  style_block: {
    options: [
      { value: /\\.\\w+ \\{/, option: TokenProcessorOptionTypes.ONE_OR_MORE },
      {
        value: 'css_property',
        option: TokenProcessorOptionTypes.ONE_OR_MORE,
      },
      { value: /\\}/, option: TokenProcessorOptionTypes.ONE_OR_MORE },
    ],
  },
  css_property: {
    options: [
      { value: /\\w+:/, option: TokenProcessorOptionTypes.ONE_OR_MORE },
      {
        value: 'css_value',
        option: TokenProcessorOptionTypes.ONE_OR_MORE,
      },
      { value: /;/, option: TokenProcessorOptionTypes.ONE_OR_MORE },
    ],
  },
  css_value: {
    options: [{ value: /[a-zA-Z0-9_\-\s]+/, option: TokenProcessorOptionTypes.ZERO_OR_ONE }],
  },
};
