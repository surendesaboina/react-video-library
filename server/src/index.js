// var express = require("express");
// var mongoClient = require("mongodb").MongoClient;
// var cors = require("cors");

// // var conString = "mongodb://127.0.0.1:27017";
// // var conString = "mongodb+srv://surendesaboina:Suren%40535@cluster0.zzz2gfz.mongodb.net/";
// var conString = "mongodb+srv://surendesaboina:Suren%40535@cluster0.zzz2gfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// var app = express();
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// // here
// app.use(cors(
//     {
//         origin :['https://react-video-library-client.vercel.app'],
//         methods : ['POST','GET'],
//         credentials : true
//     }
// ));


// app.get("/get-users", (req, res)=>{
//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblusers").find({}).toArray().then(documents=>{
//              res.send(documents);
//              res.end();
//         });
//     });
// });


// app.post("/register-user",(req, res)=>{

//     var user = {
//         UserId: req.body.UserId,
//         UserName: req.body.UserName, 
//         Password: req.body.Password, 
//         Email: req.body.Email, 
//         Mobile: req.body.Mobile
//     };

//     mongoClient.connect(conString).then(clientObject=>{

//         var database = clientObject.db("react-video-library");
//         database.collection("tblusers").insertOne(user).then(()=>{
//             console.log('User Registered');
//             res.end();
//         });
//     });

// });

// app.get("/get-admin", (req, res)=>{
//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tbladmin").find({}).toArray().then(documents=>{
//              res.send(documents);
//              res.end();
//         });
//     });
// });

// app.get("/get-categories", (req, res)=>{
//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblcategories").find({}).toArray().then(documents=>{
//              res.send(documents);
//              res.end();
//         });
//     });
// });

// app.get("/get-videos", (req, res)=>{
//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblvideos").find({}).toArray().then(documents=>{
//              res.send(documents);
//              res.end();
//         });
//     });
// });

// app.get("/get-video/:id", (req, res)=>{
//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
//              res.send(documents);
//              res.end();
//         });
//     });
// });

// app.post("/add-video", (req, res)=>{

//     var video = {
//         VideoId: parseInt(req.body.VideoId),
//         Title: req.body.Title,
//         Url: req.body.Url,
//         Description: req.body.Description,
//         Likes: parseInt(req.body.Likes),
//         Dislikes: parseInt(req.body.Dislikes),
//         Views: parseInt(req.body.Views),
//         CategoryId: parseInt(req.body.CategoryId)
//     }

//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblvideos").insertOne(video).then(()=>{
//              console.log('Video Added Successfully..');
//              res.end();
//         })
//     });
// });

// app.put("/edit-video/:id", (req, res)=>{

//     var id = parseInt(req.params.id);

//     var video = {
//         VideoId: parseInt(req.body.VideoId),
//         Title: req.body.Title,
//         Url: req.body.Url,
//         Description: req.body.Description,
//         Likes: parseInt(req.body.Likes),
//         Dislikes: parseInt(req.body.Dislikes),
//         Views: parseInt(req.body.Views),
//         CategoryId: parseInt(req.body.CategoryId)
//     }

//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblvideos").updateOne({VideoId:id},{$set:video}).then(()=>{
//             console.log(`Video Updated`);
//             res.end();
//         })
//     });
// });

// app.delete("/delete-video/:id", (req, res)=>{

//     var id = parseInt(req.params.id);

//     mongoClient.connect(conString).then(clientObject=>{
//         var database = clientObject.db("react-video-library");
//         database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
//             console.log(`Video Deleted`);
//             res.end();
//         })
//     });
// });


// app.listen(3030);
// console.log(`Server Started : https://react-video-library-client.vercel.app`);

var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var conString = "mongodb+srv://surendesaboina:Suren%40535@cluster0.zzz2gfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'https://react-video-library-client.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://react-video-library-client.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).json({});
    }
    next();
});

app.get("/get-users", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblusers").find({}).toArray().then(documents => {
            res.send(documents);
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to register user
app.post("/register-user", (req, res) => {
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblusers").insertOne(user).then(() => {
            console.log('User Registered');
            res.end();
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to get admin
app.get("/get-admin", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tbladmin").find({}).toArray().then(documents => {
            res.send(documents);
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to get categories
app.get("/get-categories", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblcategories").find({}).toArray().then(documents => {
            res.send(documents);
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to get videos
app.get("/get-videos", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({}).toArray().then(documents => {
            res.send(documents);
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to get a specific video by ID
app.get("/get-video/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({ VideoId: parseInt(req.params.id) }).toArray().then(documents => {
            res.send(documents);
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to add a video
app.post("/add-video", (req, res) => {
    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").insertOne(video).then(() => {
            console.log('Video Added Successfully.');
            res.end();
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to edit a video by ID
app.put("/edit-video/:id", (req, res) => {
    var id = parseInt(req.params.id);

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").updateOne({ VideoId: id }, { $set: video }).then(() => {
            console.log(`Video Updated`);
            res.end();
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

// Endpoint to delete a video by ID
app.delete("/delete-video/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").deleteOne({ VideoId: id }).then(() => {
            console.log(`Video Deleted`);
            res.end();
            clientObject.close();
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
            clientObject.close();
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });
});

app.listen(3030, () => {
    console.log(`Server Started: http://localhost:3030`);
});
