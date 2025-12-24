import { defineConfig } from "cypress";
import browserify from "@cypress/browserify-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprendTransformerToOptions } from "@badeball/cypress-cucumber-preprocessor/browserify";
import cymapTasks from "cymap/src/cymapTasks";
import fs from 'fs';
import path from 'path';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify({
      ...preprendTransformerToOptions(config, browserify.defaultOptions),
      typescript: require.resolve("typescript"),
    }),
  );

  on("task",{
        ...cymapTasks
      })

  on('task', {
        readCsvRandomLine({ filePath }) {
          const absolutePath = path.resolve(filePath);
          const data = fs.readFileSync(absolutePath, 'utf8');
          const lines = data.trim().split('\n');
          // Remove header if present
          const contentLines = lines.length > 1 ? lines.slice(1) : lines;
          const randomLine = contentLines[Math.floor(Math.random() * contentLines.length)];
          return randomLine;
        }
      });

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
