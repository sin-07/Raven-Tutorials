import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import Admin from '@/models/Admin';

// Generate JWT Token (1 hour expiry for security)
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'raven-tutorials-secret-key', {
    expiresIn: '1h' // 1 hour session
  });
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    console.log('🔐 ADMIN LOGIN ATTEMPT');
    console.log('📧 Email:', email);
    console.log('🌐 IP Address:', clientIP);
    console.log('💻 User Agent:', userAgent);
    console.log('⏰ Timestamp:', new Date().toISOString());

    // Validation
    if (!email || !password) {
      console.log('❌ Missing credentials');
      return NextResponse.json({
        success: false,
        message: 'Please provide email and password'
      }, { status: 400 });
    }

    // Find admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log(`🚨 SECURITY ALERT: Login attempt with non-existent email: ${email}`);
      console.log(`   IP: ${clientIP} | Time: ${new Date().toISOString()}`);
      return NextResponse.json({
        success: false,
        message: 'AUTHENTICATION FAILED - Invalid credentials'
      }, { status: 401 });
    }

    console.log(`✓ Admin found: ${email}`);
    console.log(`✓ Admin active: ${admin.isActive}`);
    console.log(`✓ Admin role: ${admin.role}`);

    // Check if admin is active
    if (!admin.isActive) {
      console.log(`🚨 SECURITY ALERT: Deactivated account access attempt: ${email}`);
      console.log(`   IP: ${clientIP} | Time: ${new Date().toISOString()}`);
      return NextResponse.json({
        success: false,
        message: 'ACCOUNT DEACTIVATED - Contact super admin'
      }, { status: 401 });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      console.log(`🚨 SECURITY ALERT: Failed password attempt for: ${email}`);
      console.log(`   IP: ${clientIP} | Time: ${new Date().toISOString()}`);
      console.log(`   User Agent: ${userAgent}`);
      return NextResponse.json({
        success: false,
        message: 'AUTHENTICATION FAILED - Invalid credentials'
      }, { status: 401 });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id.toString());

    console.log(`✅ SUCCESSFUL LOGIN: ${email}`);
    console.log(`   Role: ${admin.role} | IP: ${clientIP}`);
    console.log(`   Time: ${new Date().toISOString()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'BREACH SUCCESSFUL - Access granted',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      }
    });

    // Set httpOnly cookie (1 hour expiry)
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60, // 1 hour in seconds
      path: '/'
    });

    console.log('🍪 Cookie set successfully');

    return response;

  } catch (error: any) {
    console.error('💥 SYSTEM ERROR during admin login:', error);
    return NextResponse.json({
      success: false,
      message: 'SYSTEM FAILURE - Server error during authentication'
    }, { status: 500 });
  }
}
