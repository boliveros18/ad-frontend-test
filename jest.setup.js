// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@testing-library/jest-dom');

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
