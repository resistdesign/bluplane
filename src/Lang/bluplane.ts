import {Grammar} from "bnfdx";

export type Tokens = 'document' | 'layout_identifier' | 'class_style_identifier';

export const lang: Grammar<Tokens> = {
  entry: 'document',
  map: {
    document: {
      options: [/h/gmi],
    },
    layout_identifier: {
      options: [/h/gmi],
    },
    class_style_identifier: {
      options: [/h/gmi],
    }
  }
};
