export declare enum ViewerAPIMessage {
    STATUS = "STATUS",
    GET_STATUS = "GET_STATUS",
    START_AR = "START_AR",
    UPDATE_VARIANT = "UPDATE_VARIANT",
    UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
    SHOW_STEP = "SHOW_STEP",
    CLOSE_STEP = "CLOSE_STEP",
    RESET_CAMERA = "RESET_CAMERA",
    LOCK_CAMERA = "LOCK_CAMERA",
    UNLOCK_CAMERA = "UNLOCK_CAMERA",
    SHOW_HELP = "SHOW_HELP",
    CLOSE_HELP = "CLOSE_HELP",
    SHOW_QR = "SHOW_QR",
    CLOSE_QR = "CLOSE_QR"
}
export interface UpdateLanguagePayload {
    language: string;
}
export interface UpdateModelVariantPayload {
    modelVariant: string;
}
export interface ShowStepPayload {
    step: string;
}
export declare type Payload = UpdateModelVariantPayload | UpdateLanguagePayload | ShowStepPayload;
export interface Message {
    type: ViewerAPIMessage;
    payload?: Payload;
}
export declare type ViewerElement = HTMLIFrameElement | null;
export declare class Visao {
    private id;
    private viewerElement;
    constructor(id: string);
    setViewerElementFromId(id: string): void;
    setViewerElement(viewerElement: ViewerElement): void;
    listenToViewerStatus(callback: (status: string) => void): void;
    showStep(step: string): void;
    closeStep(): void;
    changeLanguage(language: string): void;
    showModelVariant(modelVariant: string): void;
    startAR(): void;
    resetCamera(): void;
    lockCamera(): void;
    unlockCamera(): void;
    showHelp(): void;
    closeHelp(): void;
    showQR(): void;
    closeQR(): void;
    private executeAction;
    private logInvalidViewerElement;
}
//# sourceMappingURL=index.d.ts.map