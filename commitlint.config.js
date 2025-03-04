/* eslint-disable */
const allowedEmojiCodes = [
  ':wheelchair:', ':white_check_mark:', ':arrow_up:', ':arrow_down:', ':heavy_plus_sign:',
  ':ok_hand:', ':dizzy:', ':bug:', ':bulb:', ':tada:', ':wrench:', ':rocket:', ':books:',
  ':construction:', ':lipstick:', ':bricks:', ':soon:', ':truck:', ':sparkles:', ':package:',
  ':zap:', ':recycle:', ':broom:', ':wastebasket:', ':heavy_minus_sign:', ':iphone:', ':boom:',
  ':lock:', ':mag:', ':bookmark:', ':heavy_check_mark:', ':test_tube:', ':pencil:', ':label:',
  ':goal_net:', ':card_file_box:'
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', []],
    'header-max-length': [2, 'always', 100],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert', 'remove']
    ],
    'emoji-empty': [2, 'never'],
    'emoji-enum': [2, 'always', allowedEmojiCodes]
  },
  parserPreset: {
    parserOpts: {
      headerPattern: `^(${allowedEmojiCodes.join('|')}) (\\w+)(?:\\(([^)]+)\\))?!?: (.+)$`,
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
          if (!emoji || !allowedEmojiCodes.includes(emoji)) {
            return [false, `See: https://github.com/iuricode/padroes-de-commits?tab=readme-ov-file`];
          }
          return [true];
        }
      }
    }
  ]
};
