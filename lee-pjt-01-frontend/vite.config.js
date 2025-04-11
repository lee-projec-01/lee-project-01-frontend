import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: fs.readFileSync('./localhost-cert.pem'),
  //     cert: fs.readFileSync('./localhost-key.pem'),
  //   },
  //   // 기본 포트나 다른 옵션도 여기서 설정할 수 있습니다.
  // },
})
