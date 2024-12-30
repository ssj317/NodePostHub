const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path"); 
const app = express();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const usermodel=require('./models/user');
const postmodel=require("./models/post");
const upload=require('./config/multerconfig');

 

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));


app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.post('/register',async(req,res)=>{
    let {email,password,username,name,age}=req.body;

    let user=await  usermodel.findOne({email});

    if(user){
        return res.status(500).send("user already registered");
    }
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                let user=await usermodel.create({
                    username,
                    email,
                    age,
                    name,
                    password:hash
                })

                let token=jwt.sign({email:email,userid:user._id},"shhh");
                res.cookie("token",token);
                res.send("new user sucessfully regiestered");
            });
        });

    }
   
})


app.post('/login',async(req,res)=>{
    let {email,password}=req.body;

    let user=await  usermodel.findOne({email});

    if(!user){
        res.redirect("/");
    }

    bcrypt.compare(password,user.password,function(err,result){

        if(result){
           
            let token=jwt.sign({email:email,userid:user._id},"shhh");
            res.cookie("token",token);
            res.redirect("/profile");

        }
        else{
            res.redirect("/");
        }

    })
    

    
   
})

app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect("/login");
})

app.get("/like/:id", async (req, res) => {
    let nuser = await postmodel.findOne({ _id: req.params.id });
    await nuser.populate("user");

    
    if (nuser.likes.indexOf(nuser.user._id) === -1) {
        
        nuser.likes.push(nuser.user._id);
       
    } else {
       
        nuser.likes.splice(nuser.likes.indexOf(nuser.user._id), 1);
        
    }

    await nuser.save();

   

    
    res.redirect("/profile");
});

app.get("/edit/:id", async (req, res) => {
    let post = await postmodel.findOne({ _id: req.params.id });

    res.render('edit',{post});
    
});

app.post("/update/:id",async (req,res)=>{
    let npost=await postmodel.findOneAndUpdate({_id:req.params.id},{content:req.body.content});

    res.redirect("/profile");
})


app.get('/profile',isloggedin,async (req,res)=>{
    let data=req.user;

    let preuser=await usermodel.findOne({email:data.email});
    await preuser.populate("posts");

    console.log(preuser);

    //console.log(preuser);

    res.render("profile",{preuser});
})

app.post('/post',isloggedin,async (req,res)=>{

    let nuser=await usermodel.findOne({email:req.user.email});
     
    let {content}=req.body;

    let npost=await postmodel.create({
        user:nuser._id,
        content
    });

    nuser.posts.push(npost._id);
    await nuser.save();

    res.redirect("/profile");

    

})

app.get('/upload',(req,res)=>{
    res.render('profileupload');
})

app.post('/upload', isloggedin, upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log(req.file);
  
  
    let user = await usermodel.findOne({ email: req.user.email });
    user.profilepic = req.file.filename;
    await user.save();
    
    res.redirect('/profile');
  });
  


function isloggedin(req,res,next){
    if(req.cookies.token===""){ 
        res.redirect('/login');
    }
    else{
        let data=jwt.verify(req.cookies.token,"shhh");
        req.user=data;
        next();
    }

   
}


app.listen(3000,()=>{
    console.log("server started");

})

