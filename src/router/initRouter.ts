import routes from './routes'
import type CoreRouter from './Router'
import renderDOM from 'utils/renderDOM'

export function initRouter (router: CoreRouter, store: Store<AppState>): void {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user)
      const currentScreen = Boolean(store.getState().screen)

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block })
        return
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.Onboarding })
      }
    })
  })

  /**
     * Глобальный слушатель изменений в сторе
     * для переключения активного экрана
     */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start()
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen)
      renderDOM(new Page({}))
      document.title = `App / ${Page.componentName}`
    }
  })
}