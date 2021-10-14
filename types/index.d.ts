export declare enum ViewerAPIMessage {
    START_AR = "START_AR",
    UPDATE_VARIANT = "UPDATE_VARIANT",
    UPDATE_LANGUAGE = "UPDATE_LANGUAGE"
}
export interface UpdateLanguagePayload {
    language: string;
}
export interface UpdateModelVariantPayload {
    modelVariant: string;
}
export declare type Payload = UpdateModelVariantPayload | UpdateLanguagePayload;
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
    changeLanguage(language: string): void;
    showModelVariant(modelVariant: string): void;
    startAR(): void;
    private executeAction;
    private logInvalidViewerElement;
}
//# sourceMappingURL=index.d.ts.map