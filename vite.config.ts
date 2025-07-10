import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'mern-balancer-1949767843.ap-southeast-1.elb.amazonaws.com'
    ]
  }
})

