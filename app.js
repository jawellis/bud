let plantvoorspelling = window.localStorage.getItem("plant")
console.log(plantvoorspelling)

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

// compare fetched sensor data with plant data
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

    // checks if plant is in CSV
    if (perfectePlantSituatie.length == 0) {
        console.log("plant niet gevonden in CSV")

    } else {
        console.log("meldingen :")
        meldingen()
    }
}

// Message to user if no Bud has been connected yet
function noPlantsMessage() {
    let noPlants = document.createElement("p")
        let noPlantsTextBig = document.createTextNode("No plants have been added.")
        let noPlantsText = document.createTextNode( "Click the button below to add a plant")
        noPlants.appendChild(noPlantsText)
        let noPlantsDiv = document.getElementById("no-plants")
        noPlantsDiv.appendChild(noPlantsTextBig)
        noPlantsDiv.appendChild(noPlantsText)
}

// Data output for user
function meldingen() {
    let meldingGrondvocht = () => {
        if (grondvochtSensor >= minimaleGrondvocht && grondvochtSensor <= maximaleGrondvocht) {
            console.log('alles gaat goed')
        } else if (grondvochtSensor <= minimaleGrondvocht && grondvochtSensor <= maximaleGrondvocht) {
            document.getElementById("vocht").innerHTML = "Je plant is aan het uitdrogen!";
        } else if (grondvochtSensor >= minimaleGrondvocht && grondvochtSensor >= maximaleGrondvocht) {
            document.getElementById("vocht").innerHTML = "Je plant is te nat!";
        } else {
        noPlantsMessage();
            console.log('geen plant');
        }
    }
    let meldingTemperatuur = () => {
        if (temperatuurSensor >= minimaletemperatuur && temperatuurSensor <= maximaletemperatuur) {
            console.log('alles gaat goed')
        } else if (temperatuurSensor <= minimaletemperatuur && temperatuurSensor <= maximaletemperatuur) {
            document.getElementById("temp").innerHTML = "Je plant bevriest zo wat!";
        } else if (temperatuurSensor >= minimaletemperatuur && temperatuurSensor >= maximaletemperatuur) {
            document.getElementById("temp").innerHTML = "Het is veeel te warm voor je plant!";
        } else {
            console.log('geen plant');
        }
    }
    // let bud = () => {
    //     let bud = document.createElement("h3")
    //     let budName = document.createTextNode("Bud 1: ")
    //     bud.appendChild(budName)
    //     let budNameTitle = document.getElementById("sensor-bud")
    //     budNameTitle.appendChild(budName)
    // }
    document.querySelector("#naam").innerHTML = plantvoorspelling
    meldingGrondvocht();
    meldingTemperatuur();
}


loadData()
window.localStorage.clear();
