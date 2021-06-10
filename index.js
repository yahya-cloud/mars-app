const API_KEY = 'bixNcnWbzD26WegtSYrR9W4LGIfjugOGNUyc3e01'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

const currentSolElement = document.querySelector('[data-current-sol]')
const currentDateElement = document.querySelector('[data-current-date]')
const currentTempHighElement = document.querySelector(
  '[data-current-temp-high]'
)
const currentTempLowElement = document.querySelector('[data-current-temp-low]')
const windSpeedElement = document.querySelector('[data-wind-speed]')
const windDirectionArrow = document.querySelector('[data-wind-direction-arrow]')

const unitToggle = document.querySelector('[data-unit-toggle]')
const metricRadio = document.querySelector('#cel')
const imperialRadio = document.querySelector('#fah')

const previousSolContainer = document.querySelector(
  '[data-previous-sol-container]'
)
const previousSolTemplate = document.querySelector(
  '[data-previous-sol-template]'
)

let selectedSolIndex

getWeather().then((sols) => {
  selectedSolIndex = sols.length - 1
  displaySelectedSol(sols)
  displayPreviousSol(sols)

  unitToggle.addEventListener('click', () => {
    let metricUnits = !metricRadio.checked
    metricRadio.checked = metricUnits
    imperialRadio.checked = !metricRadio.checked

    // displaySelectedSol(sols)
    // displayPreviousSol(sols)
    updateUnits()
  })

  metricRadio.addEventListener('click', () => {
    // displaySelectedSol(sols)
    // displayPreviousSol(sols)
    updateUnits()
  })
  imperialRadio.addEventListener('click', () => {
    // displaySelectedSol(sols)
    // displayPreviousSol(sols)
    updateUnits()
  })
})

function displaySelectedSol(sols) {
  const selectedSol = sols[selectedSolIndex]
  currentSolElement.textContent = selectedSol.sol
  currentDateElement.textContent = displayDate(selectedSol.date)
  currentTempHighElement.innerHTML = displayTemp(selectedSol.maxTemp)
  currentTempLowElement.textContent = displayTemp(selectedSol.minTemp)
  windSpeedElement.textContent = displaySpeed(selectedSol.windSpeed)
  windDirectionArrow.style.setProperty(
    '--direction',
    `${selectedSol.windDirectionDegrees}deg`
  )
}

function displayDate(date) {
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long' })
}

function displayTemp(temperature) {
  let returnTemp = temperature
  if (!isMetric()) {
    returnTemp = (temperature - 32) * (5 / 9)
  }
  return Math.round(returnTemp)
}

function displaySpeed(speed) {
  let returnSpeed = speed
  if (!isMetric()) {
    returnSpeed = speed / 1.609
  }
  return Math.round(returnSpeed)
}

function displayPreviousSol(sols) {
  previousSolContainer.innerHTML = ''

  sols.forEach((solData, index) => {
    const solContainer = previousSolTemplate.content.cloneNode(true)
    solContainer.querySelector('[data-sol]').textContent = solData.sol
    solContainer.querySelector('[data-date]').textContent = displayDate(
      solData.date
    )
    solContainer.querySelector('[data-temp-high]').textContent = displayTemp(
      solData.maxTemp
    )
    solContainer.querySelector('[data-temp-low]').textContent = displayTemp(
      solData.minTemp
    )
    solContainer
      .querySelector('[data-select-button]')
      .addEventListener('click', () => {
        selectedSolIndex = index
        displaySelectedSol(sols)
      })
    previousSolContainer.appendChild(solContainer)
  })
  const prevDay = document.querySelectorAll('.previous-day')

  prevDay.forEach((el, index) => {
    el.style.animation = `slideUpIn  1.5s forwards`
    el.style.animationDelay = `${index * 125}ms`
  })
}

function updateUnits() {
  const speedUnits = document.querySelector('[data-speed-unit]')
  const tempUnits = document.querySelectorAll('[data-temp-unit]')

  speedUnits.innerHTML = isMetric() ? 'kph' : 'mph'

  tempUnits.forEach((unit) => {
    console.log(unit)
    unit.innerHTML = isMetric() ? 'C' : 'F'
  })
}

function isMetric() {
  return metricRadio.checked
}

async function getWeather() {
  try {
    alert(
      'Because the nasa insight weather Mission have ended few months before hance the api used in this app is not working '
    )
    const result = await fetch(API_URL)
    const data = await result.json()
    const { sol_keys, validity_checks, ...solData } = data

    return Object.entries(validity_checks).map(([sol, data]) => {
      return {
        sol: sol,
        maxTemp: data.AT.mx,
        minTemp: data.AT.mn,
        windSpeed: data.HWS.av,
        windDirectionDegrees: 0,
        windDirectionCardinal: 0,
        date: new Date(data.Last_UTC),
      }
    })
  } catch (err) {
    console.log(err)
  }
}
