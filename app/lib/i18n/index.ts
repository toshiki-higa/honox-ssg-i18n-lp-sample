import type { Env, Context } from "hono";
import { ssgParams } from "hono/ssg";
import i18n_ja from "./locales/ja.json";
import i18n_en from "./locales/en.json";

// 対応言語を宣言
export const supportedLanguages = ['en', 'ja'];

export const langParam = ssgParams<Env>((c) => {
  const params: { lang: string }[] = [];
  supportedLanguages.forEach((lang) => params.push( {lang} ));
  return params;
});

const i18n = {
  ja: i18n_ja,
  en: i18n_en
}

export const useTranslations = (c: Context) => {
  const lang = c.req.param("lang");

  return (namespace: string) => {
    const getNestedValue = (obj: any, path: string) => {
      return path.split('.').reduce((prev, curr) => {
        return prev && prev[curr] ? prev[curr] : undefined;
      }, obj);
    };

    return (key: string, variables?: Record<string, string>) => {
      const messages = i18n[lang as keyof typeof i18n];
      const nsMessages = namespace ? getNestedValue(messages, namespace) : messages;
      
      if (!nsMessages) {
        return key;
      }
      
      let translation = nsMessages[key] || key;
      
      // 変数置換処理
      if (variables) {
        Object.entries(variables).forEach(([varKey, value]) => {
          translation = translation.replace(new RegExp(`{{${varKey}}}`, 'g'), value);
        });
      }
      
      return translation;
    };
  };
};

