"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const db_1 = __importDefault(require("./utils/db"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const authenticate_1 = require("./middleware/authenticate");
const dotenv_1 = __importDefault(require("dotenv"));
const check_1 = __importDefault(require("./routes/check"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//middlewares 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/auth", auth_1.default);
app.use("/user", authenticate_1.authenticate, user_1.default);
app.use("/test", check_1.default);
app.get('/', (req, res) => res.send("Welcome to AnimeX-Server"));
// connect to db 
(0, db_1.default)();
//app litening
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
