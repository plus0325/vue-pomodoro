/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  // 補上使用必須手動安裝 Standard 與法規範
  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    'vue/script-setup-uses-vars': 'on'
  }
}
