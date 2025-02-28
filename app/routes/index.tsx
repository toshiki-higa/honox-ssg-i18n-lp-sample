import { Hono } from 'hono'
import { getRoutePathsInLanguage } from '@/lib/utils'

const app = new Hono()

console.log(getRoutePathsInLanguage())

getRoutePathsInLanguage().forEach(route => {
  app.get(route.path, (c) => {
    const path = route.path === '/' ? '' : route.path
    const lang = c.get('language')
    return c.render(
      <meta http-equiv="refresh" content={`0;URL=/${lang}${path}`}></meta>
    )
  })
});

export default app;