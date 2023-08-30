/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 更多环境变量提示
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESC: string;
  readonly VITE_APP_KEYWORDS: string;
  readonly VITE_APP_ICON: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_THEME: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'element-plus/dist/locale/zh-cn.mjs';
