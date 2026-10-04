const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commits = [
  // 1. Vercel Configuration & Scripts
  { files: ['vercel.json'], msg: 'chore(vercel): add vercel.json deployment configuration and security headers' },
  { files: ['scripts/patch-dynamic-routes.js'], msg: 'chore(scripts): add automated dynamic route verification utility' },

  // 2. Dynamic API routes for Vercel serverless stability
  { files: ['src/app/api/admin/attendance/route.ts'], msg: 'fix(api): mark admin attendance endpoint as dynamic for Vercel runtime' },
  { files: ['src/app/api/admin/courses/[id]/publish/route.ts'], msg: 'fix(api): mark admin course publish route as dynamic server handler' },
  { files: ['src/app/api/admin/live-classes/route.ts'], msg: 'fix(api): mark admin live-classes collection endpoint as force-dynamic' },
  { files: ['src/app/api/admin/live-classes/[classId]/route.ts'], msg: 'fix(api): enforce dynamic serverless execution for admin live-class by id' },
  { files: ['src/app/api/admin/live-classes/[classId]/start/route.ts'], msg: 'fix(api): mark admin live-class start trigger route as dynamic' },
  { files: ['src/app/api/admin/login/route.ts'], msg: 'fix(api): mark admin authentication login handler as force-dynamic' },
  { files: ['src/app/api/admin/logout/route.ts'], msg: 'fix(api): mark admin session logout endpoint as force-dynamic' },
  { files: ['src/app/api/admin/students/route.ts'], msg: 'fix(api): enforce dynamic route execution on admin students list' },
  { files: ['src/app/api/admin/students/[id]/route.ts'], msg: 'fix(api): mark admin student profile lookup as dynamic' },
  { files: ['src/app/api/admin/study-materials/route.ts'], msg: 'fix(api): mark admin study materials endpoint as dynamic' },
  { files: ['src/app/api/admin/study-materials/upload/route.ts'], msg: 'fix(api): configure admin material upload route as force-dynamic' },
  { files: ['src/app/api/admin/study-materials/[id]/route.ts'], msg: 'fix(api): set dynamic server execution on admin material delete/update route' },
  { files: ['src/app/api/admin/teacher-applications/route.ts'], msg: 'fix(api): mark teacher applications management route as force-dynamic' },
  { files: ['src/app/api/admin/tests/route.ts'], msg: 'fix(api): enforce dynamic execution on admin tests collection' },
  { files: ['src/app/api/admin/tests/[id]/route.ts'], msg: 'fix(api): mark admin single test management endpoint as dynamic' },
  { files: ['src/app/api/admin/verify/route.ts'], msg: 'fix(api): ensure admin token verification endpoint executes dynamically' },
  { files: ['src/app/api/admin/videos/student/standard/route.ts'], msg: 'fix(api): mark standard video lectures route as dynamic' },

  { files: ['src/app/api/admission/payment-verify/route.ts'], msg: 'fix(api): mark admission payment verification handler as force-dynamic' },
  { files: ['src/app/api/admission/resend-otp/route.ts'], msg: 'fix(api): mark admission OTP resend service as dynamic route' },
  { files: ['src/app/api/admission/verify-otp/route.ts'], msg: 'fix(api): mark admission OTP verification handler as force-dynamic' },

  { files: ['src/app/api/auth/login/route.ts'], msg: 'fix(api): enforce dynamic runtime for user login endpoint' },
  { files: ['src/app/api/auth/logout/route.ts'], msg: 'fix(api): set force-dynamic on user logout cookie clearing route' },
  { files: ['src/app/api/auth/verify/route.ts'], msg: 'fix(api): set force-dynamic on session verification endpoint' },

  { files: ['src/app/api/courses/[courseId]/route.ts'], msg: 'fix(api): mark public course detail route as force-dynamic' },
  { files: ['src/app/api/feedback/admin/all/route.ts'], msg: 'fix(api): enforce dynamic server handler on admin feedbacks list' },
  { files: ['src/app/api/feedback/admin/stats/route.ts'], msg: 'fix(api): mark feedback analytics statistics route as dynamic' },
  { files: ['src/app/api/feedback/admin/[id]/route.ts'], msg: 'fix(api): mark single feedback status route as dynamic' },
  { files: ['src/app/api/feedback/route.ts'], msg: 'fix(api): mark public feedback submission endpoint as force-dynamic' },
  { files: ['src/app/api/fees/[id]/pay/route.ts'], msg: 'fix(api): mark student fee payment route as force-dynamic' },
  { files: ['src/app/api/notices/route.ts'], msg: 'fix(api): mark public notices listing route as force-dynamic' },
  { files: ['src/app/api/notices/[id]/route.ts'], msg: 'fix(api): enforce dynamic route execution on notice by ID' },
  { files: ['src/app/api/payment/create-order/route.ts'], msg: 'fix(api): set dynamic serverless execution for Razorpay order creation' },
  { files: ['src/app/api/payment/verify/route.ts'], msg: 'fix(api): set dynamic runtime on payment signature verification route' },
  { files: ['src/app/api/rsat/questions/route.ts'], msg: 'fix(api): prevent static prerender for RSAT questions endpoint' },
  { files: ['src/app/api/rsat/submit/route.ts'], msg: 'fix(api): set force-dynamic on scholarship test submission route' },
  { files: ['src/app/api/seed/route.ts'], msg: 'fix(api): set force-dynamic on database seeder route' },
  { files: ['src/app/api/send-email/route.ts'], msg: 'fix(api): enforce dynamic execution on nodemailer dispatch route' },
  { files: ['src/app/api/student/attendance/route.ts'], msg: 'fix(api): mark student attendance record query as force-dynamic' },
  { files: ['src/app/api/student/courses/route.ts'], msg: 'fix(api): mark student enrolled courses route as force-dynamic' },
  { files: ['src/app/api/student/live-classes/[classId]/join/route.ts'], msg: 'fix(api): set force-dynamic on student live-class join handler' },
  { files: ['src/app/api/student/live-classes/[classId]/leave/route.ts'], msg: 'fix(api): set force-dynamic on student live-class leave handler' },
  { files: ['src/app/api/student/live-classes/[classId]/route.ts'], msg: 'fix(api): mark student live-class detail route as force-dynamic' },
  { files: ['src/app/api/student/tests/[testId]/submit/route.ts'], msg: 'fix(api): mark student test submission endpoint as dynamic' },
  { files: ['src/app/api/teacher-admission/route.ts'], msg: 'fix(api): mark faculty and teacher admission submission as dynamic' },

  // 3. Sheryians Component Suite
  { files: ['src/components/sheryians/SheryiansLogo.tsx'], msg: 'feat(ui): add modern Sheryians geometric gradient logo component' },
  { files: ['src/components/sheryians/SheryiansTopBar.tsx'], msg: 'feat(ui): add top announcement ticker with urgency badge and CTA' },
  { files: ['src/components/sheryians/SheryiansSplash.tsx'], msg: 'feat(ui): add animated initial splash loader screen' },
  { files: ['src/components/sheryians/SheryiansNavbar.tsx'], msg: 'feat(ui): add responsive Sheryians floating navbar with mobile drawer' },
  { files: ['src/components/sheryians/SheryiansFooter.tsx'], msg: 'feat(ui): add dark theme Sheryians footer with links and social icons' },
  { files: ['src/components/sheryians/CompanyTicker.tsx'], msg: 'feat(ui): add infinite hiring partners company marquee ticker' },
  { files: ['src/components/sheryians/SheryiansHero.tsx'], msg: 'feat(ui): add interactive hero section with 3D code playground' },
  { files: ['src/components/sheryians/CourseCatalog.tsx'], msg: 'feat(ui): add full-featured course catalog with category filters' },
  { files: ['src/components/sheryians/WhySheryians.tsx'], msg: 'feat(ui): add Sheryians methodology and pedagogy value grid' },
  { files: ['src/components/sheryians/CampusExperience.tsx'], msg: 'feat(ui): add offline classroom and bootcamp experience showcase' },
  { files: ['src/components/sheryians/MentorsSection.tsx'], msg: 'feat(ui): add industry mentors and expert instructors section' },
  { files: ['src/components/sheryians/RoadmapSection.tsx'], msg: 'feat(ui): add interactive full-stack learning roadmap' },
  { files: ['src/components/sheryians/CommunitySection.tsx'], msg: 'feat(ui): add developer community section with Discord and GitHub metrics' },
  { files: ['src/components/sheryians/TestimonialsSection.tsx'], msg: 'feat(ui): add alumni testimonials with video previews and stories' },
  { files: ['src/components/sheryians/FAQSection.tsx'], msg: 'feat(ui): add interactive accordion FAQ section for admissions' },
  { files: ['src/components/sheryians/BottomCTA.tsx'], msg: 'feat(ui): add high-converting bottom call-to-action banner' },
  { files: ['src/components/sheryians/CounselingModal.tsx'], msg: 'feat(ui): add 1-on-1 career counseling booking modal dialog' },
  { files: ['src/components/sheryians/SyllabusModal.tsx'], msg: 'feat(ui): add comprehensive course syllabus download modal' },
  { files: ['src/components/sheryians/index.ts'], msg: 'feat(ui): create centralized barrel export for Sheryians component suite' },

  // 4. Styling and Design System
  { files: ['tailwind.config.js'], msg: 'style(theme): extend Tailwind palette with Sheryians colors and keyframe animations' },
  { files: ['src/app/globals.css'], msg: 'style(css): implement dark Sheryians design system with glowing cards and buttons' },
  { files: ['src/components/GlobalBackground.tsx'], msg: 'style(ui): enhance cosmic starfield background with subtle ambient illumination' },
  { files: ['src/components/ClientLayout.tsx'], msg: 'style(layout): add smooth route transition bar to client layout shell' },

  // 5. Shared LMS & Core Components
  { files: ['src/components/ui/CartoonDatePicker.tsx'], msg: 'refactor(ui): update CartoonDatePicker with dark theme and orange accents' },
  { files: ['src/components/ui/CartoonDropdown.tsx'], msg: 'refactor(ui): modernize CartoonDropdown with smooth dark elevated menus' },
  { files: ['src/components/Navbar.tsx'], msg: 'refactor(ui): polish main navigation bar with active highlights and badges' },
  { files: ['src/components/AdmissionSection.tsx'], msg: 'refactor(ui): upgrade admission section cards with solid buttons and modern typography' },
  { files: ['src/components/HomeArticlesSection.tsx'], msg: 'refactor(ui): polish home articles section with vibrant orange tags and cards' },
  { files: ['src/components/lms/CourseCard.tsx'], msg: 'refactor(ui): modernize LMS CourseCard with glowing borders and rating badges' },
  { files: ['src/components/lms/Footer.tsx'], msg: 'refactor(ui): update LMS Footer with newsletter card and social links' },

  // 6. Pages
  { files: ['src/app/layout.tsx'], msg: 'feat(seo): update root layout metadata and viewport styling' },
  { files: ['src/app/page.tsx'], msg: 'feat(home): integrate full Sheryians-inspired luxury dark portal on home page' },
  { files: ['src/app/about/page.tsx'], msg: 'feat(about): refresh about page with institute vision and faculty highlights' },
  { files: ['src/app/admission/page.tsx'], msg: 'feat(admission): revamp admission page with sleek multi-stage enrollment options' },
  { files: ['src/app/articles/page.tsx'], msg: 'feat(articles): modernize articles index with category pills and search' },
  { files: ['src/app/contact/page.tsx'], msg: 'feat(contact): enhance contact page with inquiry form and interactive map' },
  { files: ['src/app/courses/page.tsx'], msg: 'feat(courses): revamp course discovery page with filter chips and search' },
  { files: ['src/app/feedback/page.tsx'], msg: 'feat(feedback): upgrade feedback submission form with ratings and testimonial cards' },
  { files: ['src/app/not-found.tsx'], msg: 'feat(ui): design modern 404 error page with quick action back buttons' },
  { files: ['src/app/notices/page.tsx'], msg: 'feat(notices): modernize academic circulars and board notices UI' },
  { files: ['src/app/rsat/page.tsx'], msg: 'feat(rsat): overhaul Raven Scholarship Admission Test registration interface' },
  { files: ['src/app/services/page.tsx'], msg: 'feat(services): modernize tutoring and mentorship services catalog' },
];

let createdCount = 0;

for (const item of commits) {
  try {
    for (const f of item.files) {
      if (fs.existsSync(f)) {
        execSync(`git add "${f}"`, { stdio: 'ignore' });
      }
    }
    // Check if there are staged changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const hasStaged = status.split('\n').some(line => line.startsWith('M ') || line.startsWith('A '));
    if (hasStaged) {
      execSync(`git commit -m "${item.msg}"`, { stdio: 'inherit' });
      createdCount++;
      console.log(`[${createdCount}] Committed: ${item.msg}`);
    } else {
      console.log(`Skipped (no staged changes): ${item.msg}`);
    }
  } catch (err) {
    console.error(`Error committing ${item.msg}:`, err.message);
  }
}

console.log(`\nSuccessfully created ${createdCount} commits!`);
