import { Notice } from "obsidian";
import { json } from "stream/consumers";

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

export function recipeTabClickHandler(divClassName: string, buttonClassName: string, id: string, evt: MouseEvent) {
    // Get all elements with the divClassName and hide them
    let tabcontent = document.getElementsByClassName(divClassName);
    for (let i = 0; i < tabcontent.length; i++) {
        let content: HTMLElement = tabcontent[i] as HTMLElement;
        content.style.display = "none";
    }

    // Get all elements with the buttonClassName and remove the class "active"
    let tabButtons = document.getElementsByClassName(buttonClassName);
    for (let i = 0; i < tabButtons.length; i++) tabButtons[i].classList.remove("active");

    // Show the current tab, and add an "active" class to the button that opened the tab
    const divElement: HTMLElement | null = document.getElementById(id);
    if (divElement != null) {
        divElement.style.display = "block";
        evt.currentTarget.classList.add("active");
    }
}

export function getStringValue(jsonObject: object, key: string): string {
    const keyTyped = key as keyof typeof jsonObject;
    return jsonObject[keyTyped];
}