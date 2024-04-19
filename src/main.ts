import { Plugin, MarkdownPostProcessorContext, Notice } from 'obsidian';
import SettingsTab from './app/SettingsTab';
import { PluginSettings } from "./common/types";
import { parseCodeBlock, createCardDiv, isKey } from "./common/utils"
import { DEFAULT_PLUGIN_SETTINGS } from './common/defaults';

// Remember to rename these classes and interfaces!

export default class InformationCards extends Plugin {
	settings: PluginSettings;

	async onload() {
		// Load settings
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingsTab(this.app, this));

		// register code block renderer
		this.registerMarkdownCodeBlockProcessor("infocards", this.createInformationCardsHandler(this));
	}

	async loadSettings() {
		
		this.settings = Object.assign({}, DEFAULT_PLUGIN_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * A closure creating a code-block handler that also has access to the plugin object
	 * through the outer function's scope.
	 * @param plugin The plugin
	 * @returns The code-block handler
	 */
	createInformationCardsHandler(plugin: InformationCards) {
		return async (source: string, el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
			el.addClass("info-cards-main-div");
			const object = parseCodeBlock(source);
			Object.keys(object).forEach(function(key) {
				if (isKey(object, key)) {
					var cardElement = object[key];
					createCardDiv(key, cardElement, el);
				}
			});
		};
	}
}


