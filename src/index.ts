export enum ViewerAPIMessage {
  START_AR = 'START_AR',
  UPDATE_VARIANT = 'UPDATE_VARIANT',
  UPDATE_LANGUAGE = 'UPDATE_LANGUAGE',
}

export interface UpdateLanguagePayload {
  language: string;
}

export interface UpdateModelVariantPayload {
  modelVariant: string;
}

export type Payload = UpdateModelVariantPayload | UpdateLanguagePayload;

export interface Message {
  type: ViewerAPIMessage;
  payload?: Payload;
}
export type ViewerElement = HTMLIFrameElement | null;

export class Visao {
  private id: string;
  private viewerElement: ViewerElement;

  constructor(id: string) {
    this.id = id;
    this.viewerElement = document.getElementById(id) as HTMLIFrameElement;
    this.logInvalidViewerElement();
  }

  public setViewerElementFromId(id: string): void {
    this.id = id;
    this.viewerElement = document.getElementById(id) as HTMLIFrameElement;
  }

  public setViewerElement(viewerElement: ViewerElement): void {
    this.viewerElement = viewerElement;
  }

  public changeLanguage(language: string): void {
    this.executeAction({
      type: ViewerAPIMessage.UPDATE_LANGUAGE,
      payload: {
        language,
      },
    });
  }

  public showModelVariant(modelVariant: string): void {
    this.executeAction({
      type: ViewerAPIMessage.UPDATE_VARIANT,
      payload: {
        modelVariant,
      },
    });
  }

  public startAR(): void {
    this.executeAction({
      type: ViewerAPIMessage.START_AR,
    });
  }

  private executeAction(action: Message): void {
    this.logInvalidViewerElement();

    this.viewerElement?.contentWindow?.postMessage(JSON.stringify(action), '*');
  }

  private logInvalidViewerElement(): void {
    if (!this.viewerElement) {
      console.error(
        `Visao: Viewer HTML element cannot be found in the DOM with the "id" ${this.id}`,
      );
    }
  }
}
