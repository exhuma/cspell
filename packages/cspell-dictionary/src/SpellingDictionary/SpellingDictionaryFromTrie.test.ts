import { createMapper } from '../util/repMap';
import { __testing__ } from './SpellingDictionaryFromTrie';

const { outerWordForms } = __testing__;

// cspell:ignore guenstig günstig

describe('SpellingDictionaryFromTrie', () => {
    test.each`
        word          | repMap                                                  | expected
        ${'hello'}    | ${undefined}                                            | ${['hello']}
        ${'guenstig'} | ${[['ae', 'ä'], ['oe', 'ö'], ['ue', 'ü'], ['ss', 'ß']]} | ${['guenstig', 'günstig']}
        ${'günstig'}  | ${[['ae', 'ä'], ['oe', 'ö'], ['ue', 'ü'], ['ss', 'ß']]} | ${['günstig', 'günstig'.normalize('NFD')]}
    `('outerWordForms $word', ({ word, repMap, expected }) => {
        const mapWord = createMapper(repMap);
        expect(outerWordForms(word, mapWord ?? ((a) => a))).toEqual(new Set(expected));
    });
});