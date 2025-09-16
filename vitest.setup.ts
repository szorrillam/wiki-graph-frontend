import '@testing-library/jest-dom';

// Polyfill JSON.parseSafe used in ApiExplorer cURL convenience
if (!(JSON as any).parseSafe) {
  (JSON as any).parseSafe = (text: string) => {
    try { return JSON.parse(text); } catch { return undefined; }
  };
}


