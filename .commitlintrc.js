const matchAnyEmojiWithSpaceAfter =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\[(T-\d+)]\s)?/;
const subjectThatDontStartWithBracket = /([^\[].+)/;

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" +
        matchAnyEmojiWithSpaceAfter.source +
        matchOptionalTicketNumberWithSpaceAfter.source +
        subjectThatDontStartWithBracket.source +
        "$"
      ),
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
  rules: {
    "type-enum": [2, "always", ["♿", "✅", "⬆️", "⬇️", "➕", "👌", "💫", "🐛", "💡", "🎉",
    "🔧", "🚀", "📚", "🚧", "💄", "🧱", "🔜", "🚚", "✨", "📦", "⚡", "♻️", "🧹", "🗑️", "➖",
      "📱", "💥", "🔒️", "🔍️", "🔖", "✔️", "🧪", "📝", "🏷️️", "🥅", "🗃️"]],
  },
};