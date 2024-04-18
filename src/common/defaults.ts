import { PluginSettings } from "./types";

/**
 * The default plugin settings.
 */
export const DEFAULT_PLUGIN_SETTINGS: PluginSettings = {
    titleFontSize: 24,
    scaleFontSize: 12,
    labelFontSize: 12,
    // annotationFontSize: 16,
  
    lineWidth: 2,
    gridWidth: 1,
  
    fontColor: "var(--text-normal)",
    // annotationColor: '#000',
    lineColor: "gray",
    gridColor: "var(--interactive-hover)",
  
    defaultRenderer: "interactive",
  
    telemetry: true,
};