interface AnglePreset {
    position: ArrayVector3
    target?: ArrayVector3
    rotation?: ArrayVector3
    projection: 'unset' | 'orthographic' | 'perspective'
    zoom?: number
    focal_length?: number
    lockedAngle?: number
}

interface PreviewOptions {
    id: string
    antialias?: boolean
}

interface RaycastResult {
    type: 'keyframe' | 'vertex' | 'cube' | 'element' | 'line';
    event: Event
    cube?: Cube
    intersects?: THREE.Intersection[]
    intersect?: THREE.Intersection
    face?: string
    vertex?: string | Vertex  // can return vertex uid or vertex FIXME
    vertices?: Vertex[]  // FIXME
    vertex_index?: number
    keyframe?: Keyframe
    element?: OutlinerNode
}

interface PreviewSelection {
        box: JQuery,
        frustum: THREE.Frustum,
        activated?: boolean,
        click_target?: RaycastResult,
        start_x?: number,
        start_y?: number,
        client_x?: number,
        client_y?: number,
        old_selected?: OutlinerElement[],
        old_mesh_selection?: Record<string, MeshSelection>,  // FIXME
}

declare class Preview extends Deletable {
    constructor(options: PreviewOptions)

    id: string
    canvas: HTMLCanvasElement
    height: number
    width: number
    node: HTMLElement
    /**
     * True if the preview is in orthographic camera mode
     */
    isOrtho: boolean
    /**
     * Angle, when in a specific side view
     */
    angle: null | number
    readonly camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
    camPers: THREE.PerspectiveCamera
    camOrtho: THREE.OrthographicCamera
    controls: THREE.OrbitControls  // FIXME defined in blockbench/js/preview/OrbitControls.js
    selection: PreviewSelection
    annotations: object
    renderer: THREE.WebGLRenderer
    background: {
        name: string
        image: any
        size: number
        x: number
        y: number
        lock: boolean
    }
    raycaster: THREE.Raycaster

    raycast(event: MouseEvent): false | RaycastResult
    render(): void
    setProjectionMode(orthographic: boolean): this
    setFOV(fov: number): void
    setLockedAngle(angle: number): this

    loadAnglePreset(angle_preset: AnglePreset): this
    /**
     * Opens a dialog to create and save a new angle preset
     */
    newAnglePreset(): this

    getFacingDirection(): 'north' | 'south' | 'east' | 'west'
    getFacingHeight(): 'up' | 'middle' | 'down'

    occupyTransformer(): this
    showContextMenu(event: Event | HTMLElement): this



    /**
     * List of all previews
     */
    static all: Preview[]
    /**
     * The last used preview
     */
    static selected: Preview

    click(event: MouseEvent): boolean;
    mousemove(event: MouseEvent): void;
    mouseup(event: MouseEvent): Preview;
}
