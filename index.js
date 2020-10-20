const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware
app.use(express.urlencoded({extend: false}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dinosaurs', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    //handle a aquery string if there is one
    let nameFilter = req.query.nameFilter
    if(nameFilter) { //reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore string case)
        dinoData = dinoData.filter(dino=> {
           return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dino-index.ejs', {dinosaurs: dinoData})
})

app.get('/dinosaurs/new', (req, res) => {
    res.render('new.ejs')
})

// -----> Dino Show Route <-----
app.get('/dinosaurs/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)
    
    res.render('show-dino.ejs', {dino: dinoData[dinoIndex], dinoID: dinoIndex})
})

// -----> Dino Show Route <-----
app.post('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) //push the new dino to the array
    //save the new dinoData array to the dinosaurs.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

// -----> PREHISTORIC CREATURES <-----

app.get('/prehistoric_creatures', (req, res) => {
    let preHistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(preHistCreatures)
    
    res.render('creature-index.ejs', {creatures: creatureData})
})

app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('new-creature.ejs')
})

app.get('/prehistoric_creatures/:idx', (req, res) => {
    let preHistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(preHistCreatures)

    //get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)
    
    res.render('show-creature.ejs', {creature: creatureData[creatureIndex], creatureID: creatureIndex})
})

// -----> PREHISTORIC Show Route <-----
app.post('/prehistoric_creatures', (req, res) => {
    let preHistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(preHistCreatures)
    creatureData.push(req.body) //push the new dino to the array
    //save the new dinoData array to the dinosaurs.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric_creatures')
})

app.listen(8000, ()=> {
    console.log('You are listening on port 8000')
})