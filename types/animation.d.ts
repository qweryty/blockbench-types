interface AnimationOptions {
    name?: string
    loop?: string
    override?: boolean
    anim_time_update?: string
    blend_weight?: string
    length?: number
    snapping?: number
}

declare class Animation {
    constructor(data: AnimationOptions);
    extend(data: AnimationOptions): this;
    getUndoCopy(options: any, save: any): {
        uuid: any;
        name: any;
        loop: any;
        override: any;
        anim_time_update: any;
        blend_weight: any;
        length: any;
        snapping: any;
        selected: any;
    };
    compileBedrockAnimation(): object;
    save(): this | undefined;
    select(): this | undefined;
    setLength(length: number): void;
    createUniqueName(references: Animation[]): any;
    rename(): this;
    togglePlayingState(state: any): any;
    showContextMenu(event: any): this;
    getBoneAnimator(group: any): any;
    add(undo: any): this;
    remove(undo: any, remove_from_file?: boolean): this;
    getMaxLength(): any;
    setLoop(value: any, undo: any): void;
    calculateSnappingFromKeyframes(): any;
    propertiesDialog(): void;
}

namespace Animator {
    const open: boolean
    const MolangParser: object
    const motion_trail: THREE.Object3D
    const motion_trail_lock: boolean
    const particle_effects: object
    function showDefaultPose(no_matrix_update?: boolean): void
    function resetParticles(): void
    function showMotionTrail(target?: Group): void
    /**
     * Updates the preview based on the current time
     */
    function preview(): void
    function loadParticleEmitter(path: string, content: string): void
    /**
     * Import a Bedrock animation file
     * @param file File object
     * @param animation_filter List of names of animations to import
     */
    function loadFile(file: object, animation_filter?: string[])


}

interface AddChannelOptions {
    name?: string
    transform?: boolean
    mutable?: boolean
    max_data_points?: number
}
declare class GeneralAnimator {
    constructor(uuid: string, animation: Animation)
    keyframes: Keyframe[]
    select(): this
    addToTimeline(): this
    addKeyframe(data: KeyframeOptions, uuid: string): Keyframe
    createKeyframe(): Keyframe
    getOrMakeKeyframe(): {before: Keyframe, result: Keyframe}
    toggleMuted(channel: string): this
    scrollTo(): this

    static addChannel(channel: string, options: AddChannelOptions)
}

declare class BoneAnimator extends GeneralAnimator {
    name: string
    uuid: string
    rotations: Keyframe[]
    position: Keyframe[]
    scale: Keyframe[]
    getGroup(): Group
    select
    fillValues
    pushKeyframe
    doRender
    displayRotation
    displayPosition
    displayScale
    interpolate
    displayFrame
}
declare class NullObjectAnimator extends GeneralAnimator {
    name: string
    uuid: string
    rotations: Keyframe[]
    position: Keyframe[]
    scale: Keyframe[]
    getElement(): NullObject
    select
    doRender
    displayPosition
    displayIK
    displayFrame
}
declare class EffectAnimator extends GeneralAnimator {
    name: string
    uuid: string
    rotations: Keyframe[]
    position: Keyframe[]
    scale: Keyframe[]
    pushKeyframe(keyframe): this
    displayFrame(in_loop): this
    startPreviousSounds
}

