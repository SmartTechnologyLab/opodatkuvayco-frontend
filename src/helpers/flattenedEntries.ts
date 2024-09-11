export const flattenedEntries = (obj: Record<string, any>, parentKey = ''): Array<[string, unknown]> => {
  let entries: Array<[string, unknown]> = []

  Object.entries(obj).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      entries = entries.concat(flattenedEntries(value, newKey))
    } else {
      entries.push([newKey, value])
    }
  })

  return entries
}
