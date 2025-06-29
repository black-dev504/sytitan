import express from "express";
import cors from "cors";
import mongoose, { Schema } from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { isAdmin } from "./assets/isAdmin.js";
import dotenv from "dotenv";
import { dog } from "@cloudinary/url-gen/qualifiers/focusOn";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://black-dev504.github.io/sytitan/",
      "https://sytitan-black-dev504s-projects.vercel.app",
      "https://sytitan.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const dogSchema = new mongoose.Schema({
  serial_no: {
    type: String,
    required: true,
    unique: [true, "existing dog"],
  },
  name: {
    type: String,
    required: true,
  },
  pedigree: {
    type: String,
  },
  color: {
    type: String,
  },
  height: {
    type: String,
  },
  head_size: {
    type: String,
  },
  class: {
    type: String,
  },
  registries: {
    type: Array,
  },
  desc: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
  },
  tags: {
    type: Array,
  },
  images: {
    type: Array,
  },
});

const upcomingBreed = new mongoose.Schema({
  breed: {
    type: Array,
    stud: {
      type: String,
    },
    bitch: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
});

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

adminSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

const Dog = mongoose.model("dogdata", dogSchema);
const Upcoming = mongoose.model("upcomingbreeds", upcomingBreed);
const Admin = mongoose.model("admins", adminSchema);

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

async function createInitialAdmin() {
  const existingAdmin = await Admin.findOne({ email: process.env.ADM_EMAIL });
  if (!existingAdmin) {
    Admin.register(
      new Admin({
        username: "Lord faftini",
        email: process.env.ADM_EMAIL,
        isAdmin: true,
      }),
      process.env.ADM_PASSWORD,
      (err, user) => {
        if (err) {
          console.error("Error creating admin:", err);
        } else {
          console.log("Admin user created:", user.email);
        }
      }
    );
  } else {
    console.log("Admin already exists.");
  }
}

// createInitialAdmin();

app.post("/contact", (req, res) => {
  console.log("Contact form submission:", req.body);
  res.status(200).json({ message: "Contact received" });
});

app.get("/lobby/:field", async (req, res) => {
  const entry = req.params.field;

  try {
    const data =
      entry === "ALL"
        ? await Dog.find()
        : await Dog.find({ tags: { $in: [entry] } });
    res.status(200).json({ message: "Query successful", dog: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/admin/dashboard", isAdmin, async (req, res) => {
  const serial_no = req.body.serial_no;
  try {
    const existingDog = await Dog.findOne({ serial_no });
    if (existingDog) {
      return res.status(400).json({ error: "Dog already registered" });
    }

    const dog = new Dog(req.body);

    const newDog = await dog.save();
    res.status(200).json({ message: "successful", newDog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(
  "/admin/dashboard/login",
  passport.authenticate("local"),
  isAdmin,
  (req, res) => {
    res.status(200).json({ message: "Login success", user: req.user });
  }
);

app.post("/cloudinarysave", isAdmin, async (req, res) => {
  const response = await fetch(process.env.VITE_CLOUDINARY_URL, {
    method: "POST",
    body: req.body,
  });

  res.status(200).json({ message: " success", url: response });
});

app.get("/profile/:serial_no", async (req, res) => {
  const serial_no = req.params.serial_no;
  try {
    const user = await Dog.findOne({ serial_no });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ dog: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/dogs/:id/:limit", async (req, res) => {
  const dogId = req.params.id;
  const limit = req.params.limit;

  if (dogId === "null") {
    try {
      const dogs = await Dog.find().limit(parseInt(limit));
      return res.status(200).json({
        message: "Query successful",
        dogs: dogs,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  try {
    // Step 1: Find the dog by ID or serial number
    const dog = await Dog.findOne({ serial_no: dogId });

    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    // Step 2: Pick a random tag from the dog's tags
    const tagIndex = Math.floor(Math.random() * dog.tags.length);
    const randomTag = dog.tags[tagIndex];

    // Step 3: Find other dogs that share that tag, excluding the current dog
    const relatedDogs = await Dog.find({
      serial_no: { $ne: dog.serial_no },
      tags: { $in: randomTag },
    }).limit(limit);

    res.status(200).json({
      message: "Query successful",
      dogs: relatedDogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Server Start
app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
  // createInitialAdmin().catch((err) => console.error("Error creating admin:", err));
});