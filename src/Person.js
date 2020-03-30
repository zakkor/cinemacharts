import React from 'react'
import styled from 'styled-components'
import CanvasChart from 'chart.js'
import './Person.css'

const data = [{"title":"Spiral","year":-1,"rating":-1},{"title":"The Asset","year":-1,"rating":-1},{"title":"Untitled Grumpy Old Men Project","year":-1,"rating":-1},{"title":"The Blob","year":-1,"rating":-1},{"title":"Untitled Hitman Project","year":-1,"rating":-1},{"title":"Afro Samurai","year":-1,"rating":-1},{"title":"Mixed Blood","year":-1,"rating":-1},{"title":"Running Wild","year":-1,"rating":-1},{"title":"Be the Ball","year":-1,"rating":-1},{"title":"Man That Rocks the Cradle","year":-1,"rating":-1},{"title":"Untitled Andrew Mwangura Project","year":-1,"rating":-1},{"title":"East Texas Hot Links","year":-1,"rating":-1},{"title":"Blazing Samurai","year":2021,"rating":-1},{"title":"The Banker","year":2020,"rating":7.1},{"title":"The Hitman's Wife's Bodyguard","year":2020,"rating":-1},{"title":"Star Wars: Episode IX - The Rise of Skywalker","year":2019,"rating":6.8},{"title":"Avengers: Endgame","year":2019,"rating":8.4},{"title":"Spider-Man: Far from Home","year":2019,"rating":7.5},{"title":"Captain Marvel","year":2019,"rating":6.9},{"title":"Glass","year":2019,"rating":6.7},{"title":"Shaft","year":2019,"rating":6.4},{"title":"The Last Full Measure","year":2019,"rating":6.5},{"title":"QT8: The First Eight","year":2019,"rating":7.3},{"title":"Avengers: Infinity War","year":2018,"rating":8.5},{"title":"Incredibles 2","year":2018,"rating":7.6},{"title":"Life Itself","year":2018,"rating":6.8},{"title":"Quincy","year":2018,"rating":7.6},{"title":"Eating You Alive","year":2018,"rating":8.1},{"title":"Kingsman: The Golden Circle","year":2017,"rating":6.7},{"title":"xXx: Return of Xander Cage","year":2017,"rating":5.2},{"title":"Kong: Skull Island","year":2017,"rating":6.6},{"title":"The Hitman's Bodyguard","year":2017,"rating":6.9},{"title":"Unicorn Store","year":2017,"rating":5.5},{"title":"Miracle on 42nd Street","year":2017,"rating":8.2},{"title":"The Legend of Tarzan","year":2016,"rating":6.2},{"title":"Miss Peregrine's Home for Peculiar Children","year":2016,"rating":6.7},{"title":"Cell","year":2016,"rating":4.3},{"title":"I Am Not Your Negro","year":2016,"rating":7.8},{"title":"Avengers: Age of Ultron","year":2015,"rating":7.3},{"title":"The Hateful Eight","year":2015,"rating":7.8},{"title":"Barely Lethal","year":2015,"rating":5.4},{"title":"Hardcore Henry","year":2015,"rating":6.7},{"title":"Chi-Raq","year":2015,"rating":5.7},{"title":"Kingsman: The Secret Service","year":2014,"rating":7.7},{"title":"Captain America: The Winter Soldier","year":2014,"rating":7.7},{"title":"RoboCop","year":2014,"rating":6.1},{"title":"Reasonable Doubt","year":2014,"rating":5.7},{"title":"Big Game","year":2014,"rating":5.4},{"title":"Kite","year":2014,"rating":4.4},{"title":"Life's Essentials with Ruby Dee","year":2014,"rating":8.5},{"title":"Face of Unity","year":2014,"rating":7.3},{"title":"Oldboy","year":2013,"rating":5.7},{"title":"Turbo","year":2013,"rating":6.4},{"title":"Django Unchained","year":2012,"rating":8.4},{"title":"The Avengers","year":2012,"rating":8},{"title":"The Samaritan","year":2012,"rating":5.6},{"title":"Meeting Evil","year":2012,"rating":5.3},{"title":"Adventures in Zambezia","year":2012,"rating":5.8},{"title":"Quentin Tarantino: 20 Years of Filmmaking","year":2012,"rating":6.3},{"title":"The Avengers Assemble Premiere","year":2012,"rating":7.5},{"title":"Captain America: The First Avenger","year":2011,"rating":6.9},{"title":"Thor","year":2011,"rating":7},{"title":"African Cats","year":2011,"rating":7.6},{"title":"I Ain't Scared of You: A Tribute to Bernie Mac","year":2011,"rating":8.3},{"title":"Young Jeezy: A Hustlerz Ambition","year":2011,"rating":4.9},{"title":"The Other Guys","year":2010,"rating":6.6},{"title":"Iron Man 2","year":2010,"rating":7},{"title":"Unthinkable","year":2010,"rating":7.1},{"title":"Quantum Quest: A Cassini Space Odyssey","year":2010,"rating":4.9},{"title":"With Great Power: The Stan Lee Story","year":2010,"rating":7.2},{"title":"A Backyard Story","year":2010,"rating":8},{"title":"In the Land of the Free...","year":2010,"rating":7.3},{"title":"On the Shoulders of Giants: The Story of the Greatest Team You Never Heard Of","year":2010,"rating":6.8},{"title":"The Start of Dreams","year":2010,"rating":9.2},{"title":"Inglourious Basterds","year":2009,"rating":8.3},{"title":"Mother and Child","year":2009,"rating":7.2},{"title":"Astro Boy","year":2009,"rating":6.3},{"title":"Iron Man","year":2008,"rating":7.9},{"title":"Jumper","year":2008,"rating":6.1},{"title":"Star Wars: The Clone Wars","year":2008,"rating":5.9},{"title":"The Spirit","year":2008,"rating":4.8},{"title":"Lakeview Terrace","year":2008,"rating":6.1},{"title":"Soul Men","year":2008,"rating":6.4},{"title":"Gospel Hill","year":2008,"rating":5.4},{"title":"1408","year":2007,"rating":6.8},{"title":"Cleaner","year":2007,"rating":6.1},{"title":"Resurrecting the Champ","year":2007,"rating":6.7},{"title":"Alexis Arquette: She's My Brother","year":2007,"rating":6.9},{"title":"The 100 Best Black Movies (Ever)","year":2007,"rating":5},{"title":"Bienvenue à Cannes","year":2007,"rating":6.1},{"title":"Black Snake Moan","year":2006,"rating":6.9},{"title":"Snakes on a Plane","year":2006,"rating":5.4},{"title":"Home of the Brave","year":2006,"rating":5.6},{"title":"Freedomland","year":2006,"rating":5.1},{"title":"Farce of the Penguins","year":2006,"rating":4.1},{"title":"Star Wars: Episode III - Revenge of the Sith","year":2005,"rating":7.5},{"title":"Coach Carter","year":2005,"rating":7.3},{"title":"xXx: State of the Union","year":2005,"rating":4.4},{"title":"The Man","year":2005,"rating":5.6},{"title":"The Incredibles","year":2004,"rating":8},{"title":"Kill Bill: Vol. 2","year":2004,"rating":8},{"title":"Twisted","year":2004,"rating":5.3},{"title":"In My Country","year":2004,"rating":6},{"title":"My Date with Drew","year":2004,"rating":6.4},{"title":"Unforgivable Blackness: The Rise and Fall of Jack Johnson","year":2004,"rating":8.3},{"title":"The N Word","year":2004,"rating":6.2},{"title":"S.W.A.T.","year":2003,"rating":6},{"title":"Basic","year":2003,"rating":6.5},{"title":"Unchained Memories: Readings from the Slave Narratives","year":2003,"rating":8},{"title":"Star Wars: Episode II - Attack of the Clones","year":2002,"rating":6.5},{"title":"xXx","year":2002,"rating":5.9},{"title":"Changing Lanes","year":2002,"rating":6.4},{"title":"No Good Deed","year":2002,"rating":5.5},{"title":"Formula 51","year":2001,"rating":6.3},{"title":"The Caveman's Valentine","year":2001,"rating":5.8},{"title":"Unbreakable","year":2000,"rating":7.3},{"title":"Shaft","year":2000,"rating":5.9},{"title":"Rules of Engagement","year":2000,"rating":6.4},{"title":"Star Wars: Episode I - The Phantom Menace","year":1999,"rating":6.5},{"title":"Deep Blue Sea","year":1999,"rating":5.8},{"title":"Out of Sight","year":1998,"rating":7},{"title":"Sphere","year":1998,"rating":6.1},{"title":"The Negotiator","year":1998,"rating":7.3},{"title":"The Red Violin","year":1998,"rating":7.6},{"title":"Waking in Mississippi","year":1998,"rating":8.4},{"title":"Jackie Brown","year":1997,"rating":7.5},{"title":"Eve's Bayou","year":1997,"rating":7.3},{"title":"One Eight Seven","year":1997,"rating":6.7},{"title":"Off the Menu: The Last Days of Chasen's","year":1997,"rating":6.8},{"title":"A Time to Kill","year":1996,"rating":7.5},{"title":"The Long Kiss Goodnight","year":1996,"rating":6.8},{"title":"Hard Eight","year":1996,"rating":7.2},{"title":"The Great White Hype","year":1996,"rating":5.5},{"title":"Trees Lounge","year":1996,"rating":7.1},{"title":"Die Hard with a Vengeance","year":1995,"rating":7.6},{"title":"Kiss of Death","year":1995,"rating":5.9},{"title":"Losing Isaiah","year":1995,"rating":6.4},{"title":"Fluke","year":1995,"rating":6.7},{"title":"Pulp Fiction","year":1994,"rating":8.9},{"title":"The Search for One-eye Jimmy","year":1994,"rating":6.2},{"title":"Fresh","year":1994,"rating":7.6},{"title":"Hail Caesar","year":1994,"rating":3.2},{"title":"The New Age","year":1994,"rating":5.6},{"title":"Jurassic Park","year":1993,"rating":8.1},{"title":"True Romance","year":1993,"rating":7.9},{"title":"Menace II Society","year":1993,"rating":7.5},{"title":"Loaded Weapon 1","year":1993,"rating":6.2},{"title":"Amos \u0026 Andrew","year":1993,"rating":5.7},{"title":"Patriot Games","year":1992,"rating":6.9},{"title":"Juice","year":1992,"rating":7.1},{"title":"White Sands","year":1992,"rating":6},{"title":"Fathers \u0026 Sons","year":1992,"rating":4.9},{"title":"Jungle Fever","year":1991,"rating":6.5},{"title":"Johnny Suede","year":1991,"rating":5.8},{"title":"Strictly Business","year":1991,"rating":5.4},{"title":"Jumpin' at the Boneyard","year":1991,"rating":6},{"title":"Goodfellas","year":1990,"rating":8.7},{"title":"The Exorcist III","year":1990,"rating":6.4},{"title":"Mo' Better Blues","year":1990,"rating":6.6},{"title":"A Shock to the System","year":1990,"rating":6.7},{"title":"Betsy's Wedding","year":1990,"rating":5.6},{"title":"Def by Temptation","year":1990,"rating":4.6},{"title":"The Return of Superfly","year":1990,"rating":4.7},{"title":"Do the Right Thing","year":1989,"rating":7.9},{"title":"Sea of Love","year":1989,"rating":6.8},{"title":"Coming to America","year":1988,"rating":7},{"title":"School Daze","year":1988,"rating":6},{"title":"Eddie Murphy: Raw","year":1987,"rating":7.7},{"title":"Magic Sticks","year":1987,"rating":5.1},{"title":"Ragtime","year":1981,"rating":7.3},{"title":"The Exterminator","year":1980,"rating":5.7},{"title":"Together for Days","year":1973,"rating":6.9}].filter(e => e.rating>0).reverse()

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin: 0 auto;
`

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d')
    const labels = data.map(e => e.title)
    const ratings = data.map(e => e.rating)
    new CanvasChart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rating',
          data: ratings,
          lineTension: 0,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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

function Person(props) {
  // TODO: fetch from server
  props = {
    name: "Robert De Niro",
    profession: "Actor",
  }
  return (
    <div>
      <h1>{props.name}</h1>
      <p> {props.profession} </p>
      <hr></hr>
      <Chart category="Movies" />
    </div>
  )
}

export default Person