# Password Generator Readme

## Overview

**Password Generator** is a simple JavaScript library that allows you to generate secure passwords based on customizable settings. It provides flexibility in generating passwords with options for length, character types (lowercase, uppercase, numbers, special characters), and exclusion criteria. By default, the generated password is displayed for 5 seconds and then hidden, and it is also selected by default. The library is released under the CC Zero license and was authored by Sebastian Eiweleit.

## Installation

You can include the Password Generator library in your project by adding the following script tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/basteyy/js-password-generator/dist/password-generator.min.js"></script>
```

Alternatively, you can download the library from the GitHub repository and include it manually.

## Usage
To use the Password Generator, create an instance of the `PasswordGenerator` class and provide a target element (e.g., an input field) where the generated password will be displayed. You can also customize the generator's settings by passing an optional `settings` object.

Here's an example of how to use the Password Generator:

```javascript
// Create an instance of PasswordGenerator with a target element and custom settings
const passwordGenerator = new PasswordGenerator('#password-input', {
  length: 12,
  lowercase: true,
  uppercase: true,
  numbers: true,
  special: true,
  exclude: 'oO01lL', // Exclude specific characters
  excludeSimilar: true,
  excludeAmbiguous: true,
  show_after: true,
  show_timeout: 5000,
  select_after: true,
});

// Generate a password based on the settings
passwordGenerator.generate();
```

### Available Settings

* `length`: The length of the generated password.
* `blocks`: The number of blocks to divide the password into for readability.
* `lowercase`: Include lowercase characters (default: `true`).
* `uppercase`: Include uppercase characters (default: `true`).
* `numbers`: Include numbers (default: `true`).
* `special`: Include special characters (default: `true`).
* `exclude`: Specify characters to exclude from the generated password.
* `excludeSimilar`: Exclude similar-looking characters like 'l', 'I', '1', 'o', 'O', '0' (default: `false`).
* `excludeAmbiguous`: Exclude characters that may be confused, e.g., braces and brackets (default: `false`).
* `show_after`: Show the generated password for a brief period (default: `true`).
* `show_timeout`: The time (in milliseconds) for which the password is displayed (default: `5000` ms).
* `select_after`: Automatically select the generated password (default: `true`).

### Methods
* `generate()`: Generates a password based on the current settings and displays it in the target element.
* `getSettings()`: Returns the current settings as an object.
* `getTimeout()`: Returns the timeout object used for hiding the password.


## License
Password Generator is released under the CC Zero (Creative Commons Zero) license. You are free to use, modify, and distribute this library for any purpose without any restrictions.

### Author
Author: Sebastian Eiweleit
Email: ey@sebastian.online

### GitHub Repository

You can find the Password Generator library on GitHub: https://github.com/basteyy/js-password-generator

Feel free to contribute to the project or report any issues on the repository.
