import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//local module
import adminRoutes from './Routes/adminRoutes.js';
import userRoutes from './Routes/userRoutes.js';

const app = express();
const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
