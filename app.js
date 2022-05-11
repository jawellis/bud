// AI plant voorspelling
let plantvoorspelling = "aloeVera"

// sensor metingen
// sensor grondvocht meting
let grondvochtSensor = 70
// Temperatuur data
let temperatuurSensor = 30
// plant info array 
let perfectePlantSituatie = []
// minimale/maximale grondvocht waardes
let minimaleGrondvocht
let maximaleGrondvocht
// minimale/maximale grondvocht waardes
let minimaletemperatuur
let maximaletemperatuur


// // papa parse
function loadData() {
    Papa.parse('./plantdata.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => searchPlant(results.data)
    })
}

function searchPlant(data) {

    perfectePlantSituatie = []

    for (let plant of data) {
        if (plant.plantNaam === plantvoorspelling) {
            console.log("gevonden waarden:")
            console.log(plant.grondvocht)
            console.log(plant.temperatuur)

            perfectePlantSituatie = [plant.grondvocht, plant.temperatuur]
            minimaleGrondvocht = perfectePlantSituatie[0] - 3
            maximaleGrondvocht = perfectePlantSituatie[0] + 3
            // minimale/maximale grondvocht waardes
            minimaletemperatuur = perfectePlantSituatie[1] - 3
            maximaletemperatuur = perfectePlantSituatie[1] + 3
        }
    }

    if (perfectePlantSituatie.length == 0) {
        console.log("plant niet gevonden in CSV")
    } else {
        console.log("meldingen :")
        meldingen()
    }

}



// Functies voor meldingen aanroepen
function meldingGrondvocht() {
    if (grondvochtSensor >= minimaleGrondvocht && grondvochtSensor <= maximaleGrondvocht) {
    } else if (grondvochtSensor <= minimaleGrondvocht && grondvochtSensor <= maximaleGrondvocht) {
        console.log("Je plant is aan het uitdrogen!")
    } else if (grondvochtSensor >= minimaleGrondvocht && grondvochtSensor >= maximaleGrondvocht) {
        console.log("Je plant is te nat!")
    } else console.log("Voeg een plant toe")
}

function meldingTemperatuur() {
    if (temperatuurSensor >= minimaletemperatuur && temperatuurSensor <= maximaletemperatuur) {
    } else if (temperatuurSensor <= minimaletemperatuur && temperatuurSensor <= maximaletemperatuur) {
        console.log("Je plant bevriest zo wat!")
    } else if (temperatuurSensor >= minimaletemperatuur && temperatuurSensor >= maximaletemperatuur) {
        console.log("Het is veeel te warm voor je plant!")
    } else console.log("Voeg een plant toe")
}

function meldingen() {
    meldingGrondvocht()
    meldingTemperatuur()
}



loadData()