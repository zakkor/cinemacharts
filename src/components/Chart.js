import React from 'react'
import styled from 'styled-components'
import CanvasChart from 'chart.js'

const CanvasContainer = styled.div`
  width: 100%;
`

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d')
    const data = this.props.data

    let showLabels = data.length <= 10
    const labels = data.map(d => d.label)
    const ratings = data.map(d => d.value)

    const colors = ratings.map(r => {
      const R = (255 * (10 - r)) / 10
      const G = (255 * r) / 10
      return `rgba(${R}, ${G}, 0, 0.3)`
    })

    CanvasChart.defaults.global.defaultFontSize = 14
    var chart = new CanvasChart(ctx, {
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

  render() {
    return (
      <CanvasContainer>
        <canvas ref={this.canvas}></canvas>
      </CanvasContainer>
    )
  }
}

export default Chart