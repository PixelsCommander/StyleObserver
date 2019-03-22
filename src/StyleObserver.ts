import diff from 'object-diff';

export class StyleObserver {

    public step: number = 0;
    public styleObject: object;
    public diff: object;
    private callback: Function;
    private node: HTMLElement;
    private raf: number;
    private settings = {
        useComputedStyle: true,
        skipFrames: 0,
    };

    //Callback accepts three parameters: diff, prevStyle, nextStyle
    constructor(callback: Function) {
        this.callback = callback;

        this.styleObject = null;
        this.diff = null;

        this.update = this.update.bind(this);
    }

    observe(targetNode: HTMLElement, settings: Object) {
        this.settings = Object.assign(this.settings, settings);
        this.node = targetNode;
        this.update();
    }

    update() {
        if (this.node) {
            if (this.step === 0) {
                var styleData = {};

                if (this.settings.useComputedStyle) {
                    styleData = this.getStyleData();
                } else {
                    styleData = this.getStyleDataQuick();
                }

                //Cloning object
                var nextStyleObject = JSON.parse(JSON.stringify(styleData));

                //Skip comparsion for first time when oldStyleObject is undefined
                if (this.styleObject) {
                    this.diff = diff(this.styleObject, nextStyleObject);
                }

                this.styleObject = nextStyleObject;

                if (this.diff && Object.keys(this.diff).length) {
                    this.callback(this.diff, this.styleObject, nextStyleObject);
                }
            }

            this.step = this.step < this.settings.skipFrames ? this.step + 1 : 0;
            this.raf = requestAnimationFrame(this.update);
        }
    }

    getStyleDataQuick() {
        return this.node.style;
    }

    getStyleData() {
        return window.getComputedStyle(this.node, null);
    }

    dispose() {
        cancelAnimationFrame(this.raf);
        this.node = null;
        this.callback = null;
    }
}

(<any>window).StyleObserver = StyleObserver;
export default StyleObserver;