// AI plant voorspelling
var plantvoorspelling= "aloeVera"

// plant info array 
var perfectePlantSituatie = [60, 23]

// Grondvocht data
// sensor grondvocht meting
var grondvocht = 15
// minimale/maximale grondvocht waardes
var minimaleGrondvocht = perfectePlantSituatie[0] - 3
var maximaleGrondvocht = perfectePlantSituatie[0] + 3

// Temperatuur data
// sensor temperatuur meting
var temperatuur  = 30
// minimale/maximale grondvocht waardes
var minimaleTemperatuur = perfectePlantSituatie[1] - 3
var maximaleTemperatuur = perfectePlantSituatie[1] + 3


// // papa parse
// function loadData() {
//     Papa.parse('./plantdata.csv', {
//         download: true,
//         header: true,
//         dynamicTyping: true,
//         complete: results => fetchPlantdata(results.data)
//     })
// }


// Functies voor meldingen aanroepen
function meldingGrondvocht() {
    if ((grondvocht >= minimaleGrondvocht) && (grondvocht <= maximaleGrondvocht)) {
    } else if ((grondvocht <= minimaleGrondvocht) && (grondvocht <= maximaleGrondvocht)) {
        console.log("Je plant is aan het uitdrogen!")
    } else if ((grondvocht >= minimaleGrondvocht) && (grondvocht >= maximaleGrondvocht)) {
        console.log("Je plant is te nat!")
    } else console.log("Voeg een plant toe")
    }
meldingGrondvocht();


function meldingTemperatuur() {
    if ((temperatuur >= minimaleTemperatuur) && (temperatuur <= maximaleTemperatuur)) {
    } else if ((temperatuur <= minimaleTemperatuur) && (temperatuur <= maximaleTemperatuur)) {
        console.log("Je plant bevriest zo wat!")
    } else if ((temperatuur >= minimaleTemperatuur) && (temperatuur >= maximaleTemperatuur)) {
        console.log("Het is veeel te warm voor je plant!")
    } else console.log("Voeg een plant toe")
    }
meldingTemperatuur();


