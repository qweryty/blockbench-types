interface ResizeLineOptions {
	condition?: Condition
	horizontal?: boolean
	position(): void
	get(): void
	set(): void
}
declare class ResizeLine {
	constructor(id: string, options: ResizeLineOptions)

	id: string
	horizontal: boolean
	condition?: Condition
	width: number
	get(): void
	set(): void
	node: HTMLElement
	update(): void
	setPosition(data: {top?: number, bottom?: number, left?: number, right?: number}): void
}

declare namespace Interface {
	function createElement(type: keyof HTMLElementTagNameMap, attributes?: {}, content?: string | HTMLElement | HTMLElement[]): HTMLElement

	const data: {
		left_bar_width: number
		right_bar_width: number
		quad_view_x: number
		quad_view_y: number
		timeline_head: number
		left_bar: string[]
		right_bar: string[]
	}
	let left_bar_width: number
	let right_bar_width: number
	let top_panel_height: number
	let bottom_panel_height: number
	function getTopPanel(): Panel[]
	function getBottomPanel(): Panel[]
	function getLeftPanels(): Panel[]
	function getRightPanels(): Panel[]
	const Resizers: {
		left: ResizeLine
		right: ResizeLine
		quad_view_x: ResizeLine
		quad_view_y: ResizeLine
		top: ResizeLine
		bottom: ResizeLine
		timeline_head: ResizeLine
	}
	const status_bar: {
		menu: Menu
		vue: Vue
	}
	const Panels: {
		(key: string): Panel
	}
	function toggleSidebar(side, status): void

	const text_edit_menu: Menu

	function addSuggestedModifierKey(key: 'ctrl' | 'shift' | 'alt', text: string): void
	function removeSuggestedModifierKey(key: 'ctrl' | 'shift' | 'alt', text: string): void

	const center_screen: HTMLElement
	const page_wrapper: HTMLElement
	const preview: HTMLElement
	const work_screen: HTMLElement
	const right_bar: HTMLElement
	const left_bar: HTMLElement

	namespace CustomElements {
		function SelectInput(id: string, options: {
			value?: string
			default?: string
			options: {key: string, value: string}
			onChange?(): void
		}): HTMLElement
		const ResizeLine;
	}
}

// Optional strings?
interface Colors {
    ui: string
    back: string
    dark: string
    border: string
    selected: string
    button: string
    bright_ui: string
    accent: string
    frame: string
    text: string
    light: string
    accent_text: string
    bright_ui_text: string
    subtle_text: string
    grid: string
    wireframe: string
    checkerboard: string
}

interface ThemeData{
    id: string
    name: string
    author: string
    customized: boolean
    borders: boolean
    main_font: string
    headline_font: string
    code_font: string
    css: string
    colors: Colors
}

interface Theme {
    data: ThemeData
    themes: [] // FIXME
    defaultColors: Colors
    sideload_themes: [] // FIXME
    setup()
    setupDialog()
    customizeTheme()
    updateColors()
    updateSettings()
    // loadTheme(theme) // FIXME
    // import(file) // FIXME
}

declare const CustomTheme: Theme;