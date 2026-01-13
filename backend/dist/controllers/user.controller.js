"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
//Get All User
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.default.getAll();
        if (!users) {
            res.status(500).json({ message: "Unable to fetch users" });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messege: 'Server Error' });
    }
});
//Check if user email exist in database or not
const ValidateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const users = yield user_service_1.default.getValidateByEmail(email);
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messege: 'Server Error' });
    }
});
//get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getById(req.params.id);
        if (!user) {
            res.status(500).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messege: 'Server Error' });
    }
});
//create user -sign up
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, role } = req.body;
    try {
        if (!username || !email || !password || !role) {
            res.status(500).json({
                message: "Missing information"
            });
            return;
        }
        const newUser = yield user_service_1.default.add({ username, email, password, role });
        if (!newUser) {
            res.status(500).json({ message: "Unable to create user" });
            return;
        }
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
//update user
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        const updatedUser = yield user_service_1.default.update(req.params.id, {
            username,
            email,
            password,
            role,
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" });
    }
});
//log in
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email.trim() || !password.trim()) {
            res.status(400).json({
                message: "Email or password is empty!"
            });
            return;
        }
        const result = yield user_service_1.default.login({ email, password });
        if (!result) {
            res.status(401).json({ message: "Invalid credentials!" });
            return;
        }
        if (req.session) {
            req.session.isLoggedIn = true;
            req.session.user = {
                _id: result.user._id,
                username: result.user.username,
                role: result.user.role,
                cartItems: result.cartItems
            };
        }
        res.status(200).json({
            message: "Login successful!",
            result
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Check auth
const checkAuth = (req, res) => {
    if (!req.session || !req.session.user) {
        res.status(401).json({
            message: "You are not allowed to access this"
        });
    }
    else {
        res.status(200).json(req.session.user);
    }
};
// Logout
const logout = (req, res) => {
    if (req.session) {
        req.session = null;
    }
    res.status(200).json({
        message: "Logout successful"
    });
};
//Delete user by id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_service_1.default.remove(req.params.id);
        if (!deletedUser) {
            res.status(404).json({
                message: "User not found!"
            });
            return;
        }
        res.status(200).json(deletedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllUsers,
    ValidateUser,
    getUserById,
    createUsers,
    updateUserById,
    login,
    checkAuth,
    logout,
    deleteUser
};
