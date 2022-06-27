declare class ProxyClickEvent {
  constructor(domContainer: HTMLElement)
  static add: (t: HTMLElement, p: (e:EventTarget)=>void) => void;
  static remove: (t: HTMLElement, p: (e:EventTarget)=>void) => void;
  static clear: () => void;
  static destroy: () => void;
}