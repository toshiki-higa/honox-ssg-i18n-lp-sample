import { createRoute } from "honox/factory";
import { raw } from "hono/html";
import { langParam, useTranslations } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default createRoute(langParam, (c) => {
	const t = useTranslations(c)('About');
	return c.render(
    <div>
      <div className="bg-[#fffffc] text-[#1a1a1a] p-8 container mx-auto max-w-2xl">
        <h1>{raw(t("title"))}</h1>
        <p>{raw(t("description"))}</p>
        <LanguageSwitcher />
      </div>
    </div>
	);
});