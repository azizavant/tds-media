import ReactDOM from 'react-dom/client'
import { App } from './app'
import './shared/styles/global.sass'
import './shared/styles/vars.sass'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/api/reactQuery/client.config.ts'
import 'dayjs/locale/ru'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/lib/locale/ru_RU'
import { globalTheme } from './shared/config/ui-kit.ts'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

dayjs.locale('ru')


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    locale={ ru_RU }
    theme={globalTheme}
  >
    <QueryClientProvider client={ queryClient }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>,
    </QueryClientProvider>
  </ConfigProvider>
)
