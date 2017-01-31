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
        }]
      }
};
