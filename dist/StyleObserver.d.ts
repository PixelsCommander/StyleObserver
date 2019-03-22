export declare class StyleObserver {
    step: number;
    styleObject: object;
    diff: object;
    private callback;
    private node;
    private raf;
    private settings;
    constructor(callback: Function);
    observe(targetNode: HTMLElement, settings: Object): void;
    update(): void;
    getStyleDataQuick(): CSSStyleDeclaration;
    getStyleData(): CSSStyleDeclaration;
    dispose(): void;
}
export default StyleObserver;
