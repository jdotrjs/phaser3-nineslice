module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "max-len": [
            "error",
            {
                "code": 100,
                "tabWidth": 4,
                "ignoreUrls": true
            }
        ],
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": "warn"
    },
    "globals": {
        "Phaser": false,
    },
};