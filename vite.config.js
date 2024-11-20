import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";  // Import the path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@", 
        replacement: path.resolve(__dirname, "src")  // Use path.resolve for absolute path
      }
    ],
  },
});
