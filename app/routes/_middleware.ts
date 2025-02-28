import { supportedLanguages } from "@/lib/i18n";
import { languageDetector } from "hono/language";
import { createRoute } from "honox/factory";

export default createRoute(
	languageDetector({
		supportedLanguages: supportedLanguages,
		fallbackLanguage: "ja", // Required
	}),
);
