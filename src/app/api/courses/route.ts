import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Course from '@/models/Course';

// GET - Fetch all published courses (public API)
export async function GET() {
  try {
    await connectDB();
    
    // Only fetch published courses for public view
    const courses = await Course.find({ isPublished: true }).sort({ createdAt: -1 });

    // Transform to match the expected format for CourseCard
    const transformedCourses = courses.map(course => ({
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      shortDescription: course.description.substring(0, 100) + '...',
      thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
      instructor: {
        id: course._id.toString(),
        name: course.instructor,
        avatar: course.instructorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
      category: course.category,
      level: course.level,
      duration: course.duration,
      totalLessons: course.syllabus?.length || 0,
      totalStudents: course.enrolledStudents || 0,
      rating: course.rating || 0,
      price: course.price,
      originalPrice: course.originalPrice || course.price,
      isFree: course.price === 0,
      isPopular: course.enrolledStudents > 100,
      features: course.features || [],
      syllabus: course.syllabus || [],
      createdAt: course.createdAt,
    }));

    return NextResponse.json({
      success: true,
      courses: transformedCourses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
