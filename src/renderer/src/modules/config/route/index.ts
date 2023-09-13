import { RouteRecordRaw } from 'vue-router'

const configRoutes: RouteRecordRaw[] = [
  {
    path: '/config',
    redirect: { name: 'config-home' },
    component: () => import('../layouts/ConfigLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'config-home',
        component: () => import('../views/hardware/HomeView.vue')
      },
      {
        path: 'printers',
        name: 'config-home-printers',
        component: () => import('../views/hardware/PrintersRootView.vue')
      },
      {
        path: 'add/printers',
        component: () => import('../layouts/AddPrinterWizardLayout.vue'),
        children: [
          {
            path: 'printers',
            name: 'config-printers-list',
            component: () => import('../views/hardware/printer/AddPrinterListView.vue')
          },
          {
            path: 'font',
            name: 'config-printers-font',
            component: () => import('../views/hardware/printer/SelectFontSizeView.vue')
          },
          {
            path: 'ticket',
            name: 'config-printers-ticket',
            component: () => import('../views/hardware/printer/AddTicketConfigView.vue')
          },
          {
            path: 'ticket',
            name: 'config-printers-characters',
            component: () => import('../views/hardware/printer/AddCharacterConfigView.vue')
          }
        ]
      },
      {
        path: 'cash-drawer',
        name: 'config-home-cash',
        component: () => import('../views/hardware/CashdrawerRootView.vue')
      },
      {
        path: 'balance',
        name: 'config-home-balance',
        component: () => import('../views/hardware/BalanceRootView.vue')
      },
      {
        path: 'adapter',
        name: 'config-home-adapter',
        component: () => import('../views/software/AdapterRootView.vue')
      }
    ]
  }
]

export default configRoutes
