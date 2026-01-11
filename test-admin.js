// Test script to check admin user
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'vs.aniket07@gmail.com';
    const admin = await Admin.findOne({ email });

    if (admin) {
      console.log('\n✅ Admin found:');
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      console.log('Active:', admin.isActive);
      console.log('Password hash exists:', !!admin.password);
    } else {
      console.log('\n❌ Admin not found with email:', email);
      console.log('\nAll admins in database:');
      const allAdmins = await Admin.find({});
      console.log(allAdmins.map(a => ({ email: a.email, name: a.name, role: a.role })));
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAdmin();
