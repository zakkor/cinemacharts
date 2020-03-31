import React from 'react'
import styled from 'styled-components'
import CanvasChart from 'chart.js'

const CanvasContainer = styled.div`
  position: relative;
  width: 85%;
  max-width: 2380px;
  margin: 0 auto;
`

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d')
    const labels = this.props.movies.map(e => e.title)
    const ratings = this.props.movies.map(e => e.rating)

    let colors = []

    for (let i = 0; i < this.props.movies.length; i++) {
      const r = this.props.movies[i].rating
      const R = (255 * (10 - r)) / 10
      const G = (255 * r) / 10
      colors.push(`rgba(${R}, ${G}, 0, 0.3)`)
    }

    CanvasChart.defaults.global.defaultFontSize = 16
    new CanvasChart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rating',
          data: ratings,
          lineTension: 0,
          backgroundColor: colors,
          // borderColor: 'rgba(67, 145, 214, 0.8)',
          // pointBorderColor: 'rgba(67, 145, 214, 0.8)',
          // pointBackgroundColor: 'rgba(67, 145, 214, 0.8)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 10,
              beginAtZero: true
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