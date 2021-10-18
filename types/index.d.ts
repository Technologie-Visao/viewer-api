export declare enum ViewerStatus {
    UNMOUNTED = "unmounted",
    MOUNTED = "mounted",
    LOADING = "loading",
    LOADED = "loaded"
}
export declare enum ViewerAPIMessage {
    STATUS = "STATUS",
    GET_STATUS = "GET_STATUS",
    START_AR = "START_AR",
    GET_VARIANT = "GET_VARIANT",
    GET_AVAILABLE_VARIANTS = "GET_AVAILABLE_VARIANTS",
    UPDATE_VARIANT = "UPDATE_VARIANT",
    GET_LANGUAGE = "GET_LANGUAGE",
    GET_AVAILABLE_LANGUAGES = "GET_AVAILABLE_LANGUAGES",
    UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
    SHOW_STEP = "SHOW_STEP",
    CLOSE_STEP = "CLOSE_STEP",
    RESET_CAMERA = "RESET_CAMERA",
    LOCK_CAMERA = "LOCK_CAMERA",
    UNLOCK_CAMERA = "UNLOCK_CAMERA",
    SHOW_HELP = "SHOW_HELP",
    CLOSE_HELP = "CLOSE_HELP",
    SHOW_QR = "SHOW_QR",
    CLOSE_QR = "CLOSE_QR",
    NEXT_STEP = "NEXT_STEP",
    PREVIOUS_STEP = "PREVIOUS_STEP",
    PLAY = "PLAY",
    PAUSE = "PAUSE"
}
export interface StatusPayload {
    status: ViewerStatus;
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
export declare type Payload = StatusPayload | UpdateModelVariantPayload | UpdateLanguagePayload | ShowStepPayload;
export interface Message {
    type: ViewerAPIMessage;
    payload?: Payload;
}
export declare type ViewerStatusListenerCallback = (status: ViewerStatus) => void;
export declare type ViewerElement = HTMLIFrameElement | null;
export declare class Visao {
    private id;
    private viewerElement;
    private status;
    private callbacks;
    constructor(id: string);
    setViewerElementFromId(id: string): void;
    setViewerElement(viewerElement: ViewerElement): void;
    listenToViewerStatus(callback: ViewerStatusListenerCallback): void;
    showStep(step: string): void;
    closeStep(): void;
    previousStep(): void;
    nextStep(): void;
    play(): void;
    pause(): void;
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
    private handleIncomingMessage;
    private executeAction;
    private listenToMessages;
    private logInvalidViewerElement;
    private logForInsufficientStatusLevel;
    private validateStatusHasReachedNeededLevel;
}
//# sourceMappingURL=index.d.ts.map