const documentStyle = getComputedStyle(document.body)

export const CSS_VARIABLES = [
  documentStyle.getPropertyValue('--blue-200'),
  documentStyle.getPropertyValue('--green-200'),
  documentStyle.getPropertyValue('--yellow-200')
]

export const DEFAULT_CHART_OPTIONS = {
  maintainAspectRatio: false
}
