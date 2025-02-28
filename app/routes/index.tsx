import { getRoutePathsInLanguage } from "@/lib/utils";
import { Hono } from "hono";

const app = new Hono();

for (const route of getRoutePathsInLanguage()) {
	app.get(route.path, (c) => {
		const path = route.path === "/" ? "" : route.path;
		const lang = c.get("language");
		return c.render(
			<meta http-equiv="refresh" content={`0;URL=/${lang}${path}`} />,
		);
	});
}

export default app;
