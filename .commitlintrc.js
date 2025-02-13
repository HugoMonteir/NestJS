module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [2, "always", "lower-case"],
    "subject-case": [2, "never", []],
    "header-max-length": [2, "always", 100],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "docs", "style", "refactor", "perf", "test", "build", "ci", "revert"]
    ]
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\p{Emoji} )?(\w+)(?:\(([^)]+)\))?!?: (.+)$/u,
      headerCorrespondence: ["emoji", "type", "scope", "subject"]
    }
  }
};
