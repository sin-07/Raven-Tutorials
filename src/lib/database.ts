import mongoose from 'mongoose';
import dns from 'dns';

// Configure DNS resolution for reliable MongoDB Atlas SRV lookups
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);
} catch {
  // Ignore in environments where setting DNS servers is restricted
}

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/raventutorials';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Resolves a mongodb+srv:// URI into standard mongodb:// seed list using custom public DNS
 */
async function resolveSrvUriIfNeeded(uri: string): Promise<string> {
  if (!uri.startsWith('mongodb+srv://')) {
    return uri;
  }

  try {
    const withoutScheme = uri.slice('mongodb+srv://'.length);
    const authAndRest = withoutScheme.split('@');
    let credentials = '';
    let hostAndQuery = withoutScheme;

    if (authAndRest.length === 2) {
      credentials = authAndRest[0] + '@';
      hostAndQuery = authAndRest[1];
    }

    const [host, query = ''] = hostAndQuery.split('/');
    const srvHostname = `_mongodb._tcp.${host}`;

    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);
    const records = await dns.promises.resolveSrv(srvHostname);

    if (!records || records.length === 0) {
      return uri;
    }

    const seedList = records.map((r) => `${r.name}:${r.port}`).join(',');
    const [database, queryString = ''] = query.split('?');

    let txtOptions = '';
    try {
      const txtRecords = await dns.promises.resolveTxt(host);
      if (txtRecords && txtRecords.length > 0) {
        txtOptions = txtRecords.map((r) => r.join('')).join('&');
      }
    } catch {
      // Ignore TXT lookup errors
    }

    const queryParts = [queryString, txtOptions, 'ssl=true', 'authSource=admin'].filter(Boolean);
    const resolvedUri = `mongodb://${credentials}${seedList}/${database || 'raventutorials'}?${queryParts.join('&')}`;
    return resolvedUri;
  } catch (err) {
    console.warn('[DATABASE] Could not resolve SRV ahead of time, falling back to original URI:', err);
    return uri;
  }
}

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cached.conn && mongoose.connection.readyState >= 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 15000,
      family: 4,
      retryWrites: true,
      w: 'majority',
    };

    cached.promise = (async () => {
      try {
        dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);
        const connectionString = await resolveSrvUriIfNeeded(MONGODB_URI);
        const mongooseInstance = await mongoose.connect(connectionString, opts);
        console.log('[SUCCESS] MongoDB Connected to Atlas');
        return mongooseInstance;
      } catch (error: any) {
        cached.promise = null;
        console.error('[ERROR] MongoDB connection failed:', error.message);
        throw error;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export const connectDB = connectDatabase;
export default connectDatabase;


