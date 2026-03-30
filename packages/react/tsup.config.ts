import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/button.ts"
  },
  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  splitting: false,
  external: ["react", "react-dom", "@zds/tokens", "@zds/tokens/color", "@zds/tokens/semantic", "@zds/tokens/spacing", "@zds/tokens/radius", "@zds/tokens/typography", "@zds/tokens/components/button", "@zds/tokens/themes"]
});
