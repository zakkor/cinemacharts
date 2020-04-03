import React from 'react'
import CanvasChart from 'chart.js'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()

    CanvasChart.defaults.global.defaultFontSize = 14
  }

  render() {
    if (this.canvas.current) {
      this.renderChart()
    }

    return (
      <canvas ref={this.canvas}></canvas>
    )
  }

  renderChart() {
    const { data } = this.props
    const showLabels = data.length <= 10
    const labels = data.map(d => d.label)
    const ratings = data.map(d => d.value)

    const colors = ratings.map(r => {
      const R = (255 * (10 - r)) / 10
      const G = (255 * r) / 10
      return `rgba(${R}, ${G}, 0, 0.3)`
    })

    // Cleanup
    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new CanvasChart(this.canvas.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rating',
          data: ratings,
          backgroundColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              display: showLabels,
              major: {
                fontColor: 'rgba(255, 0, 0, 1)'
              }
            },
          }],
          yAxes: [{
            ticks: {
              min: 1,
              max: 10,
            }
          }]
        }
      }
    })
  }
}
export default React.memo(Chart)