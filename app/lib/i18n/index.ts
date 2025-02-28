import type { Context, Env } from "hono";
import { ssgParams } from "hono/ssg";
import i18n_en from "./locales/en.json";
import i18n_ja from "./locales/ja.json";

// 対応言語を宣言
export const supportedLanguages = ["en", "ja"];

export const langParam = ssgParams<Env>((c) => {
	const params: { lang: string }[] = [];
	for (const lang of supportedLanguages) {
		params.push({ lang });
	}
	return params;
});

const i18n = {
	ja: i18n_ja,
	en: i18n_en,
};

// JSONの型を定義
type NestedRecord = { [key: string]: string | NestedRecord };

export const useTranslations = (c: Context) => {
	const lang = c.req.param("lang");

	return (namespace: string) => {
		const getNestedValue = (obj: NestedRecord, path: string) => {
			return path
				.split(".")
				.reduce<NestedRecord | string | undefined>((prev, curr) => {
					if (prev && typeof prev !== "string" && curr in prev) {
						return prev[curr];
					}
					return undefined;
				}, obj);
		};

		return (key: string, variables?: Record<string, string>) => {
			const messages = i18n[lang as keyof typeof i18n];
			const nsMessages = namespace
				? getNestedValue(messages as unknown as NestedRecord, namespace)
				: messages;

			if (!nsMessages) {
				return key;
			}

			let translation =
				typeof nsMessages === "string"
					? nsMessages
					: typeof nsMessages === "object" && nsMessages && key in nsMessages
						? (nsMessages as Record<string, string>)[key]
						: key;

			// 変数置換処理
			if (variables) {
				for (const [varKey, value] of Object.entries(variables)) {
					translation = translation.replace(
						new RegExp(`{{${varKey}}}`, "g"),
						value,
					);
				}
			}

			return translation;
		};
	};
};
