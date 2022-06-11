const url = 'https://api.thingspeak.com/channels/1747179/feeds.json?key=G47577QHO93IWHOU&results=1'

// AI plant voorspelling
let plantvoorspelling = window.localStorage.getItem("plant")
console.log(plantvoorspelling)

// sensor metingen
// sensor grondvocht meting
let grondvochtSensor  
// Temperatuur data
let temperatuurSensor  
// plant info array 
let perfectePlantSituatie = []
// minimale/maximale grondvocht waardes
let minimaleGrondvocht
let maximaleGrondvocht
// minimale/maximale grondvocht waardes
let minimaletemperatuur
let maximaletemperatuur


let plantDataLoaded = ""

// checks if there has been an update and prints message
let message = false


function getSensorData(){
    fetch(url)
    .then(response => response.json())
    .then(data => showSensorData(data))
}

function showSensorData(data){
    temperatuurSensor = data.feeds[0].field1;
    luchtvochtSensor = data.feeds[0].field2;
    grondvochtSensor = data.feeds[0].field3;

    console.log('Data van sensoren:')
    console.log(grondvochtSensor);
    console.log(temperatuurSensor);
    console.log(luchtvochtSensor);
    setTimeout(getSensorData, 10000);
    if (plantDataLoaded == false){
    loadPlantData()    
    }

    if (message == true) {
        meldingen()
    }
    
}


// // papa parse
function loadPlantData() {
    Papa.parse('./plantdata.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => searchPlant(results.data)
    })
}

// compare fetched sensor data with plant data
function searchPlant(data) {
    plantDataLoaded = true

    perfectePlantSituatie = []

    for (let plant of data) {
        if (plant.plantNaam === plantvoorspelling) {
            console.log("gevonden waarden uit CSV:")
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
        meldingen()
    }
}

// Message to user if no Bud has been connected yet
function noPlantsMessage() {
        let noPlants = document.createElement("p")
        let noPlantsTextBig = document.createTextNode("No plants have been added. ")
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
            message = true
            document.querySelector("#sensor-bud").innerHTML = "Bud 1: "
            console.log('alles gaat goed')
        } else if (grondvochtSensor >= minimaleGrondvocht && grondvochtSensor >= maximaleGrondvocht) {
            message = true
            document.querySelector("#sensor-bud").innerHTML = "Bud 1: "
            document.getElementById("vocht").innerHTML = "Je plant is aan het uitdrogen!";
            console.log('je plant is aan het uitdrogen')
        } else if (grondvochtSensor <= minimaleGrondvocht && grondvochtSensor <= maximaleGrondvocht) {
            message = true
            document.querySelector("#sensor-bud").innerHTML = "Bud 1: "
            document.getElementById("vocht").innerHTML = "Your soil is a bit too wet.";
            console.log("Je plant is te nat!")
        } else {
        noPlantsMessage()
            console.log('geen plant');
        }
    }
    let meldingTemperatuur = () => {
        if (temperatuurSensor >= minimaletemperatuur && temperatuurSensor <= maximaletemperatuur) {
            document.querySelector("#sensor-bud").innerHTML = "Bud 1: "
            message = true
            console.log('alles gaat goed')
        } else if (temperatuurSensor <= minimaletemperatuur && temperatuurSensor <= maximaletemperatuur) {
            message = true
            document.querySelector("#sensor-bud").innerHTML = "Bud 1: "
            document.getElementById("temp").innerHTML = "Je plant bevriest zo wat!";
            console.log('Je plant bevriest zowat!')
        } else if (temperatuurSensor >= minimaletemperatuur && temperatuurSensor >= maximaletemperatuur) {
            document.querySelector("#sensor-bud").innerHTML = "Bud 1: "
            message = true
            document.getElementById("temp").innerHTML = "Het is veeel te warm voor je plant!";
            console.log("Het is veeel te warm voor je plant. Verplaats je plant naar een koelere plek.")
        } else {
            console.log('geen plant');           
        }
    }
    document.querySelector("#naam").innerHTML = plantvoorspelling
    // document.querySelector("#naam").element.style.color = red
    console.log("grondvocht melding:")
    meldingGrondvocht();
    console.log('temperatuur melding:')
    meldingTemperatuur();
    // message = true
}

getSensorData();
window.localStorage.clear();
