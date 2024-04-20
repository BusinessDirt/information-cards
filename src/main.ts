import { Plugin, MarkdownPostProcessorContext, Notice } from 'obsidian';
import SettingsTab from './app/SettingsTab';
import { PluginSettings } from "./common/types";
import { parseCodeBlock, recipeTabClickHandler, createCardDiv, isKey } from "./common/utils"
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
		this.registerMarkdownCodeBlockProcessor("recipe", this.createRecipeHandler(this));
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

	/**
	 * A closure creating a code-block handler that also has access to the plugin object
	 * through the outer function's scope.
	 * @param plugin The plugin
	 * @returns The code-block handler
	 */
	createRecipeHandler(plugin: InformationCards) {
		let mainClassName: string = "recipe-tabs"
		let buttonClassName: string = mainClassName.concat("-button");
		let contentClassName: string = mainClassName.concat("-content");

		return async (source: string, el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
			// div for the tab buttons
			let tabs: HTMLElement = el.createEl("div", { cls: mainClassName });
			let firstTab = true;

			let recipes: object[] = JSON.parse(source);
			recipes.forEach((recipe: object) => {
				// name of the tab, tab id for switching between tabs, list of ingredients
				let name: string = recipe["name" as keyof typeof recipe];
				let id: string = mainClassName.concat("-").concat(name.split(" ").join("-").toLowerCase());
				let ingredients: string[] = Object.keys(recipe);
			
				// create the button element to switch between tabs
				let className = buttonClassName.concat(firstTab ? " active" : "");
				tabs.createEl("button", { cls: className, text: name }).onClickEvent(
					(evt: MouseEvent) => recipeTabClickHandler(contentClassName, buttonClassName, id, evt));

				// div for all the contents with the corresponding id
				let style = firstTab ? "display: block;" : "";
				let contentDiv: HTMLElement = el.createEl("div", { 
					cls: contentClassName, 
					attr: { "id": id, "style": style } 
				});
				
				// create the ingredient list
				let list: HTMLElement = contentDiv.createEl("ul");
				ingredients.forEach((ingredient: string) => {
					if (ingredient == 'name') return;
					let listItem: HTMLLIElement = list.createEl("li");

					// add two paragraphs for the ingredient name and the amount
					listItem.createEl("p", { text: ingredient, attr: { "style": "text-align: right;" } });
					listItem.createEl("p", { text: recipe[ingredient as keyof typeof recipe], attr: { "style": "text-align: left;" } });
				});

				firstTab = false;
			});
		};
	}
}


