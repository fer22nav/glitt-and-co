import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)
if (!MONGODB_URI) {
  console.error('Define the MONGODB_URI environmental variable inside .env.local');
  throw new Error('Define the MONGODB_URI environmental variable inside .env.local');
}
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Conexión a la base de datos exitosa');
      return mongoose;
    }).catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

