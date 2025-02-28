import { createRoute } from "honox/factory";
import { languageDetector } from 'hono/language'
import { supportedLanguages } from "@/lib/i18n";

export default createRoute( languageDetector({
  supportedLanguages: supportedLanguages,
  fallbackLanguage: 'ja', // Required
}));