import { App, Notice, PluginSettingTab, Setting, ValueComponent} from "obsidian";
import type InformationCards from "../main";
import { DEFAULT_PLUGIN_SETTINGS } from "../common/defaults";
import { PluginSettings } from "../common/types";
  
export default class SettingsTab extends PluginSettingTab {
    plugin: InformationCards;

    constructor(app: App, plugin: InformationCards) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h1", { text: "Settings" });
    }
}