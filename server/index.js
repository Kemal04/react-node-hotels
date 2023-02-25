//Express 
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const cors = require("cors");
const sequelize = require('./data/db');
const apilimiter = require("./middlewares/rateLimit");
const corsOptions = require("./middlewares/corsOption");
app.use("/api", apilimiter)

app.use(express.json());
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(cors());
app.use('/', express.static('public'))


const AuthRouter = require("./routes/auth.router")
const UserRouter = require("./routes/user.router")
const HotelRouter = require("./routes/hotel.router")
const RoomtypeRouter = require("./routes/roomType.router");
const roomRouter = require("./routes/room.router")
const hotelRoomRouter = require("./routes/hotelRoom.router");
const contactRouter = require("./routes/contact.router");
const bookingRouter = require("./routes/booking.router");

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/hotel", HotelRouter);
app.use("/api/roomType", RoomtypeRouter);
app.use("/api/room", roomRouter);
app.use("/api/hotelRoom", hotelRoomRouter);
app.use("/api/contact", contactRouter);
app.use("/api/booking", bookingRouter);


//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})