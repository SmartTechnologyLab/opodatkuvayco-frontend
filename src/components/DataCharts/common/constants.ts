export const stackedGraphOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    tooltips: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}
