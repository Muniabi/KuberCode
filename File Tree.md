KuberCode/
├─ .github/
│ └─ workflows/
│ └─ frontend.yml
├─ @types/
│ └─ next-auth.d.ts
├─ app/
│ ├─ (auth)/
│ │ ├─ login/
│ │ │ └─ page.tsx
│ │ └─ register/
│ │ ├─ verifited/
│ │ │ └─ page.tsx
│ │ └─ page.tsx
│ ├─ account/
│ │ ├─ courses/
│ │ │ └─ page.tsx
│ │ ├─ homeworks/
│ │ │ └─ page.tsx
│ │ ├─ schedule/
│ │ │ └─ page.tsx
│ │ ├─ layout.tsx
│ │ └─ page.tsx
│ ├─ api/
│ │ ├─ auth/
│ │ │ └─ [...nextauth]/
│ │ │ └─ route.ts
│ │ ├─ courses/
│ │ │ └─ [courseId]/
│ │ │ ├─ achievements/
│ │ │ │ └─ route.ts
│ │ │ ├─ purchase/
│ │ │ │ └─ route.ts
│ │ │ └─ reviews/
│ │ │ └─ route.ts
│ │ ├─ devto/
│ │ │ └─ route.ts
│ │ ├─ email/
│ │ │ └─ send/
│ │ │ └─ route.ts
│ │ └─ news/
│ │ └─ route.ts
│ ├─ contact/
│ │ └─ page.tsx
│ ├─ courses/
│ │ ├─ [courseId]/
│ │ │ ├─ purchase/
│ │ │ │ ├─ page.tsx
│ │ │ │ └─ purchase-content.tsx
│ │ │ ├─ course-content.tsx
│ │ │ ├─ layout.tsx
│ │ │ ├─ not-found.tsx
│ │ │ └─ page.tsx
│ │ ├─ courses-content.tsx
│ │ └─ page.tsx
│ ├─ create/
│ │ ├─ dashboard/
│ │ │ └─ page.tsx
│ │ └─ page.tsx
│ ├─ faq/
│ │ └─ page.tsx
│ ├─ fonts/
│ │ ├─ BlobSpongeyLowercase.woff2
│ │ ├─ GeistMonoVF.woff
│ │ ├─ GeistVF.woff
│ │ └─ Neopixel - Templatica.pro.woff2
│ ├─ media/
│ │ ├─ video/
│ │ │ └─ [id]/
│ │ │ ├─ ClientVideoPage.tsx
│ │ │ └─ page.tsx
│ │ ├─ videos/
│ │ │ ├─ [videoId]/
│ │ │ │ └─ page.tsx
│ │ │ ├─ categories-section.tsx
│ │ │ ├─ home-view.tsx
│ │ │ └─ page.tsx
│ │ ├─ media-content.tsx
│ │ └─ page.tsx
│ ├─ privacy/
│ │ └─ page.tsx
│ ├─ support/
│ │ └─ page.tsx
│ ├─ terms/
│ │ └─ page.tsx
│ ├─ ClientLayout.tsx
│ ├─ favicon.ico
│ ├─ globals.css
│ ├─ layout.tsx
│ ├─ not-found.tsx
│ └─ page.tsx
├─ components/
│ ├─ cards/
│ │ └─ course-card.tsx
│ ├─ ForgotPasswordLink/
│ │ └─ index.tsx
│ ├─ media/
│ │ ├─ blog-service.ts
│ │ ├─ BlogSection.tsx
│ │ ├─ DigestSection.tsx
│ │ ├─ MediaHero.tsx
│ │ ├─ PodcastSection.tsx
│ │ ├─ types.ts
│ │ ├─ VideoPlayer.tsx
│ │ └─ VideoSection.tsx
│ ├─ myCourses/
│ │ ├─ CourseCard.tsx
│ │ └─ CourseCardList.tsx
│ ├─ onboarding/
│ │ ├─ steps/
│ │ │ ├─ completion.tsx
│ │ │ ├─ personal-info.tsx
│ │ │ ├─ preferences.tsx
│ │ │ └─ skills.tsx
│ │ ├─ onboarding-flow.tsx
│ │ └─ onboarding-progress.tsx
│ ├─ sections/
│ │ ├─ course-achievements.tsx
│ │ ├─ course-reviews.tsx
│ │ └─ courses-list.tsx
│ ├─ shared/
│ │ ├─ landing/
│ │ │ ├─ alumni-stories.tsx
│ │ │ ├─ best-authors.tsx
│ │ │ ├─ category-card-skeleton.tsx
│ │ │ ├─ category-card.tsx
│ │ │ ├─ container-scroll-animation.tsx
│ │ │ ├─ course-card.tsx
│ │ │ ├─ courses-slider.tsx
│ │ │ ├─ hero-3d.tsx
│ │ │ ├─ Integrations.tsx
│ │ │ ├─ IntegrationsColumn.tsx
│ │ │ ├─ lamp.tsx
│ │ │ ├─ main-info.tsx
│ │ │ ├─ popular-categories.tsx
│ │ │ └─ popular-courses.tsx
│ │ ├─ settings/
│ │ │ └─ settings-dialog.tsx
│ │ ├─ subscription/
│ │ │ └─ subscription.tsx
│ │ ├─ AccountButton.tsx
│ │ ├─ contact-form.tsx
│ │ ├─ container.tsx
│ │ ├─ CookieConsent.tsx
│ │ ├─ Footer.tsx
│ │ ├─ Header.tsx
│ │ ├─ index.ts
│ │ ├─ loader.tsx
│ │ ├─ profile-settings.tsx
│ │ ├─ providers.tsx
│ │ └─ theme-select.tsx
│ ├─ ui/
│ │ ├─ 3d-card.tsx
│ │ ├─ accordion.tsx
│ │ ├─ alert-dialog.tsx
│ │ ├─ avatar.tsx
│ │ ├─ background-gradient.tsx
│ │ ├─ badge.tsx
│ │ ├─ breadcrumb.tsx
│ │ ├─ button.tsx
│ │ ├─ card.tsx
│ │ ├─ carousel.tsx
│ │ ├─ checkbox.tsx
│ │ ├─ collapsible.tsx
│ │ ├─ dialog.tsx
│ │ ├─ dropdown-menu.tsx
│ │ ├─ form.tsx
│ │ ├─ index.ts
│ │ ├─ input-otp.tsx
│ │ ├─ input.tsx
│ │ ├─ label.tsx
│ │ ├─ navigation-menu.tsx
│ │ ├─ password-input.tsx
│ │ ├─ popover.tsx
│ │ ├─ progress.tsx
│ │ ├─ radio-group.tsx
│ │ ├─ scroll-area.tsx
│ │ ├─ select.tsx
│ │ ├─ separator.tsx
│ │ ├─ sheet.tsx
│ │ ├─ sidebar.tsx
│ │ ├─ skeleton.tsx
│ │ ├─ slider.tsx
│ │ ├─ sonner.tsx
│ │ ├─ switch.tsx
│ │ ├─ tabs.tsx
│ │ ├─ textarea.tsx
│ │ ├─ toast.tsx
│ │ ├─ toaster.tsx
│ │ ├─ tooltip.tsx
│ │ └─ use-toast.ts
│ ├─ app-sidebar.tsx
│ ├─ nav-main.tsx
│ ├─ nav-projects.tsx
│ ├─ nav-secondary.tsx
│ ├─ nav-user.tsx
│ ├─ roadmap.tsx
│ ├─ SimpleRoadmap.tsx
│ └─ theme-provider.tsx
├─ docs/
│ ├─ ProjectDocumentation.md
│ ├─ TZ.md
│ └─ UseCases.md
├─ hooks/
│ ├─ use-mobile.tsx
│ ├─ use-toast.ts
│ ├─ useCourseProgress.ts
│ ├─ useCoursePurchase.ts
│ └─ useReviews.ts
├─ lib/
│ ├─ data/
│ │ └─ videos.ts
│ └─ utils.ts
├─ public/
│ ├─ best-authors/
│ │ ├─ author1.png
│ │ ├─ author2.png
│ │ ├─ author3.png
│ │ ├─ author4.png
│ │ └─ vitya.avif
│ ├─ popular-courses/
│ │ ├─ course1.png
│ │ ├─ course2.png
│ │ ├─ course3.png
│ │ ├─ course4.png
│ │ └─ course5.png
│ ├─ svg/
│ │ ├─ AntDesign.svg
│ │ ├─ bun.svg
│ │ ├─ c.svg
│ │ ├─ c#.svg
│ │ ├─ c++.svg
│ │ ├─ chartjs.svg
│ │ ├─ clerck.svg
│ │ ├─ css.svg
│ │ ├─ D3js.svg
│ │ ├─ dart.svg
│ │ ├─ docker.svg
│ │ ├─ flutter.svg
│ │ ├─ git.svg
│ │ ├─ gitlab.svg
│ │ ├─ go.svg
│ │ ├─ html5.svg
│ │ ├─ java.svg
│ │ ├─ JavaScript.svg
│ │ ├─ kotlin.svg
│ │ ├─ linux.svg
│ │ ├─ mongodb.svg
│ │ ├─ nextjs.svg
│ │ ├─ nodejs.svg
│ │ ├─ pinia.svg
│ │ ├─ python.svg
│ │ ├─ react.svg
│ │ ├─ redis.svg
│ │ ├─ shadcn.svg
│ │ ├─ supabase.svg
│ │ ├─ swagger.svg
│ │ ├─ swift.svg
│ │ ├─ tailwindcss.svg
│ │ ├─ TypeScript.svg
│ │ ├─ ubuntu.svg
│ │ ├─ versel.svg
│ │ └─ vite.svg
│ ├─ avatar1.png
│ ├─ avatar2.png
│ ├─ cookie.avif
│ ├─ course-school-bg.svg
│ ├─ github.png
│ ├─ github.svg
│ ├─ google.png
│ ├─ hackaton.webp
│ ├─ linear.png
│ ├─ robots.txt
│ ├─ vk.png
│ └─ yandex_9fa408ddedb1f6cf.html
├─ store/
│ ├─ courses.ts
│ └─ useAuthStore.ts
├─ types/
│ └─ course.ts
├─ utils/
│ └─ services/
│ ├─ Authentication.ts
│ ├─ emailService.ts
│ ├─ imageOptimization.ts
│ └─ StudentService.ts
├─ .env
├─ .gitignore
├─ .nvmrc
├─ components.json
├─ docker-compose.frontend.yml
├─ Dockerfile
├─ File Tree.md
├─ localStorage.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ routes.html
├─ tailwind.config.ts
└─ tsconfig.json
