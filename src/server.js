import express from 'express';
import cors from 'cors';
import mongoose, { Schema } from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { isAdmin } from './assets/isAdmin';


const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/sytitandb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(passport.initialize());
app.use(passport.session());


const dogSchema = new mongoose.Schema({
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

// CORS: Allow frontend to communicate with backend
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true
}));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));


function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

app.post('/contact', (req, res) => {

  
  console.log('Contact form submission:', req.body);
  res.status(200).json({ message: 'Contact received' });
});

app.get('/dogs/:field', async (req, res) => {
  const entry = req.params.field;

  try {
    const data = await Dog.find({ tags: { $in: [entry] } });
    res.status(200).json({ message: 'Query successful', user: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/admin/dashboard', (req, res) => {
  res.redirect('/login')
});

app.post('/login', passport.authenticate('local'), isAdmin, (req, res) => {
  res.status(200).json({ message: 'Login success', user: req.user });
});




// Server Start
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
