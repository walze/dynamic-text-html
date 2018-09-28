"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../public/css/dynamic-files.css");
const StringFormatter_1 = require("./StringFormatter");
const FileFormatter_1 = require("./FileFormatter");
const util_1 = require("util");
class FileRenderer extends FileFormatter_1.FileFormatter {
    constructor(options = {}) {
        super(options.flag, options.defaultCssSelector);
        this.renderFatherChildren = (lines, fathers, selectors) => {
            // iterates fathers
            fathers.map((father, fatherI) => {
                // iterates selectors
                selectors.map((selector, selectorI) => {
                    const children = Array.from(father.querySelectorAll(selector));
                    // iterates children
                    children.map((child, childI) => {
                        const multiply = childI * selectors.length;
                        const index = selectorI + multiply;
                        // if 2 dimentional array test
                        const line = Array.isArray(lines[0]) ?
                            lines[fatherI][index] :
                            lines[index];
                        const markedText = StringFormatter_1.SF(line)
                            .markClasses()
                            .markdown()
                            .removePTag()
                            .string();
                        child.innerHTML = markedText;
                    });
                });
            });
        };
        this._fieldClickFactory = (overlay) => {
            let active = false;
            return (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                active = !active;
                if (active)
                    overlay.classList.add('active');
                else
                    overlay.classList.remove('active');
            };
        };
        this._checkValidFile = (file) => {
            if (!util_1.isString(file.name))
                throw new Error('file name is not string');
            if (!util_1.isString(file.data))
                throw new Error('file data is not string');
            if (file.name === '')
                throw new Error('file name is empty');
            if (file.data === '')
                console.warn('file name is empty');
        };
        // sets addon if it exists in triggers
        const defaultAddon = options.triggers && options.triggers.default
            ? options.triggers.default
            : undefined;
        this.triggers = Object.assign({}, options.triggers, { default: this._renderDefaultFactory(this.defaultCssSelector, defaultAddon) });
        this.ext = options.ext || 'md';
    }
    render(file) {
        this._checkValidFile(file);
        file.data = StringFormatter_1.SF(file.data)
            .removeComments()
            .string();
        // if didn't match, it's a default
        const customTrigger = this.matchFlag(file.data);
        const firedTriggersReturn = customTrigger
            ? this._emitTrigger(customTrigger, file)
            : this._emitTrigger('default', file);
        return firedTriggersReturn;
    }
    _emitTrigger(triggerName, file, ...args) {
        if (triggerName === 'default') {
            return this.triggers.default(this, file, [], ...args);
        }
        // Takes "name" from "name.extension"
        const regex = new RegExp(`(.+).${this.ext}`, 'u');
        const match = file.name.match(regex);
        if (!match)
            throw new Error('file did not match RegEx');
        // selects custom divs
        const selector = `[${match[1]}]`;
        const divs = Array
            .from(document.querySelectorAll(selector))
            .map((div) => {
            this._displayFileNameToggle(file.name, div);
            return div;
        });
        const customTrigger = this.triggers[triggerName];
        return customTrigger ? customTrigger(this, file, divs, ...args) : undefined;
    }
    _renderDefaultFactory(defaultCssSelector, defaultAddon) {
        // Only gets run once
        const fields = Array.from(document.querySelectorAll(defaultCssSelector));
        let fieldIndex = 0;
        const renderDefault = (_, file, ...__) => {
            const field = fields[fieldIndex++];
            if (defaultAddon)
                defaultAddon(this, file, [field]);
            const markedText = StringFormatter_1.SF(file.data)
                .removeComments()
                .markClasses()
                .markdown()
                .string();
            field.innerHTML = markedText;
            this._displayFileNameToggle(file.name, field);
        };
        return renderDefault;
    }
    _displayFileNameToggle(fileName, field) {
        const overlay = document.createElement('div');
        overlay.classList.add('show-file-name');
        overlay.innerHTML = fileName;
        field.classList.add('dynamic');
        field.insertBefore(overlay, field.firstChild);
        const click = this._fieldClickFactory(overlay);
        let zPressed = false;
        window.addEventListener('keyup', (ev) => {
            const isNotZ = ev.key !== 'z';
            if (isNotZ)
                return;
            zPressed = isNotZ;
        });
        window.addEventListener('keydown', (ev) => zPressed = ev.key === 'z');
        field
            .addEventListener('pointerup', (ev) => zPressed ? click(ev) : undefined);
    }
}
exports.FileRenderer = FileRenderer;
//# sourceMappingURL=FileRenderer.js.map