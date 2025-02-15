/// <reference types="vue" />
/// <reference types="three" />
/// <reference types="@types/tinycolor2" />
/// <reference types="@types/jquery" />
/// <reference types="wintersky" />

/// <reference types="./textures" />
/// <reference types="./action" />
/// <reference types="./animation" />
/// <reference types="./canvas" />
/// <reference types="./codec" />
/// <reference types="./file_system" />
/// <reference types="./format" />
/// <reference types="./global" />
/// <reference types="./interface" />
/// <reference types="./dialog" />
/// <reference types="./panel" />
/// <reference types="./keyframe" />
/// <reference types="./legacy" />
/// <reference types="./menu" />
/// <reference types="./outliner" />
/// <reference types="./plugin" />
/// <reference types="./preview" />
/// <reference types="./project" />
/// <reference types="./settings" />
/// <reference types="./timeline" />
/// <reference types="./undo" />
/// <reference types="./validator" />
/// <reference types="./util" />


declare class Deletable {
	delete: () => void
}
type UUID = string

/**
 * True if Blockbench runs as a native app
 */
declare const isApp: boolean

type EventName = 'remove_animation'
	| 'display_animation_frame'
	| 'before_closing'
	| 'create_session'
	| 'join_session'
	| 'quit_session'
	| 'send_session_data'
	| 'receive_session_data'
	| 'user_joins_session'
	| 'user_leaves_session'
	| 'process_chat_message'
	| 'update_settings'
	| 'update_project_settings'
	| 'save_project'
	| 'load_project'
	| 'new_project'
	| 'reset_project'
	| 'close_project'
	| 'add_cube'
	| 'add_mesh'
	| 'add_group'
	| 'add_texture_mesh'
	| 'group_elements'
	| 'update_selection'
	| 'update_keyframe_selection'
	| 'select_all'
	| 'added_to_selection'
	| 'invert_selection'
	| 'canvas_select'
	| 'canvas_click'
	| 'change_texture_path'
	| 'add_texture'
	| 'finish_edit'
	| 'finished_edit'
	| 'undo'
	| 'redo'
	| 'load_undo_save'
	| 'select_mode'
	| 'unselect_mode'
	| 'change_active_panel'
	| 'resize_window'
	| 'press_key'
	| 'select_format'
	| 'convert_format'
	| 'construct_format'
	| 'delete_format'
	| 'select_project'
	| 'unselect_project'
	| 'setup_project'
	| 'update_project_resolution'
	| 'merge_project'
	| 'update_view'
	| 'update_camera_position'
	| 'render_frame'
	| 'construct_model_loader'
	| 'delete_model_loader'
	| 'update_recent_project_data'
	| 'update_recent_project_thumbnail'
	| 'load_from_recent_project_data'
	| 'edit_animation_properties'
	| 'select_preview_scene'
	| 'unselect_preview_scene'

type IconString = string;

interface MessageBoxOptions {
	/**
	 * Index of the confirm button within the buttons array
	 */
	confirm: number
	/**
	 * Index of the cancel button within the buttons array
	 */
	cancel: number
	buttons: string[]
	translateKey?: string
	title?: string
	message?: string
	icon?: string
	width: number
	/**
	 * Display a list of actions to do in the dialog. When clicked, the message box closes with the string ID of the command as first argument.
	 */
	commands?: {
		[id: string]: string | {text: string}
	}
}

declare namespace Blockbench {
	const platform: 'web' | 'win32' | 'darwin' | 'linux'
	const version: string
	/**
	 * Time when Blockbench was opened
	 */
	const openTime: Date
	function reload(): void
	/**
	 * checks if Blockbench is newer than the specified version
	 * 
	 * @param version
	 * semver string
	 */
	function isNewerThan(version: string): boolean
	/**
	 * checks if Blockbench is older than the specified version
	 * 
	 * @param version
	 * semver string
	 */
	function isOlderThan(version: string): boolean
	/**
	 * Resolves an icon string as a HTML element
	 * @param icon 
	 * Material Icons, Fontawesome or custom icon string
	 * @param color 
	 * CSS color
	 */
	function getIconNode(icon: IconString, color?: string): HTMLElement
	/**
	 * Shows a passing message in the middle of the screen
	 * 
	 * @param message 
	 * Message
	 * @param time 
	 * Time in miliseconds that the message stays up
	 */
	function showQuickMessage(message: string, time?: number): void

	function showStatusMessage(message: string, time?: number): void

	function setStatusBarText(text?: string): void
	/**
	 * Set the value of a progress bar
	 * 
	 * @param progress 
	 * Progress of the bar between 0 and 1
	 * @param time 
	 * Time over which the bar is animated, in miliseconds
	 * @param bar
	 * ID of the bar element. If omitted, the main status bar will be selected
	 */
	function setProgress(progress: number, time?: number, bar?: string): void

	/**
	 * Opens a message box
	 */
	function showMessageBox(options: MessageBoxOptions, callback: (buttonID: number | string) => void): void

	function textPrompt(title: string, value: string, callback: (value: string) => void): void
	/**
	 * Opens the specified link in the browser or in a new tab
	 */
	function openLink(link: URL): void

	/**
	 * Shows a system notification
	 * @param title Title
	 * @param text Text
	 * @param icon Url or data url pointing to an icon. Defaults to Blockbench icon
	 */
	function notification(title: string, text: string, icon?: string): void
	/**
	 * Adds custom CSS code to Blockbench, globally. Returns an object that is deletable
	 * @param css CSS string
	 */
	function addCSS(css: string): Deletable

	function addFlag(flag: string): void
	function removeFlag(flag: string): void
	function hasFlag(flag: string): boolean

	function dispatchEvent(event_name: EventName, data: object): void

	function addListener(event_names: EventName, callback: (data: object) => void): void
	function on(event_names: EventName, callback: (data: object) => void): void

	function removeListener(event_names: EventName): void
}


interface PluginData {
	title: string
	author: string
	description: string
	icon: string
	variant: 'desktop' | 'web' | 'both'
	about?: string
	min_version: string
	max_version: string
	onload: () => void
	onunload: () => void
	oninstall: () => void
	onuninstall: () => void
}

declare class Plugin {
	static register(id: string, data: PluginData): Plugin
	constructor()
}

type Condition = any


interface PropertyOptions {
	default?: any
	condition?: any
	exposed?: boolean
	label?: string
	/**
	 * Options used for select types
	 */
	options?: object
	merge?: (instance: any, data: object) => void
	reset?: (instance: any) => void
	merge_validation?: (value: any) => boolean
}
/**
 * Creates a new property on the specified target class
 */
declare class Property extends Deletable {
    constructor(target_class: any, type: string, name: string, options?: PropertyOptions);
    class: any;
    name: string;
    type: string;
	default: any;
	
    isString: boolean;
    isMolang: boolean;
    isNumber: boolean;
    isBoolean: boolean;
    isArray: boolean;
    isVector: boolean;
	isVector2: boolean;
	
    merge_validation: undefined | ((value: any) => boolean);
    condition: any;
    exposed: boolean;
    label: any;
	merge: (instance: any, data: object) => void
	reset: (instance: any) => void
    getDefault(instance: any): any;
    copy(instance: any, target: any): void;
}

declare function updateSelection(): void

/**
 * Returns a translated string in the current language
 * @param key Translation key
 * @param arguments Array of arguments that replace anchors (%0, etc.) in the translation. Items can be strings or anything that can be converted to strings
 */
declare function tl(key: string, arguments?: any[]): string

declare namespace Language {
	/**
	 * Translation data for the current language
	 */
	const data: {
		[key: string]: string
	}
	/**
	 * Two letter code indicating the currently selected language
	 */
	const code: string
	/**
	 * Add translations for custom translation strings
	 * @param language Two letter language code, e. G. 'en'
	 * @param strings Object listing the translation keys and values
	 */
	function addTranslations(language: string, strings: {[key: string]: string})
}
