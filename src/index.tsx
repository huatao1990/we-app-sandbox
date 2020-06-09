import JSSandbox from '@ice/sandbox';
import createUISandbox from './ui-sandbox';

export interface SandboxConfig {
  resourceLoader: any;
  container?: HTMLElement;
}

export default class Sandbox {
  public global: Window;

  private resourceLoader: any;

  private jssandbox: any;

  private uisandbox: any;

  constructor(config: SandboxConfig) {
    this.resourceLoader = config.resourceLoader;

    const jssandbox = new JSSandbox();
    this.global = jssandbox.getSandbox();

    const { shadowDocument } = createUISandbox(this, config.container);
    Object.defineProperty(this.global, 'document', { value: shadowDocument });
  }

  setResourceLoader(resourceLoader: any) {
    this.resourceLoader = resourceLoader;
  }

  getResourceLoader() {
    return this.resourceLoader;
  }
}
