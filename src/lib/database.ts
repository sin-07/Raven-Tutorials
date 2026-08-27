import mongoose from 'mongoose';
import dns from 'dns';
import { promisify } from 'util';

// Force Node.js to use IPv4 DNS resolution and set custom DNS servers
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);

const resolveSrv = promisify(dns.resolveSrv);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/raven-tutorials';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// Pre-warm DNS cache for MongoDB SRV records
async function prewarmDNS() {
  try {
    if (MONGODB_URI.includes('mongodb+srv://')) {
      const match = MONGODB_URI.match(/mongodb\+srv:\/\/[^@]+@([^/?]+)/);
      if (match && match[1]) {
        const hostname = match[1];
        await resolveSrv(`_mongodb._tcp.${hostname}`);
        console.log('[DNS] Pre-warmed DNS cache for MongoDB Atlas');
      }
    }
  } catch (error) {
    console.warn('[DNS] Pre-warm failed, will retry on connect:', error);
  }
}

prewarmDNS();

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 60000,
      serverSelectionTimeoutMS: 30000,
      family: 4, // Force IPv4
      retryWrites: true,
      w: 'majority' as const,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('[SUCCESS] MongoDB Connected to Atlas');
      return mongoose;
    }).catch(async (error) => {
      console.error('[ERROR] Initial connection failed, retrying with DNS refresh...', error.message);
      // Retry once with fresh DNS
      await prewarmDNS();
      return mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('[SUCCESS] MongoDB Connected to Atlas (after retry)');
        return mongoose;
      });
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('[FATAL] MongoDB connection failed:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDatabase;
