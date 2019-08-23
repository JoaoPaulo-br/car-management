export function isAuthenticate() {
  const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
  if (currentUserInfo && currentUserInfo['x-auth-token']) {
    return true
  }
  return false
}
