module.exports = {
    "extends": [
      // "eslint:recommended",
       "vue"
     ],
    "plugins": [
        "import"
    ],
    "rules": {
      "space-before-function-paren": ["warn", {
          "anonymous": "always",
          "named": "always",
          "asyncArrow": "ignore"
        }],
      "camelcase": ["warn", {
          "properties": "never"
        }],
      "no-new": "warn",
      "max-len": ["warn", {
        "code": 150,
        "ignoreStrings": true
      }]
    },
};
