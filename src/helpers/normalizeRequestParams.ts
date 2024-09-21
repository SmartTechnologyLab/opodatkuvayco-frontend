export const normalizeRequestParams = <T extends string | number | symbol>(params: Record<T, unknown>) => {
  const paramsEntries = Object.entries(params)

  const paramsResult = paramsEntries
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${item}`).join('&')
      }

      if (value) {
        return `${key}=${value}`
      }
    })
    .join('&')

  return `?${paramsResult}`
}
