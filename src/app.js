const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request = require("request")
const foreCast = require("./utils/forecast")
const geoCode = require("./utils/geocode")
const app = express()

//Define paths for express config
const publicDirectory = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//Setup handlbar engine and views location
app.set('view engine', 'hbs')
app.set("views",viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get("/",(req,res)=>{
    //2nd argument is object that contains all the values you want the view to access
    res.render("index", {
        title: "Weather",
        name: "Mike Jones"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Page",
        name: "Mike Jones"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{message:"Help Me Get Through",
                title: "Help",
                name:"Mike Jones"})
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a valid address"
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        foreCast(latitude, longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
                res.send({ forecast:forecastData,
                            location,
                            address:req.query.address})

        })
    })
    

    // res.send({
    //     forecast:"It's sunny",
    //     location:"Ontario",
    //     address:req.query.address
    // })
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        //return key stops function execution of the after the "IF-block"
       return  res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)


    res.send({
        products:[]
    })
})


app.get("/help/*",(req,res)=>{
    res.render("page404",{errorMessage:"Help article not found",
                    title: "help-404 page",
                    name:"Mike Jones"})
})

app.get("*",(req,res)=>{
    res.render("page404",{errorMessage:"404 Page Not Found",
    title: "Page Not Found",
    name:"Mike Jones"})
})


app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})