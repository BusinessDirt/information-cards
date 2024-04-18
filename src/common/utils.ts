import { Editor, parseYaml } from "obsidian";


export function parseCodeBlock(content: string): [object, string[]] {
    const functions = content.split("\n").filter((line) => line.length > 0);
    return [{}, functions];
}