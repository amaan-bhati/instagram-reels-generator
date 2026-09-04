import {colors as C} from '../theme';

export type Tok = {t: string; c: keyof typeof TOK};

export const TOK = {
  key: C.synKey,
  str: C.synStr,
  punc: C.synPunc,
  plain: C.text,
} as const;

const RE =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|\b(const|let|var|function|return|async|await|if|else|export|import|from|new|class|try|catch|throw|for|of|in|typeof|default|null|true|false)\b|(\b\d+\b)|([{}()[\].,;:=<>+\-*/!?&|])/g;

/** Tiny JS/JSON tokenizer. Enough for code cards; not a real parser. */
export const hl = (line: string): Tok[] => {
  const out: Tok[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  RE.lastIndex = 0;
  while ((m = RE.exec(line)) !== null) {
    if (m.index > last) out.push({t: line.slice(last, m.index), c: 'plain'});
    if (m[1]) out.push({t: m[1], c: 'punc'});
    else if (m[2]) out.push({t: m[2], c: 'str'});
    else if (m[3]) out.push({t: m[3], c: 'key'});
    else if (m[4]) out.push({t: m[4], c: 'str'});
    else if (m[5]) out.push({t: m[5], c: 'punc'});
    last = RE.lastIndex;
  }
  if (last < line.length) out.push({t: line.slice(last), c: 'plain'});
  return out;
};
