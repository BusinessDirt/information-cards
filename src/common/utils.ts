import { Notice } from "obsidian";

export function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
    return k in x;
}

export function parseCodeBlock(content: string): object {
    const json = JSON.parse(content);
    return json;
}

export function createCardDiv(heading: string, element: object, el: HTMLElement) {
    const div: HTMLDivElement = el.createEl("div", { cls: "info-cards-main-card" });
    createHeading(1, heading, div);
    createSubCard(1, element, div);
}

function createSubCard(level: number, element: object, el: HTMLElement) {
    Object.keys(element).forEach((key: PropertyKey) => {
        if (isKey(element, key)) {
            const value = element[key];
            const keyString: string = key;

            switch(typeof value) {
                case "string":
                    createParagraph(keyString.concat(": ").concat(value), el);
                    break;
                case "object":
                    const div: HTMLDivElement = el.createEl("div", { cls: "info-cards-sub-card" });
                    createHeading(level + 1, keyString, div);
                    createSubCard(level + 1, value, div);
                    break;
            }
        }
    });
}

function createHeading(level: number, text: string, el: HTMLElement) {
    const headingString: string = "h".concat(level.toString());
    switch(level) {
        case 1:
            el.createEl("h1", { text: text } );
            break;
        case 2:
            el.createEl("h2", { text: text } );
            break;
        case 3:
            el.createEl("h3", { text: text } );
            break;
        case 4:
            el.createEl("h4", { text: text } );
            break;
        case 5:
            el.createEl("h5", { text: text } );
            break;
        default:
            el.createEl("h6", { text: text } );
            break;
    }
}

function createParagraph(text: string, el: HTMLElement) {
    el.createEl("p", { text: text })
}