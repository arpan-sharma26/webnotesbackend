require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());







app.get("/", (req, res) => {
    res.json("Hello");  
});

app.listen(PORT, () => {
    console.log("Server running on Port: " + PORT);
});







// get all notes
app.get("/api/notes", async (req, res) => {
    try {
        const data = await Notes.find({});
        if(!data){
            throw new Error("An error occured while fetching notes.");
        };
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({error: "An error occured while fetching notes."})
    }
});


// get note by ID
app.get("/api/notes/:id", async (req, res) => {
    try {
        const noteID = req.params.id;
        const data = await Notes.findById(noteID);
        if (!data) {
            throw new Error("An error occured while fetching notes.");
        }
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({error: "An error occured while fetching notes."})
    }
});


// post notes
app.post("/api/notes", async (req, res) => {
    try {
        const {title, description} = req.body;
        // let obj = {
        //     title: "Get Hard Disk",
        //     description: "1TB Seagate HardDisk"
        // };
        let data = Notes.create({title, description});
        if(!data){
            throw new Error("An error has been occured while posting the notes");
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error: "An error occured while posting notes."});
    }
});

// update notes
app.put("/api/notes/:id", async (req, res) => {
    try {
        const noteID = req.params.id;
        const {title, description} = req.body;
        // let obj = {
        //     title: "new hard disk",
        //     description: "2 TB Storage Space"
        // };
        const data = await Notes.findByIdAndUpdate(noteID, {title, description});

        if(!data){
            throw new Error("An error occured while updating notes.");
        }else{
            res.status(201).json(data);
        }
    } catch (error) {
        res.status(500).json({error: "An error occured while updating notes."})
    }
});

// Delete a note:
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const noteID = req.params.id;
        const data = await Notes.findByIdAndDelete(noteID);
        if (!data) {
            throw new Error("An error occured while deleting the note.");
        } else {
            console.log("note deleted");
            res.status(201).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: "An error occured while deleting a note." });
    }
});