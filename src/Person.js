import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CanvasChart from 'chart.js'
import './Person.css'

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin: 0 auto;
`

class Chart extends React.Component {
  constructor(props) {
    super(props)
    console.log('props:', props);
    
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d')
    const labels = this.props.movies.map(e => e.title)
    const ratings = this.props.movies.map(e => e.rating)

    let colorsOpaque = []
    let colorsTransp = []

    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max))
    }

    for (let i = 0; i < this.props.movies.length; i++) {
      const r = getRandomInt(256)
      const g = getRandomInt(256)
      const b = getRandomInt(256)
      colorsTransp.push(`rgba(${r}, ${g}, ${b}, 0.2)`)
      colorsOpaque.push(`rgba(${r}, ${g}, ${b}, 1)`)
    }

    new CanvasChart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rating',
          data: ratings,
          lineTension: 0,
          backgroundColor: colorsTransp,
          borderColor: colorsTransp,
          pointBorderColor: colorsTransp,
          pointBackgroundColor: colorsOpaque,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

  render() {
    return (
      <div>
        <h3>{this.props.category}</h3>
        <CanvasContainer>
          <canvas className="chart" ref={this.canvas}></canvas>
        </CanvasContainer>
      </div>
    )
  }
}


const Person = props => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/person/${props.id}`)
      const data = await res.json()
      console.log('data.movies:', data.movies);
      console.log('setting now')
      setMovies(data.movies)
    }
    fetchData()
  }, [props.id])

  if (movies.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Chart movies={movies}></Chart>
    </div>
  )
}

export default Person