import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    ...nextVitals,
    // Add your rule overrides here
    {},
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "*.js"]),
]);

export default eslintConfig;
