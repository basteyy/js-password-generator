/**
 * Password Generator
 *
 * This is a simple password generator that generates a password based on the settings.
 * By default, the new password is shown for 5 seconds and then hidden again. The password is also selected by default.
 *
 * @license CC Zero (http://creativecommons.org/publicdomain/zero/1.0/)
 * @author Sebastian Eiweleit <ey@sebastian.online>
 *
 * @param {string|object} target The target element
 * @param {object} settings The settings
 * @returns {PasswordGenerator}
 *
 */
'use strict';

class PasswordGenerator {
    constructor(target, settings = {}) {
        this.settings = {
            'length': 15,
            'blocks': 3,
            'lowercase': true,
            'uppercase': true,
            'numbers': true,
            'special': true,
            'exclude': '',
            'excludeSimilar': false,
            'excludeAmbiguous': false,
            'show_after': true,
            'show_timeout': 5000,
            'select_after': true,
            ...settings,
        };

        if (typeof target === 'string') {
            target = document.querySelector(target);
        }

        let timeout = null;

        /**
         *
         */
        this.generate = () => {

            let charset = '';

            // Lowercase
            if (this.settings.lowercase) {
                charset += 'abcdefghijklmnopqrstuvwxyz';
            }

            // Uppercase
            if (this.settings.uppercase) {
                charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }

            // Numbers
            if (this.settings.numbers) {
                charset += '0123456789';
            }

            // Special
            if (this.settings.special) {
                charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
            }

            // Exlude
            if (this.settings.exclude) {
                let exclude = this.settings.exclude.split('');
                for (let i = 0; i < exclude.length; i++) {
                    charset = charset.replace(exclude[i], '');
                }
            }

            // Exclude similar
            if (this.settings.excludeSimilar) {
                charset = charset.replace(/[ilLI|`oO0]/g, '');
            }

            // Exclude ambiguous
            if (this.settings.excludeAmbiguous) {
                charset = charset.replace(/[{}()[\]\/\\'";:.,<>?]/g, '');
            }

            // Generate password
            let length_per_block = Math.ceil(this.settings.length / this.settings.blocks),
                password = '',
                block = 0;

            for (let i = 0; i < this.settings.length; i++) {
                if (i > 0 && i % length_per_block === 0) {
                    password += ' ';
                    block++;
                }
                password += charset.charAt(Math.floor(Math.random() * charset.length));

            }

            // Set password
            target.value = password;

            // Show password?
            if (this.settings.show_after) {
                target.type = 'text';
                timeout = setTimeout(() => {
                    target.type = 'password';
                }, this.settings.show_timeout);
            }

            // Select password
            if (this.settings.select_after) {
                target.select();
            }

        };

        /**
         * Get settings
         * @returns {{uppercase: boolean, special: boolean, excludeSimilar: boolean, show_timeout: number, lowercase: boolean, select_after: boolean, blocks: number, excludeAmbiguous: boolean, length: number, numbers: boolean, exclude: string, show_after: boolean}&Object}
         */
        this.getSettings = function () {
            return this.settings;
        };

        /**
         * Get timeout
         * @returns {null}
         */
        this.getTimeout = function () {
            return timeout;
        };

        /**
         * Set new target
         */
        this.setTarget = function (new_target) {
            if (typeof new_target === 'string') {
                new_target = document.querySelector(new_target);
            }
            target = new_target;
        };
    }
}