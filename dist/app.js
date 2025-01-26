"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErros_1 = __importDefault(require("./app/middlewares/globalErros"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const route_1 = __importDefault(require("./app/routes/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api', route_1.default);
app.use(globalErros_1.default);
app.use(notFound_1.default);
exports.default = app;
