import mongoose from 'mongoose';
import dns from 'dns';

// Configure process-level DNS fallback
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);
} catch {
  // Ignore in environments where setting global DNS servers is restricted
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  resolvedUri: string | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null, resolvedUri: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Resolves a mongodb+srv:// URI into a direct replica set mongodb:// URI
 * using dedicated Google & Cloudflare DNS resolvers.
 * 
 * This completely prevents "querySrv ECONNREFUSED" on Windows systems,
 * loopback DNS (127.0.0.1), and ISPs that block UDP SRV record lookups on port 53.
 */
async function resolveMongoUri(uri: string): Promise<string> {
  if (cached.resolvedUri) {
    return cached.resolvedUri;
  }

  if (!uri.startsWith('mongodb+srv://')) {
    cached.resolvedUri = uri;
    return uri;
  }

  try {
    const withoutScheme = uri.slice('mongodb+srv://'.length);
    const atIndex = withoutScheme.indexOf('@');
    let credentials = '';
    let hostAndRest = withoutScheme;

    if (atIndex !== -1) {
      credentials = withoutScheme.slice(0, atIndex + 1);
      hostAndRest = withoutScheme.slice(atIndex + 1);
    }

    const slashIndex = hostAndRest.indexOf('/');
    let host = hostAndRest;
    let queryAndDb = '';

    if (slashIndex !== -1) {
      host = hostAndRest.slice(0, slashIndex);
      queryAndDb = hostAndRest.slice(slashIndex + 1);
    }

    const [dbName, queryString = ''] = queryAndDb.split('?');
    const srvHostname = `_mongodb._tcp.${host}`;

    // Dedicated resolver instance with public DNS
    const resolver = new dns.promises.Resolver();
    resolver.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);

    const srvRecords = await resolver.resolveSrv(srvHostname);
    if (!srvRecords || srvRecords.length === 0) {
      cached.resolvedUri = uri;
      return uri;
    }

    const seedList = srvRecords.map((r) => `${r.name}:${r.port}`).join(',');

    const params = new URLSearchParams();
    if (queryString) {
      new URLSearchParams(queryString).forEach((val, key) => params.set(key, val));
    }

    try {
      const txtRecords = await resolver.resolveTxt(host);
      if (txtRecords && txtRecords.length > 0) {
        const txtString = txtRecords.map((r) => r.join('')).join('&');
        new URLSearchParams(txtString).forEach((val, key) => params.set(key, val));
      }
    } catch {
      // Ignore TXT lookup errors
    }

    if (!params.has('ssl') && !params.has('tls')) {
      params.set('ssl', 'true');
    }
    if (!params.has('authSource')) {
      params.set('authSource', 'admin');
    }

    const directUri = `mongodb://${credentials}${seedList}/${dbName || 'raventutorials'}?${params.toString()}`;
    cached.resolvedUri = directUri;
    return directUri;
  } catch (err) {
    console.warn('[DATABASE] Dedicated SRV resolution fallback, using original URI:', err);
    cached.resolvedUri = uri;
    return uri;
  }
}

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cached.conn && mongoose.connection.readyState >= 1) {
    return cached.conn;
  }

  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
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
      const connectionUri = await resolveMongoUri(rawUri);
      return mongoose.connect(connectionUri, opts).then((mongooseInstance) => {
        console.log('[SUCCESS] MongoDB Connected to Atlas');
        return mongooseInstance;
      }).catch((error) => {
        cached.promise = null;
        console.error('[ERROR] MongoDB connection failed:', error.message);
        throw error;
      });
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
