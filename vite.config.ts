import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules/]
      }
    },
    optimizeDeps: {
      include: ['decentraland-ui2', '@dcl/ui-env', '@dcl/hooks']
    },
    ...(command === 'build' ? { base: envVariables.VITE_BASE_URL } : undefined),
    server: {
      proxy: {
        '/auth': {
          target: 'https://decentraland.zone',
          changeOrigin: true,
          secure: false,
          ws: true
        }
      }
    }
  }
})
