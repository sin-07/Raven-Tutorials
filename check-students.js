// Check students in database
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  registrationId: String,
  studentName: String,
  standard: String,
  email: String,
  isActive: Boolean
});

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

async function checkStudents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const students = await Student.find({}).select('registrationId studentName standard email isActive');
    
    console.log(`Total students: ${students.length}\n`);
    
    if (students.length === 0) {
      console.log('❌ No students found in database!');
      console.log('   You need to add students through the admission form first.\n');
    } else {
      console.log('Students by standard:');
      const byStandard = {};
      students.forEach(s => {
        const std = s.standard || 'undefined';
        if (!byStandard[std]) byStandard[std] = [];
        byStandard[std].push({
          id: s.registrationId,
          name: s.studentName,
          email: s.email,
          active: s.isActive
        });
      });
      
      Object.keys(byStandard).sort().forEach(std => {
        console.log(`\n  ${std}: ${byStandard[std].length} students`);
        byStandard[std].forEach(s => {
          console.log(`    - ${s.name} (${s.id}) ${s.active ? '✓' : '✗ inactive'}`);
        });
      });
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkStudents();
