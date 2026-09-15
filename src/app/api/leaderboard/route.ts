import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/database';
import Test, { ITest } from '@/models/Test';
import Admission from '@/models/Admission';

const JWT_SECRET = process.env.JWT_SECRET || 'raven-tutorials-secret-key-production-change';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const standardFilter = searchParams.get('standard');

    // 1. Identify logged in student if cookie exists
    let currentStudentId: string | null = null;
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('token')?.value || cookieStore.get('studentToken')?.value;
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        currentStudentId = decoded.studentId || decoded.id || null;
      }
    } catch {
      // not logged in or invalid token
    }

    // 2. Fetch all relevant tests
    const testQuery: any = {
      'results.0': { $exists: true }, // at least one result
    };
    if (standardFilter && standardFilter !== 'All') {
      testQuery.standard = standardFilter;
    }

    const tests = await Test.find(testQuery).lean() as unknown as ITest[];

    // 3. Aggregate student performances
    // Map: studentId -> { totalMarksObtained, totalPossibleMarks, testsAttempted, testsPassed, perfectScores, speedDemonScores, testHistory: [] }
    const studentMap: Record<string, {
      studentId: string;
      totalObtained: number;
      totalMax: number;
      testsAttempted: number;
      testsPassed: number;
      perfectScores: number;
      speedDemonCount: number;
      recentResults: Array<{ marks: number; total: number; passed: boolean; date: Date }>;
    }> = {};

    tests.forEach((test) => {
      const durationSeconds = (test.duration || 60) * 60;

      test.results?.forEach((res) => {
        if (!res.studentId || res.status === 'Absent') return;
        const sId = res.studentId.toString();

        if (!studentMap[sId]) {
          studentMap[sId] = {
            studentId: sId,
            totalObtained: 0,
            totalMax: 0,
            testsAttempted: 0,
            testsPassed: 0,
            perfectScores: 0,
            speedDemonCount: 0,
            recentResults: [],
          };
        }

        const marks = res.marksObtained || 0;
        const total = test.totalMarks || 100;
        const passed = marks >= (test.passingMarks || total * 0.4);
        const percentage = total > 0 ? (marks / total) * 100 : 0;

        studentMap[sId].totalObtained += marks;
        studentMap[sId].totalMax += total;
        studentMap[sId].testsAttempted += 1;
        if (passed) studentMap[sId].testsPassed += 1;
        if (marks >= total) studentMap[sId].perfectScores += 1;

        // Speed demon: scored >= 80% with timeSpent <= 50% duration
        if (percentage >= 80 && res.timeSpent && res.timeSpent <= durationSeconds * 0.5) {
          studentMap[sId].speedDemonCount += 1;
        }

        studentMap[sId].recentResults.push({
          marks,
          total,
          passed,
          date: res.submittedAt || new Date(),
        });
      });
    });

    const studentIds = Object.keys(studentMap);

    // Fetch student profile details from Admission
    const admissions = await Admission.find({
      _id: { $in: studentIds },
    })
      .select('_id studentName standard photo registrationId')
      .lean();

    const admissionMap: Record<string, any> = {};
    admissions.forEach((adm) => {
      admissionMap[adm._id.toString()] = adm;
    });

    // Compute final ranking list
    const rankings = studentIds
      .map((sId) => {
        const stats = studentMap[sId];
        const studentInfo = admissionMap[sId] || {
          studentName: 'Student',
          standard: '10th',
          registrationId: 'RT',
        };

        const avgScore =
          stats.totalMax > 0
            ? Math.round((stats.totalObtained / stats.totalMax) * 100)
            : 0;

        return {
          studentId: sId,
          studentName: studentInfo.studentName,
          standard: studentInfo.standard,
          photo: studentInfo.photo,
          registrationId: studentInfo.registrationId,
          testsAttempted: stats.testsAttempted,
          testsPassed: stats.testsPassed,
          totalObtained: stats.totalObtained,
          avgScore,
          points: Math.round(stats.totalObtained * 10 + stats.testsAttempted * 25),
        };
      })
      .sort((a, b) => b.points - a.points || b.avgScore - a.avgScore)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));

    // Top 3 Podium
    const podium = [
      rankings[0] || null,
      rankings[1] || null,
      rankings[2] || null,
    ];

    // Current student stats & badges
    let currentStudentStats = null;
    if (currentStudentId) {
      const myRankIndex = rankings.findIndex((r) => r.studentId === currentStudentId);
      const myStats = studentMap[currentStudentId];

      if (myStats) {
        // Evaluate Badges
        // 1. Top Raven: rank 1, 2, or 3
        const isTopRaven = myRankIndex >= 0 && myRankIndex < 3;
        // 2. Speed Demon
        const isSpeedDemon = myStats.speedDemonCount > 0;
        // 3. Bullseye
        const isBullseye = myStats.perfectScores > 0;
        // 4. Streak Master: 3 consecutive passes
        let maxStreak = 0;
        let currStreak = 0;
        myStats.recentResults.forEach((r) => {
          if (r.passed) {
            currStreak++;
            if (currStreak > maxStreak) maxStreak = currStreak;
          } else {
            currStreak = 0;
          }
        });
        const isStreakMaster = maxStreak >= 3;
        // 5. Scholar: 5+ tests
        const isScholar = myStats.testsAttempted >= 5;
        // 6. Consistent Performer: avg >= 75%
        const avgScore =
          myStats.totalMax > 0
            ? Math.round((myStats.totalObtained / myStats.totalMax) * 100)
            : 0;
        const isConsistent = avgScore >= 75 && myStats.testsAttempted >= 2;

        const badges = [
          {
            id: 'top-raven',
            title: 'Top Raven',
            icon: 'crown',
            description: 'Ranked in the prestigious Top 3 of the institute',
            unlocked: isTopRaven,
            progress: isTopRaven ? 100 : myRankIndex >= 0 ? Math.max(10, 100 - myRankIndex * 15) : 0,
          },
          {
            id: 'speed-demon',
            title: 'Speed Demon',
            icon: 'zap',
            description: 'Scored ≥80% in half the test duration',
            unlocked: isSpeedDemon,
            progress: isSpeedDemon ? 100 : 35,
          },
          {
            id: 'bullseye',
            title: 'Bullseye 100%',
            icon: 'target',
            description: 'Scored perfect 100% marks in an official test',
            unlocked: isBullseye,
            progress: isBullseye ? 100 : Math.min(avgScore, 95),
          },
          {
            id: 'streak-master',
            title: 'Streak Master',
            icon: 'flame',
            description: 'Conquered 3 consecutive mock tests',
            unlocked: isStreakMaster,
            progress: Math.min(Math.round((maxStreak / 3) * 100), 100),
          },
          {
            id: 'scholar',
            title: 'Raven Scholar',
            icon: 'book',
            description: 'Attempted 5 or more scheduled assessments',
            unlocked: isScholar,
            progress: Math.min(Math.round((myStats.testsAttempted / 5) * 100), 100),
          },
          {
            id: 'consistent',
            title: 'Honor Roll',
            icon: 'shield',
            description: 'Maintained an overall average score above 75%',
            unlocked: isConsistent,
            progress: Math.min(Math.round((avgScore / 75) * 100), 100),
          },
        ];

        const percentile =
          rankings.length > 1
            ? Math.round(((rankings.length - myRankIndex) / rankings.length) * 100)
            : 100;

        currentStudentStats = {
          rank: myRankIndex >= 0 ? myRankIndex + 1 : 'Unranked',
          percentile,
          testsAttempted: myStats.testsAttempted,
          avgScore,
          points: Math.round(myStats.totalObtained * 10 + myStats.testsAttempted * 25),
          badges,
        };
      }
    }

    return NextResponse.json({
      success: true,
      podium,
      rankings: rankings.slice(0, 50),
      totalStudents: rankings.length,
      currentStudentStats,
    });
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
