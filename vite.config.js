import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue()],
    //跨域处理
    server: {
      proxy: {
        '/api': {
          target: env.VITE_DEEPSEEK_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 路径别名
      },
      extensions: [".js", ".json", ".ts", ".vue"], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
  }

});
