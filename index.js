const express = require('express');
const mongoose = require('mongoose');
const cors = require ("cors");
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User.js');
const Staff = require('./models/Staff.js');
const File = require('./models/File.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const zip = require('express-zip');
const admzip = require('adm-zip');

const app = express();
app.use(cookieParser());
const bcryptSalt= bcrypt.genSaltSync(10);
const jwtSecret = 'GoddidGoddidGoddidGoddid';
const mongourl = 'mongodb+srv://calebjrbako1231:'+process.env.MONGO_URL+'@repo.63afe5w.mongodb.net/'

app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    optionSuccessStatus:200,
}));
console.log("sever connected");
mongoose.connect(mongourl);

app.get('/test',(req,res) => {
    res.json('test ok boy');
});

//Register
app.post('/register', async(req,res) => {
    const{name,email,location,pass,stats,role}=req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            location,
            pass:bcrypt.hashSync(pass,bcryptSalt),
            stats,
            role,
        })
        res.json({userDoc});
    }catch(e){
        res.status(422).json(e);
    }

});

//Login
app.post('/login', async(req,res)=>{
    const{email,pass} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const verDoc = userDoc.stats;
        if(verDoc === "verified") {
            const passOk = bcrypt.compareSync(pass, userDoc.pass);
            if(passOk){
                jwt.sign({email:userDoc.email, 
                    id:userDoc._id, 
                    }, 
                    jwtSecret, 
                    {}, 
                    (err, token)=>{
                    if(err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            }
            else{
                res.status(422).json('pass not ok')
                } 
        } else {
            res.status(422).json('not verified')
            } 
        } else{
            res.status(422).json('not found');
        }


});

//Getting user data
app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    if(token){
       jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
       }); 
    }else{
        res.json(null);
    }
});

app.get('/admins',(req,res) =>{
    const {token} = req.cookies;
    if(token){
       jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        res.json(await User.findById(userData.id));
       }); 
    }else{
        res.json(null);
    }
});

//Logout
app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})

//Contents from Staffs
app.post('/staff', (req,res)=>{
    const {token} = req.cookies;
    const {name,profile} = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
         if(err) throw err;
        const staffDoc = await Staff.create({
            owner:userData.id,
            name,
            profile
        }); 
        res.json(staffDoc);
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage: storage})

//Uploading files
// const filesMiddleware = multer({dest:"uploads/"})
app.post('/upload',upload.array('file', 100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0; i < req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const newPath = path;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
});

//Displaying Items In StaffForm on Staff Page(User Page)
app.get('/staff', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData;
        res.json(await Staff.find({owner:id}) );
    });
});


//Getting contents from previously created forms
app.get('/staff/:id', async (req,res) =>{
    const{id} = req.params;
    res.json(await Staff.findById(id))
});


//Updating previously created forms
app.put('/staff', async(req,res) =>{
    const {token} = req.cookies;
    const {id,name,profile} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        const staffDoc = await Staff.findById(id);
        if(userData.id===staffDoc.owner.toString()){
            staffDoc.set({
                name,
                profile
            });
            await staffDoc.save();
            res.json('ok');
        }
    });
});

//Display all files
app.get('/services', async(req,res)=>{
    res.json(await Staff.find())
})
app.get('/users', async(req,res)=>{
    res.json(await User.find())
})

//Accessing
app.put('/staffac', async(req,res) =>{
    const {id,role} = req.body;
        const staffDoc = await User.findById(id);
            staffDoc.set({
               role
            });
            await staffDoc.save();
            res.json('ok');   
});

//Download Files
app.get('/download/:id', async(req,res) =>{
    const {id} = req.params;
    const staffDoc = await Staff.findById(id);
    const x = __dirname + "/uploads/";

    res.zip(
        staffDoc.profile.map((p) => ({
          path: x + p,
          name: p,
        })),
      );
});
//single file download
app.post("/createpath",async(req,res) => {
    const {token} = req.cookies;
    const {filenam,check} = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            await File.create({
                owner:userData.id,
                filenam,check
            });
            res.json(filenam.photo);
        });
});

app.get("/getpath",async(req,res)=> {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData;
        res.json(await File.find({owner:id}));
   });

});

app.put('/updatefile', async(req,res) =>{
    const {filenam,check} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        var ObjectId = require('mongodb').ObjectId;
        const {id} = userData;
        const convertedObjectId = new ObjectId(id);

        const fileDoc = await File.findOne({owner:convertedObjectId});
        fileDoc.set({
            filenam,check
        });
        await fileDoc.save();
        res.json('ok');  
   });
})

app.get("/single-download",async(req, res) => {
    const x = __dirname + "/uploads/";
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        var ObjectId = require('mongodb').ObjectId;
        const {id} = userData;
        const convertedObjectId = new ObjectId(id);
        const fileDoc = await File.findOne({owner:convertedObjectId});
        
        if(fileDoc){
                res.download(x + fileDoc.filenam.photo);
        }else{
            res.status(422).json('not found');
        }
   });
});


app.listen(4000);