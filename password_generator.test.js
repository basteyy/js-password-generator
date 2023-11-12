// Importieren von assert aus einer Testbibliothek wie 'assert' oder 'chai'
const assert = require('assert');

// Beispiel-Element und Einstellungen für Tests
const targetElement = document.createElement('input');
const settings = {
    'length': 12,
    'uppercase': true,
    'lowercase': true,
    'numbers': true,
    'special': true,
    'exclude': 'AB',
    'excludeSimilar': true,
    'excludeAmbiguous': true,
    'show_after': true,
    'show_timeout': 5000,
    'select_after': true,
};

describe('PasswordGenerator', () => {
    it('should generate a password and set it in the target element', () => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        passwordGenerator.generate();
        const generatedPassword = targetElement.value;
        assert.strictEqual(generatedPassword.length, settings.length);
    });

    it('should exclude characters specified in the "exclude" setting', () => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        passwordGenerator.generate();
        const generatedPassword = targetElement.value;
        assert.ok(!generatedPassword.includes('A') && !generatedPassword.includes('B'));
    });

    it('should exclude similar characters', () => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        passwordGenerator.generate();
        const generatedPassword = targetElement.value;
        assert.ok(!/[ilLI|`oO0]/.test(generatedPassword));
    });

    it('should exclude ambiguous characters', () => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        passwordGenerator.generate();
        const generatedPassword = targetElement.value;
        assert.ok(!/[{}()[\]\/\\'";:.,<>?]/.test(generatedPassword));
    });

    it('should show and hide the password in the target element', (done) => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        passwordGenerator.generate();
        assert.strictEqual(targetElement.type, 'text');
        setTimeout(() => {
            assert.strictEqual(targetElement.type, 'password');
            done();
        }, settings.show_timeout + 100); // Warten Sie auf das Ende der Anzeigezeit plus 100 ms
    });

    it('should select the password text in the target element', () => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        passwordGenerator.generate();
        assert.strictEqual(targetElement.selectionStart, 0);
        assert.strictEqual(targetElement.selectionEnd, targetElement.value.length);
    });

    it('should allow changing the target element with setTarget', () => {
        const passwordGenerator = new PasswordGenerator(targetElement, settings);
        const newTargetElement = document.createElement('input');
        passwordGenerator.setTarget(newTargetElement);
        assert.strictEqual(targetElement, newTargetElement);
    });
});
