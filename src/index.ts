export enum ViewerAPIMessage {
  STATUS = 'STATUS',
  GET_STATUS = 'GET_STATUS',
  START_AR = 'START_AR',
  UPDATE_VARIANT = 'UPDATE_VARIANT',
  UPDATE_LANGUAGE = 'UPDATE_LANGUAGE',
  SHOW_STEP = 'SHOW_STEP',
  CLOSE_STEP = 'CLOSE_STEP',
  RESET_CAMERA = 'RESET_CAMERA',
  LOCK_CAMERA = 'LOCK_CAMERA',
  UNLOCK_CAMERA = 'UNLOCK_CAMERA',
  SHOW_HELP = 'SHOW_HELP',
  CLOSE_HELP = 'CLOSE_HELP',
  SHOW_QR = 'SHOW_QR',
  CLOSE_QR = 'CLOSE_QR',
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

export type Payload =
  | UpdateModelVariantPayload
  | UpdateLanguagePayload
  | ShowStepPayload;

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

  public listenToViewerStatus(callback: (status: string) => void): void {
    window.addEventListener('message', (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type === ViewerAPIMessage.STATUS) {
        callback(message.status);
      }
    });
  }

  public showStep(step: string): void {
    this.executeAction({
      type: ViewerAPIMessage.SHOW_STEP,
      payload: {
        step,
      },
    });
  }

  public closeStep(): void {
    this.executeAction({
      type: ViewerAPIMessage.CLOSE_STEP,
    });
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

  public resetCamera(): void {
    this.executeAction({
      type: ViewerAPIMessage.RESET_CAMERA,
    });
  }

  public lockCamera(): void {
    this.executeAction({
      type: ViewerAPIMessage.LOCK_CAMERA,
    });
  }

  public unlockCamera(): void {
    this.executeAction({
      type: ViewerAPIMessage.UNLOCK_CAMERA,
    });
  }

  public showHelp(): void {
    this.executeAction({
      type: ViewerAPIMessage.SHOW_HELP,
    });
  }

  public closeHelp(): void {
    this.executeAction({
      type: ViewerAPIMessage.CLOSE_HELP,
    });
  }

  public showQR(): void {
    this.executeAction({
      type: ViewerAPIMessage.SHOW_QR,
    });
  }

  public closeQR(): void {
    this.executeAction({
      type: ViewerAPIMessage.CLOSE_QR,
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
