import { defineConfig } from "cypress";
import { clearDB,seedDB } from "./db/index.js";

export default defineConfig({
  e2e: {
    baseUrl:'http://localhost:5170',
    setupNodeEvents(on, config) {
      on("task", {
        'db:clear': async () => {
          await clearDB()
          return null;
        },
        'db:seed': async () => {
          await seedDB()
          return null;
        },
      });
    },
  },
});
