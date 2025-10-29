const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
	js.configs.recommended,
	{
		files: ["**/*.js"],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "commonjs",
			globals: {
				...globals.node,
				options: "writable",
				current: "writable"
			}
		},
		rules: {
			indent: ["error", "tab"],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"no-unused-vars": ["warn"]
		}
	}
];
