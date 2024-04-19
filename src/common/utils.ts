import { Editor, parseYaml } from "obsidian";


export function parseCodeBlock(content: string): object {
    const json = JSON.parse(content);
    return json;
}