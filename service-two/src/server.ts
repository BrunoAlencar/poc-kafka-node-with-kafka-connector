import 'dotenv/config';
import './services/kafka.service';
import app from './app';
const PORT = 3000;
app.listen(PORT, () => console.log('Server is running at PORT 3000 🚀'));
