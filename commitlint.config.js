/* eslint-disable */
const allowedEmojis = [
  "♿", "✅", "⬆", "⬇", "➕", "👌", "💫", "🐛", "💡", "🎉", "🔧", "🚀", "📚", "🚧", "💄", "🧱", "🔜", "🚚",
  "✨", "📦", "⚡", "♻", "🧹", "🗑", "➖", "📱", "💥", "🔒", "🔍", "🔖", "✔", "🧪", "📝", "🏷", "🥅", "🗃"
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', []],
    'header-max-length': [2, 'always', 100],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert']],
    'emoji-empty': [2, 'never'],
    'emoji-enum': [2, 'always', allowedEmojis]
  },
  parserPreset: {
    parserOpts: {
      headerPattern: `^(${allowedEmojis.join('|')}) (\\w+)(?:\\(([^)]+)\\))?!?: (.+)$`,
      headerPatternFlags: 'u',
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject']
    }
  },
  plugins: [
    {
      rules: {
        'emoji-empty': (parsed) => {
          const { emoji } = parsed;
          if (!emoji || emoji.trim() === '') {
            return [false, 'The emoji may not be empty'];
          }
          return [true];
        },
        'emoji-enum': (parsed) => {
          const { emoji } = parsed;
          if (!emoji || !allowedEmojis.includes(emoji)) {
            return [false, `The emoji may be one of these types: ${allowedEmojis.join(' ')}`];
          }
          return [true];
        }
      }
    }
  ]
};
