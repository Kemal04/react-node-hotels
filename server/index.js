//Express 
const express = require('express');
const app = express();
//port
const port = 3001;

//modules
const cors = require("cors");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
//Db
const sequelize = require('./data/db');

app.use(express.json());
app.use(cors());
app.use('/', express.static('public'))
app.use(cookieParser())


app.use(bodyParser.urlencoded({ extended: false }))

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