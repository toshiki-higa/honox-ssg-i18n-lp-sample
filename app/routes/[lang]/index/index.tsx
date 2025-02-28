import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { langParam, useTranslations } from "@/lib/i18n";
import { raw } from "hono/html";
import { createRoute } from "honox/factory";

export default createRoute(langParam, (c) => {
	const t = useTranslations(c)("Home");
	return c.render(
		<div>
			<div className="bg-[#fffffc] text-[#1a1a1a] p-8 container mx-auto max-w-2xl">
				<h1>{raw(t("title"))}</h1>
				<p>{raw(t("description"))}</p>
				<LanguageSwitcher />
			</div>
		</div>,
	);
});
