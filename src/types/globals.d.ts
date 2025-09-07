export {}; // ensures this file is a module

declare global {
  interface Window {
    __INITIAL_THEME__: any;
  }
}
