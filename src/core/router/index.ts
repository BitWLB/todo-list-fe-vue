import type { RouteRecordRaw } from 'vue-router'

const componentFiles: Record<string, RouteRecordRaw[]> = import.meta.glob(
  '@/modules/**/*.router.ts',
  {
    eager: true,
    import: 'default',
  },
)

const routes: RouteRecordRaw[] = Object.values(componentFiles).flat()

export default routes
