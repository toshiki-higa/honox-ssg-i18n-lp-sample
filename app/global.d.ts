import type {} from "hono";

declare module "hono" {
	interface Env {
		Variables: Record<string, unknown>;
		Bindings: Record<string, unknown>;
	}
}
