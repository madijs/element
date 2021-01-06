import { any, contains } from "ramda"

export const Permission = (id, name, description) => {
  return {
    id: id,
    key: id,
    value: id,
    name: name,
    text: name,
    description: description,
  }
}

export const hasEnoughPermissions = (userPermissions, requiredPermissions) => {
  const requiredIds = requiredPermissions.map((p) => p.id)
  return (
    requiredPermissions.length === 0 ||
    any((permission) => contains(permission.id, requiredIds))(userPermissions)
  )
}

export const canAdministrate = Permission(3, "Администрирование")
export const canTeach = Permission(3, "Администрирование")
export const canLearn = Permission(3, "Администрирование")

export const roleOptions = [
  canAdministrate,
]
