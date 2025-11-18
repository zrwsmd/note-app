export function validateUsername(username: string): { valid: boolean; message?: string } {
  if (!username) {
    return { valid: false, message: '用户名不能为空' }
  }

  if (username.length < 3) {
    return { valid: false, message: '用户名长度至少为3位' }
  }

  if (username.length > 20) {
    return { valid: false, message: '用户名长度不能超过20位' }
  }

  // 只允许字母、数字和下划线
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: '用户名只能包含字母、数字和下划线' }
  }

  return { valid: true }
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) {
    return { valid: false, message: '密码不能为空' }
  }

  if (password.length < 6) {
    return { valid: false, message: '密码长度至少为6位' }
  }

  return { valid: true }
}
