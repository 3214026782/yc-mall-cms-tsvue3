import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`
  // return Boolean(permissions.find((item) => item === verifyPermission))
  return !!permissions.find((item) => item === verifyPermission)
}
