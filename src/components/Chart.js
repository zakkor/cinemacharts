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

    const labels = this.props.movies.map(e => {
      return e.title + ` (${e.year.toString()})`
    })
    let showLabels = false
    if (this.props.movies.length <= 10) {
      showLabels = true
    }

    const ratings = this.props.movies.map(e => e.rating)

    let colors = []
    for (let i = 0; i < this.props.movies.length; i++) {
      const r = this.props.movies[i].rating
      const R = (255 * (10 - r)) / 10
      const G = (255 * r) / 10
      colors.push(`rgba(${R}, ${G}, 0, 0.3)`)
    }

    CanvasChart.defaults.global.defaultFontSize = 14
    new CanvasChart(ctx, {
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