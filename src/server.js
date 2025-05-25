import express from 'express';
import cors from 'cors';
import mongoose, { Schema } from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { isAdmin } from './assets/isAdmin.js';
import dotenv from 'dotenv'

 
const app = express();
dotenv.config()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));




const dogSchema = new mongoose.Schema({
   serial_no:{
      type:String,
      required: true,
      unique:[true, 'existing dog']
   },
    name:{
        type:String,
        required: true
    },
    pedigree:{
        type:String
    },
    color:{
        type:String
    },
    height:{
        type:String
    },
    head_size:{
        type:String 
    },
    class:{
        type:String
    },
    registries:{
        type:Array
    },
    desc:{
        type:String
    },
    gender:{
        type:String
    },
    is_puppy:{
        type:Boolean
    },
    tags:{
        type: Array
    },
    images:{
      type:Array
    }



})

const upcomingBreed = new mongoose.Schema({
   breed: {
        type: Array,
        stud: {
            type:String
        },
        bitch: {
            type:String
        },
        desc:{
            type:String
        }
    },
   
})

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  }
})


adminSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
   
});



const Dog = mongoose.model('dogdata', dogSchema)
const Upcoming = mongoose.model('upcomingbreeds',upcomingBreed)
const Admin = mongoose.model('admins', adminSchema)

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());




async function createInitialAdmin() {
  const existingAdmin = await Admin.findOne({ email: process.env.ADM_EMAIL });
  if (!existingAdmin) {
    Admin.register( 
      new Admin({
        username: 'Lord faftini',
        email: process.env.ADM_EMAIL ,
        isAdmin: true
      }),
      process.env.ADM_PASSWORD, 
      (err, user) => {
        if (err) {
          console.error('Error creating admin:', err);
        } else {
          console.log('Admin user created:', user.email);
        }
      }
    );
  } else {
    console.log('Admin already exists.');
  }
}

// createInitialAdmin();

app.post('/contact', (req, res) => {

   
  console.log('Contact form submission:', req.body);
  res.status(200).json({ message: 'Contact received' });
});

app.get('/lobby/:field', async (req, res) => {
  const entry = req.params.field;

  try {
    const data = entry ==='all'? await Dog.find(): await Dog.find({ tags: { $in: [entry] } });
    res.status(200).json({ message: 'Query successful', dog: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.post('/admin/dashboard', isAdmin, async (req, res) => {
   const serial_no = req.body.serial_no
    try {
    const existingDog = await Dog.findOne({ serial_no });
    if (existingDog) {
      return res.status(400).json({ error: 'Dog already registered' });
    }

    const dog = new Dog(req.body);

    const newDog = await dog.save();
    res.status(200).json({ message: 'successful', newDog });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }

    
});

app.post('/admin/dashboard/login', passport.authenticate('local'), isAdmin,(req, res) => {  
  res.status(200).json({ message: 'Login success', user: req.user });
});

app.post('cloudinary-save', isAdmin, async(req,res)=>{
  console.log(req);
  res.status(200).json({ message: 'Login success', url: 'dd' });

  
})



// Server Start
app.listen(process.env.PORT, () => {
  console.log('Server started on port 5000');
});
