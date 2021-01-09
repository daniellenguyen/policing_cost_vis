const fs = require('fs');

const writeJsonToFile = (json, filename) => {
    const stringified_coordinates = JSON.stringify(json)
    fs.writeFile(filename, stringified_coordinates, 'utf8', (error) => {
        console.error(error);
    })
}

const facesData = []
const numberOfFaces =  100 // number of people scraped from thispersondoesnotexist.com

// max # of faces to represent is 750 (Manchester, NH), so create an array of exactly that many
facesData.push({ image: 'citizen_photos/officer.png', diameter: 250})

// 700
for (var i = 0; i < 7; i++) {
    for (var j = 1; j <= numberOfFaces; j++) {
        const face = { image: `citizen_photos/person${j}.png`, diameter: 30 }
        facesData.push(face)
    }
}

// 50
for (var k = 1; k <= 50; k++) {
    const face = { image: `citizen_photos/person${k}.png`, diameter: 30 }
    facesData.push(face)
}

console.log(facesData.length)

writeJsonToFile(facesData, "faces_data.json")