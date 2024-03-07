export const validateEmail = (email: any): boolean => {
  const campo: string = email

  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  // Se muestra un texto a modo de ejemplo, luego va a ser un icono
  if (emailRegex.test(campo)) {
    return true
  } else {
    return false
  }
}
