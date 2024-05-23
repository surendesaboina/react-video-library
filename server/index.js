var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var conString = "mongodb+srv://surendesaboina:Suren%40535@cluster0.zzz2gfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors(
    {
        origin :['https://react-video-library-client.vercel.app'],
        methods : ['POST','GET'],
        credentials : true
    }
));


app.get("/get-users", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblusers").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});


app.post("/register-user",(req, res)=>{

    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName, 
        Password: req.body.Password, 
        Email: req.body.Email, 
        Mobile: req.body.Mobile
    };

    mongoClient.connect(conString).then(clientObject=>{

        var database = clientObject.db("react-video-library");
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log('User Registered');
            res.end();
        });
    });

});

app.get("/get-admin", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-categories", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-videos", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-video/:id", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.post("/add-video", (req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").insertOne(video).then(()=>{
             console.log('Video Added Successfully..');
             res.end();
        })
    });
});

app.put("/edit-video/:id", (req, res)=>{

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
    }

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").updateOne({VideoId:id},{$set:video}).then(()=>{
            console.log(`Video Updated`);
            res.end();
        })
    });
});

app.delete("/delete-video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
            console.log(`Video Deleted`);
            res.end();
        })
    });
});

app.put("/update-like/:id/:like/:userId", (req, res) => {
    var videoId = parseInt(req.params.id);
    var like = req.params.like === 'true';
    var userId = req.params.userId;

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        var likeQuery = { VideoId: videoId, LikedBy: userId };
        database.collection("tblvideos").findOne(likeQuery).then(existingLike => {
            if (existingLike && like) {
                database.collection("tblvideos").updateOne(
                    { VideoId: videoId },
                    { $inc: { Likes: -1 }, $pull: { LikedBy: userId } }
                ).then(() => {
                    database.collection("tblvideos").findOne({ VideoId: videoId }).then(document => {
                        res.send(document);
                    });
                });
            } else {
                var updateQuery = like
                    ? { $inc: { Likes: 1 }, $addToSet: { LikedBy: userId } }
                    : { $inc: { Likes: -1 }, $pull: { LikedBy: userId } };

                database.collection("tblvideos").updateOne(
                    { VideoId: videoId },
                    updateQuery
                ).then(() => {
                    database.collection("tblvideos").findOne({ VideoId: videoId }).then(document => {
                        res.send(document);
                    });
                });
            }
        });
    });
});

app.put("/update-dislike/:id/:dislike/:userId", (req, res) => {
    var videoId = parseInt(req.params.id);
    var dislike = req.params.dislike === 'true';
    var userId = req.params.userId;

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        var dislikeQuery = { VideoId: videoId, DislikedBy: userId };
        database.collection("tblvideos").findOne(dislikeQuery).then(existingDislike => {
            if (existingDislike && dislike) {
                database.collection("tblvideos").updateOne(
                    { VideoId: videoId },
                    { $inc: { Dislikes: -1 }, $pull: { DislikedBy: userId } }
                ).then(() => {
                    database.collection("tblvideos").findOne({ VideoId: videoId }).then(document => {
                        res.send(document);
                    });
                });
            } else {
                var updateQuery = dislike
                    ? { $inc: { Dislikes: 1 }, $addToSet: { DislikedBy: userId } }
                    : { $inc: { Dislikes: -1 }, $pull: { DislikedBy: userId } };

                database.collection("tblvideos").updateOne(
                    { VideoId: videoId },
                    updateQuery
                ).then(() => {
                    database.collection("tblvideos").findOne({ VideoId: videoId }).then(document => {
                        res.send(document);
                    });
                });
            }
        });
    });
});

app.post("/add-comment", (req, res) => {
    var comment = {
        CommentId: req.body.CommentId,
        VideoId: parseInt(req.body.VideoId),
        CommentText: req.body.CommentText,
        UserId: req.body.UserId,
        Timestamp: new Date()
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblcomments").insertOne(comment).then(() => {
            console.log('Comment Added');
            res.end();
        });
    });
});

app.get("/get-comments/:videoId", (req, res) => {
    var videoId = parseInt(req.params.videoId);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblcomments").find({ VideoId: videoId }).toArray().then(comments => {
            res.send(comments);
            res.end();
        });
    });
});

app.get("/get-comments", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblcomments").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-videos/:category", (req, res) => {
    const category = req.params.category;
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        if (category === 'ALL') {
            database.collection("tblvideos").find({}).toArray().then(documents => {
                res.send(documents);
                res.end();
            });
        } else {
            database.collection("tblcategories").findOne({ CategoryName: category }).then(categoryDoc => {
                if (categoryDoc) {
                    database.collection("tblvideos").find({ CategoryId: categoryDoc.CategoryId }).toArray().then(documents => {
                        res.send(documents);
                        res.end();
                    });
                } else {
                    res.send([]);
                    res.end();
                }
            });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
