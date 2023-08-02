import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    // setupNodeEvents(on, config) {
    // },
  },
  // {
  //   "extends": "../tsconfig.json",
  //   "compilerOptions": {
  //     "noEmit": true,
  //     "types": ["cypress"]
  //   },
  //   "include": [
  //     "../node_modules/cypress",
  //     "./**/*.ts"
  //   ],
  //   "exclude": []
  //   "exclude": [
  //     "node_modules/cypress",
  //     "cypress"
  //   ]
  // }
});
