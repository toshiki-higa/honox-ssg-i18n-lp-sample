import { FC } from 'hono/jsx'
import { useRequestContext } from 'hono/jsx-renderer'
import { supportedLanguages } from '@/lib/i18n'

export const LanguageSwitcher: FC = () => {
  const c = useRequestContext()
  const lang = c.req.param("lang")
  const currentPath = new URL(c.req.url).pathname
  const langIndex = currentPath.split("/").findIndex(segment => segment === lang);
  const pathWithoutLang = currentPath.split("/").slice(langIndex + 1).join("/");

  const displayLang = {
    ja: '日本語',
    en: 'English',
  }
  
  return (
    <form>
      <select name="language" id="language" onchange="location.href=value;">
        {supportedLanguages.sort().map((locale) => (
          <option
            key={locale}
            value={pathWithoutLang ? `/${locale}/${pathWithoutLang}` : `/${locale}`}
            selected={lang === locale}
          >
            {displayLang[locale as keyof typeof displayLang]}
          </option>
        ))}
      </select>
    </form>
  )
}