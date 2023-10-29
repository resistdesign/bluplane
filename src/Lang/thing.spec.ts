import { parseSyntaxString } from 'bnfdx';
import Path from 'path';
import FS from 'fs';
import { BluplaneGrammarMap } from './thing';

const SampleBPLNPath = Path.join(__dirname, '..', 'Sample', 'basic.bpln');
const SampleBPLN = FS.readFileSync(SampleBPLNPath, 'utf-8');

describe('bluplane thing test', () => {
  it('should just get the tokens', () => {
    const result = parseSyntaxString(SampleBPLN, {
      entry: 'layout_block',
      map: BluplaneGrammarMap,
    });

    console.log('Sample Bluplane Tokens:', JSON.stringify(result, null, 2));
  });
});
