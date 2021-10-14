enum ViewerAPIMessage {
  START_AR = 'START_AR',
  UPDATE_VARIANT = 'UPDATE_VARIANT',
}

interface UpdateVariantPayload {
  modelVariant: string;
}

type Payload = UpdateVariantPayload;

interface Message {
  type: ViewerAPIMessage;
  payload?: Payload;
}

export class Visao {
  private readonly id: string;
  private readonly viewerElement: HTMLIFrameElement | null;

  constructor(id: string) {
    this.id = id;
    this.viewerElement = document.getElementById(id) as HTMLIFrameElement;
    this.logInvalidViewerElement();
  }

  public showModelVariant(modelVariant: string): void {
    console.log('CALLING show model variant!');
    this.executeAction({
      type: ViewerAPIMessage.UPDATE_VARIANT,
      payload: {
        modelVariant,
      },
    });
  }

  public startAR(): void {
    console.log('CALLING start AR!');
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
