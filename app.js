// AI plant voorspelling
let plantvoorspelling= "monstera"

// sensor metingen
// sensor grondvocht meting
let grondvochtSensor = 70
// Temperatuur data
let temperatuurSensor  = 30
// plant info array 
let perfectePlantSituatie = []
// minimale/maximale grondvocht waardes
let minimaleGrondvocht = perfectePlantSituatie[0] - 3
let maximaleGrondvocht = perfectePlantSituatie[0] + 3
// minimale/maximale grondvocht waardes
let minimaletemperatuur = perfectePlantSituatie[1] - 3
let maximaletemperatuur = perfectePlantSituatie[1] + 3


// // papa parse
function loadData() {
     Papa.parse('./plantdata.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => logResults(results.data)
    })
}

function logResults(data){

    for(let plant of data){
        if(plant.plantNaam === plantvoorspelling){
           
            perfectePlantSituatie = [plant.grondvocht, plant.temperatuur]

            console.log(plant.grondvocht)
            console.log(plant.temperatuur)
            console.log(perfectePlantSituatie)
        }
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


    
meldingen();
loadData();

