import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url"; // Required for path resolution in ES modules
import { componentTagger } from "lovable-tagger";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // ES module equivalent of __dirname

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/health-form-journey/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(), // Adds only in development mode
  ].filter(Boolean), // Removes falsy values (false, null, undefined)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Correct alias resolution
    },
  },
}));
