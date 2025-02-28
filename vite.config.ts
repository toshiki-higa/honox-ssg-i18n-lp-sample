import path from "node:path";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
	const common = {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./app"),
			},
		},
	};

	if (mode === "client") {
		return {
			...common,
			build: {
				rollupOptions: {
					input: ["/app/style.css"],
					output: {
						assetFileNames: "static/assets/[name].[hash].[ext]",
					},
				},
			},
			plugins: [client()],
		};
	} else {
		return {
			...common,
			build: {
				emptyOutDir: false,
			},
			plugins: [honox(), ssg({ entry })],
		};
	}
});
