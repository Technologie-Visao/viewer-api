export enum ViewerStatus {
  UNMOUNTED = 'unmounted',
  MOUNTED = 'mounted',
  LOADING = 'loading',
  LOADED = 'loaded',
}

const statusLevels = {
  [ViewerStatus.UNMOUNTED]: 1,
  [ViewerStatus.MOUNTED]: 2,
  [ViewerStatus.LOADING]: 3,
  [ViewerStatus.LOADED]: 4,
};

export enum ViewerAPIMessage {
  STATUS = 'STATUS',
  GET_STATUS = 'GET_STATUS',
  START_AR = 'START_AR',
  GET_VARIANT = 'GET_VARIANT',
  GET_AVAILABLE_VARIANTS = 'GET_AVAILABLE_VARIANTS',
  UPDATE_VARIANT = 'UPDATE_VARIANT',
  GET_LANGUAGE_INFORMATION = 'GET_LANGUAGE_INFORMATION',
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
  NEXT_STEP = 'NEXT_STEP',
  PREVIOUS_STEP = 'PREVIOUS_STEP',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
}

export interface StatusPayload {
  status: ViewerStatus;
}

export interface UpdateLanguagePayload {
  language: string;
}

interface LanguageInformationPayload {
  language: string;
  languages: string[];
}

export interface UpdateModelVariantPayload {
  modelVariant: string;
}

export interface ShowStepPayload {
  step: string;
}

export type Payload =
  | StatusPayload
  | UpdateModelVariantPayload
  | UpdateLanguagePayload
  | LanguageInformationPayload
  | ShowStepPayload;

export interface Message {
  type: ViewerAPIMessage;
  payload?: Payload;
}

export type ViewerStatusListenerCallback = (status: ViewerStatus) => void;
export type GetLanguageInformationCallback = (
  languageInformation: LanguageInformationPayload,
) => void;

interface Callbacks {
  [ViewerAPIMessage.STATUS]: ViewerStatusListenerCallback[];
  [ViewerAPIMessage.GET_LANGUAGE_INFORMATION]: GetLanguageInformationCallback[];
}
export type ViewerElement = HTMLIFrameElement | null;

export class Visao {
  private id: string;
  private viewerElement: ViewerElement = null;
  private status: ViewerStatus = ViewerStatus.UNMOUNTED;
  private callbacks: Callbacks = {
    [ViewerAPIMessage.STATUS]: [],
    [ViewerAPIMessage.GET_LANGUAGE_INFORMATION]: [],
  };

  constructor(id: string) {
    this.id = id;
    this.listenToMessages();
  }

  public setViewerElementFromId(id: string): void {
    this.id = id;
    this.viewerElement = document.getElementById(id) as HTMLIFrameElement;
  }

  public setViewerElement(viewerElement: ViewerElement): void {
    this.viewerElement = viewerElement;
  }

  public listenToViewerStatus(callback: ViewerStatusListenerCallback): void {
    this.callbacks[ViewerAPIMessage.STATUS].push(callback);
  }

  public showStep(step: string): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.SHOW_STEP,
        payload: {
          step,
        },
      },
      ViewerStatus.LOADED,
    );
  }

  public closeStep(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.CLOSE_STEP,
      },
      ViewerStatus.LOADED,
    );
  }

  public previousStep(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.PREVIOUS_STEP,
      },
      ViewerStatus.LOADED,
    );
  }

  public nextStep(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.NEXT_STEP,
      },
      ViewerStatus.LOADED,
    );
  }

  public play(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.PLAY,
      },
      ViewerStatus.LOADED,
    );
  }

  public pause(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.PAUSE,
      },
      ViewerStatus.LOADED,
    );
  }

  public getLanguageInformation(
    callback: GetLanguageInformationCallback,
  ): void {
    this.callbacks[ViewerAPIMessage.GET_LANGUAGE_INFORMATION].push(callback);
    this.executeAction(
      {
        type: ViewerAPIMessage.GET_LANGUAGE_INFORMATION,
      },
      ViewerStatus.MOUNTED,
    );
  }

  public changeLanguage(language: string): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.UPDATE_LANGUAGE,
        payload: {
          language,
        },
      },
      ViewerStatus.MOUNTED,
    );
  }

  public showModelVariant(modelVariant: string): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.UPDATE_VARIANT,
        payload: {
          modelVariant,
        },
      },
      ViewerStatus.LOADED,
    );
  }

  public startAR(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.START_AR,
      },
      ViewerStatus.LOADED,
    );
  }

  public resetCamera(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.RESET_CAMERA,
      },
      ViewerStatus.LOADED,
    );
  }

  public lockCamera(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.LOCK_CAMERA,
      },
      ViewerStatus.LOADED,
    );
  }

  public unlockCamera(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.UNLOCK_CAMERA,
      },
      ViewerStatus.MOUNTED,
    );
  }

  public showHelp(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.SHOW_HELP,
      },
      ViewerStatus.MOUNTED,
    );
  }

  public closeHelp(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.CLOSE_HELP,
      },
      ViewerStatus.MOUNTED,
    );
  }

  public showQR(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.SHOW_QR,
      },
      ViewerStatus.MOUNTED,
    );
  }

  public closeQR(): void {
    this.executeAction(
      {
        type: ViewerAPIMessage.CLOSE_QR,
      },
      ViewerStatus.MOUNTED,
    );
  }

  private handleIncomingMessage = (event: MessageEvent): void => {
    const message = JSON.parse(event.data) as Message;

    switch (message.type) {
      case ViewerAPIMessage.STATUS: {
        const { status } = message.payload as StatusPayload;

        this.status = status;
        if (status === ViewerStatus.MOUNTED) {
          this.setViewerElement(
            document.getElementById(this.id) as HTMLIFrameElement,
          );
        }

        this.callbacks[ViewerAPIMessage.STATUS].forEach(
          (callback: ViewerStatusListenerCallback) => callback(status),
        );

        break;
      }

      case ViewerAPIMessage.GET_LANGUAGE_INFORMATION: {
        const languageInformation =
          message.payload as LanguageInformationPayload;

        this.callbacks[ViewerAPIMessage.GET_LANGUAGE_INFORMATION].forEach(
          (callback: GetLanguageInformationCallback) =>
            callback(languageInformation),
        );

        this.callbacks[ViewerAPIMessage.GET_LANGUAGE_INFORMATION] = [];
        break;
      }

      default:
      // NOOP
    }
  };

  private executeAction(action: Message, statusNeeded?: ViewerStatus): void {
    this.logInvalidViewerElement();
    this.logForInsufficientStatusLevel(statusNeeded);

    this.viewerElement?.contentWindow?.postMessage(JSON.stringify(action), '*');
  }

  private listenToMessages(): void {
    window.addEventListener('message', this.handleIncomingMessage);
  }

  private logInvalidViewerElement(): void {
    if (!this.viewerElement) {
      console.error(
        `Visao: Viewer HTML element cannot be found in the DOM with the "id" ${this.id}`,
      );
    }
  }

  private logForInsufficientStatusLevel(statusNeeded?: ViewerStatus): void {
    if (
      statusNeeded &&
      !this.validateStatusHasReachedNeededLevel(statusNeeded)
    ) {
      console.warn(`Visao: The viewer is not yet ready for this action.`);
    }
  }

  private validateStatusHasReachedNeededLevel(
    statusNeeded: ViewerStatus,
  ): boolean {
    return statusLevels[this.status] >= statusLevels[statusNeeded];
  }
}
