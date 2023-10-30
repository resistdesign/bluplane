import { parseSyntaxString } from 'bnfdx';
import { Lang } from './Lang/bluplane';

const result = parseSyntaxString(
  `
main
  "hello thing"
`,
  Lang
);

console.log('Sample Bluplane Tokens:', JSON.stringify(result, null, 2));
