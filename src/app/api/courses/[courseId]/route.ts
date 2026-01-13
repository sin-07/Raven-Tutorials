import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Course from '@/models/Course';

// GET - Fetch single published course (public API)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    await connectDB();
    
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    if (!course.isPublished) {
      return NextResponse.json(
        { success: false, message: 'Course not available' },
        { status: 404 }
      );
    }

    // Transform to match expected format
    const transformedCourse = {
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
      totalRatings: course.totalRatings || 0,
      price: course.price,
      originalPrice: course.originalPrice || course.price,
      isFree: course.price === 0,
      isPopular: course.enrolledStudents > 100,
      features: course.features || [],
      syllabus: course.syllabus || [],
      createdAt: course.createdAt,
    };

    return NextResponse.json({
      success: true,
      course: transformedCourse,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}
