import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(process.cwd(), '.env') })


export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    saltRounds: process.env.SALTROUNDS,
    privateKey: process.env.PRIVATE_KEY,
    expiresIn: process.env.EXPIRES_IN
}