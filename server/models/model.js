const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: true },
    phoneNum: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "User" }
});

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});

const Hotel = sequelize.define("hotel", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phoneNum: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: "Hotel", allowNull: false },
    checked: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: "0"
    }
});

const RoomType = sequelize.define("roomtype", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name: { type: DataTypes.STRING, allowNull: false }
})

const Room = sequelize.define("room", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    roomNum: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true },
    liked: { type: DataTypes.STRING, allowNull: true },
    viewed: { type: DataTypes.STRING, allowNull: true }

})

const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false }
})

const Booking = sequelize.define("booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    checkIn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phoneNum: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    check: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: "0"
    }
});

Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$.2s8SLEln9Dnql5sPuvtfec93qtcKyvMAqDY8zeLg8IcndoHNtXWS", role: "Admin" } })


RoomType.hasMany(Room, { onDelete: "cascade" }),
    Room.belongsTo(RoomType)

Hotel.hasMany(Room, { onDelete: "cascade" }),
    Room.belongsTo(Hotel)

Hotel.hasMany(Booking, { onDelete: "cascade" });
Booking.belongsTo(Hotel);

Room.hasMany(Booking, { onDelete: "cascade" });
Booking.belongsTo(Room);

User.hasMany(Booking, { onDelete: "cascade" });
Booking.belongsTo(User);

User.belongsToMany(Room, { through: 'RoomUserBooking' });
Room.belongsToMany(User, { through: 'RoomUserBooking' });

module.exports = {
    User,
    Admin,
    Hotel,
    RoomType,
    Room,
    Contact,
    Booking
};
