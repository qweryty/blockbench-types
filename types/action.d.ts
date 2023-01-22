declare const BarItems: {
    [id: string]: BarItem
}

declare interface KeybindKeys {
    /**
     * Main key, can be a numeric keycode or a lower case character
     */
    key: number | string
    ctrl?: boolean | null
    shift?: boolean | null
    alt?: boolean | null
    meta?: boolean | null
}
declare class Keybind {
    constructor(keys: KeybindKeys)
}
interface KeybindItemOptions {
    keybind?: Keybind
}
declare class KeybindItem extends Deletable {
    constructor(id: string, options: KeybindItemOptions);

    id: string
    type: string
    name: string
    category: string
    default_keybind?: Keybind
    keybind: Keybind
}

declare class MenuSeparator {
    constructor();
}
interface BarItemOptions extends KeybindItemOptions {
    name?: string
    description?: string
    icon: string
    condition?: any
    category?: string
    keybind?: Keybind
}
declare class BarItem extends KeybindItem {
    constructor(id: string, options: BarItemOptions);
    conditionMet(): boolean;
    addLabel(in_bar: any, action: any): void;
    getNode(): HTMLElement;
    toElement(destination: HTMLElement): this;
    pushToolbar(bar: any): void;
}

interface ActionOptions extends BarItemOptions {
    click(event: Event): void
    color?: string
    linked_setting?: string
    children?: object[]
    /**
     * Show the full label in toolbars
     */
    label?: boolean
}
declare class Action extends BarItem {
    constructor(id: string, options: ActionOptions);
    /**
     * Trigger to run or select the action. This is the equivalent of clicking or using a keybind to trigger it. Also checks if the condition is met.
     */
    trigger(event?: Event): boolean;
    updateKeybindingLabel(): this;
    /** Change the icon of the action */
    setIcon(icon: IconString): void;
    toggleLinkedSetting(change: any): void;
    nodes: HTMLElement[]
    /**
     * Provide a menu that belongs to the action, and gets displayed as a small arrow next to it in toolbars.
     */
    side_menu?: Menu
    icon?: string
}

type RGBAColor = {r: number, g: number, b: number, a: number}
type ViewMode = 'textured' | 'solid' | 'wireframe' | 'uv' | 'normal'
type PaintContext = {
    /**
     * Brush color, set by the Blockbench color panel
    */
    color: string,
    /**
     * Opacity, as set by the Opacity slider
     */
    opacity: number,
    /**
     * 2D Canvas context of the texture that is being edited
     */
    ctx: CanvasRenderingContext2D,
    /**X Coordinate of the position of the brush stroke */
    x: number,
    /**Y Coordinate of the position of the brush stroke */
    y: number,
    /**
     * Brush size, as set by the Brush Size slider
     */
    size: number,
    /**
     * Brush softness, as set by the Brush Softness slider
     */
    softness: number,
    /**
     * Blockbench texture that is being edited
     */
    texture: Texture,
    /**
     * Javascript pointer event that the brush stroke originated from
     */
    event: PointerEvent
}
interface BrushOptions {
    /**
     * Enable the input for blend modes when this tool is selected
     */
    blend_modes: boolean
    /**
     * Enable the input for shapes when this tool is selected
     */
    shapes: boolean
    /**
     * Enable the input for brush size when this tool is selected
     */
    size: boolean
    /**
     * Enable the input for softness when this tool is selected
     */
    softness: boolean
    /**
     * Enable the input for opacity when this tool is selected
     */
    opacity: boolean
    /**
     * When the brush size is an even number, offset the snapping by half a pixel so that even size brush strokes can be correctly centered
     */
    offset_even_radius: boolean
    /**
     * Set whether the brush coordinates get floored to snap to the nearest pixel.
     */
    floor_coordinates: boolean | (() => boolean)
    /**
     * Function that runs per pixel when the brush is used. Mutually exclusive with draw().
     * @param pixel_x Local X coordinate relative to the brush center
     * @param pixel_y Local Y coordinate relative to the brush center
     * @param pixel_color Current color of the pixel on the texture
     * @param local_opacity Local opacity of the current pixel on the brush, between 0 and 1. Opacity falls of to the sides of the brush if the brush is set to smooth. Opacity from the Opacity slider is not factored in yet.
     * @param PaintContext Additional context to the paint stroke
     */
    changePixel(pixel_x: number, pixel_y, pixel_color: RGBAColor, local_opacity: number, PaintContext: PaintContext): RGBAColor
    /**
     * Function that runs when a new brush stroke starts. Return false to cancel the brush stroke
     * @param context 
     */
    onStrokeStart(context: {texture: Texture, x: number, y: number, uv?: object, event: PointerEvent, raycast_data: RaycastResult}): boolean
    /**
     * Function that runs when a new brush stroke starts. Return false to cancel the brush stroke
     * @param context 
     */
    onStrokeMove(context: {texture: Texture, x: number, y: number, uv?: object, event: PointerEvent, raycast_data: RaycastResult}): boolean
    /**
     * Function that runs when a new brush stroke starts.
     * @param context 
     */
    onStrokeEnd(context: {texture: Texture, x: number, y: number, uv?: object, raycast_data: RaycastResult})
    /**
     * Alternative way to create a custom brush, mutually exclusive with the changePixel() function. Draw runs once every time the brush starts or moves, and also along the bath on lines.
     * @param context 
     */
    draw(context: {ctx: CanvasRenderingContext2D, x: number, y: number, size: number, softness: number, texture: Texture, event: PointerEvent})

}
interface ToolOptions extends ActionOptions {
    selectFace?: boolean
    selectElements?: boolean
    transformerMode?: 'translate' | ''
    animation_channel?: string
    toolbar?: string
    alt_tool?: string
    modes?: string[]
    allowed_view_modes?: ViewMode
    paintTool?: boolean
    brush?: BrushOptions
}
declare class Tool extends Action {
    constructor(id: string, options: ToolOptions);
    select(): this | undefined;
    trigger(event: Event): boolean;
}
declare class Widget extends BarItem {
    constructor(id: string, options: object);
}
declare class NumSlider extends Widget {
    constructor(id: string, options: object);
    startInput(event: Event): void;
    setWidth(width: any): this;
    getInterval(event: Event): any;
    slide(clientX: any, event: Event): void;
    input(): void;
    stopInput(): void;
    arrow(difference: any, event: Event): void;
    trigger(event: Event): boolean;
    setValue(value: number, trim: any): this;
    change(modify: any): void;
    get(): any;
    update(): void;
}
declare class BarSlider extends Widget {
    constructor(id: string, options: object);
    change(event: Event): void;
    set(value: any): void;
    get(): any;
}
declare class BarSelect extends Widget {
    constructor(id: string, options: object);
    open(event: Event): void;
    trigger(event: Event): boolean | undefined;
    change(event: Event): this;
    getNameFor(key: any): any;
    set(key: any): this;
    get(): any;
}
declare class BarText extends Widget {
    constructor(id: string, options: object);
    set(text: any): this;
    update(): this;
    trigger(event: Event): boolean;
}
declare class ColorPicker extends Widget {
    constructor(id: string, options: object);
    change(color: any): void;
    hide(): void;
    confirm(): void;
    set(color: any): this;
    get(): any;
}
declare class Toolbar {
    constructor(data: any);
    build(data: any, force: any): this;
    contextmenu(event: Event): void;
    editMenu(): this;
    add(action: any, position: any): this;
    remove(action: any): this;
    update(): this;
    toPlace(place: any): this;
    save(): this;
    reset(): this;
}
declare namespace BARS {
    const stored: {};
    const editing_bar: undefined | Toolbar;
    const action_definers: (() => void)[];
    const condition: any;
    function defineActions(definer: any): void;
    function setupActions(): void;
    function setupToolbars(): void;
    function setupVue(): void;
    function updateConditions(): void;
    function updateToolToolbar(): void;
}
declare namespace ActionControl {
    const open: boolean;
    const type: string;
    const max_length: number;
    function select(): void;
    function hide(): void;
    function confirm(event: Event): void;
    function cancel(): void;
    function trigger(action: any, event: Event): void;
    function click(action: any, event: Event): void;
    function handleKeys(event: Event): boolean;
}
declare namespace Keybinds {
    const actions: BarItem[];
    const stored: {};
    const extra: Record<string, KeybindItem>;
    const structure: {};
    function save (): void;
    function reset (): void;
}