import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: process.env.BACKEND_URL || "http://localhost:5000",
				changeOrigin: true
			},
		},
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
		rollupOptions: {
			output: {
			manualChunks: undefined, // Avoid splitting into too many chunks
			},
	},
	}
});
