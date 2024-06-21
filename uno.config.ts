import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  // ...unocss options
  presets: [
    presetUno({
      // ...preset options
    }),
    presetAttributify({}),
  ],
});
