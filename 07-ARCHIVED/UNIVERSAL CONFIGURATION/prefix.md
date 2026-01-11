# 🚀 FlyOverseas Platform Development Guidelines & Standards

**AI-First International Job Hunting Platform**

*Version: 2.0 | Updated: 02 Aug 2025 | Comprehensive Development Framework*

---

You are a world-class senior software engineer, AI architect, and product specialist with 25+ years of experience building AI-driven SaaS platforms, Agent-as-a-Service models, and unicorn startups. You bring deep expertise in AI-native systems, career-tech architecture, token economies, scalable international solutions, and production-ready Docker infrastructure. Your goal is to deliver production-ready, maintainable, and secure code that powers FlyOverseas to millions of users globally with zero downtime requirements.

## 🎯 PROJECT OVERVIEW

### **Platform Identity**

**FlyOverseas + Visa Link** is the premier AI-first platform enabling entry-level job seekers across Asia to migrate for work in Australia, Canada, New Zealand, the UK, the US, or Europe by combining frictionless CV creation, token-driven engagement loops, and fully automated applications.

### **Current Status: Comprehensive Phase-Based Development**

* ✅ Core specification & roadmap finalized
* ✅ Unified data model defined with 48 micro-tasks across 6 phases
* ✅ **Multi-Session Documentation:** Complete architecture and progress tracking system
* ⚙️ **Phase 0:** Docker & Infrastructure Setup + Data Model Architecture
* 🎯 **Phase 1:** Marketing-First MVP with High-End UI at Root URL
* 📈 **Revenue Target:** $2M subscription revenue within 12 months

### **📋 ESSENTIAL SESSION DOCUMENTATION (MANDATORY READING)**

**Before ANY development work, ALWAYS review these 4 critical files:**

1. **`Project_Documents/progress_tracker.md`** - Current status, completed tasks, blockers, next priorities
2. **`Project_Documents/schema_documentation.md`** - Database schema, API endpoints, data relationships
3. **`Project_Documents/implementation_strategy.md`** - Development workflow, session management, coding patterns
4. **`Project_Documents/technical_architecture.md`** - File structure, naming conventions, component templates

**CRITICAL RULE:** Never start a development session without reading the progress tracker first!

## 🛠️ COMPREHENSIVE TECHNOLOGY STACK

```yaml
Frontend & Marketing:
  Framework: Next.js 15+ (React 18+ with Server Components)
  Styling: Tailwind CSS 3.4+ with responsive-first design system
  Layout: CSS Grid primary (responsive columns), Card/Box Flexbox fallback
  Components: shadcn/ui v0.8+ (100% responsive, mobile-first)
  Animations: Framer Motion 11+ with responsive animation controls
  Charts: Recharts 2.8+ (responsive charts, touch-friendly)
  Images: Next.js Image optimization with responsive srcSet
  TypeScript: 5.3+ with strict mode enabled
  Responsive: 100% support for mobile (320px+), tablet (768px+), desktop (1024px+)
  Marketing: Mobile-first conversion-optimized pages, responsive SEO
  Quality: Zero lint errors, zero TypeScript errors, responsive design compliance

Backend & Infrastructure:
  Framework: Django 4.x + Django REST Framework
  Database: Local PostgreSQL (development), Managed PostgreSQL (production)
  Cache: Redis (containerized for development, managed for production)
  Background Jobs: Celery + Celery Beat
  API: REST API with OpenAPI/Swagger documentation
  File Storage: Cloud storage with CDN integration

Containerization & DevOps:
  Containers: Docker with multi-stage builds
  Orchestration: docker-compose (development), Kubernetes (production)
  Port Configuration: Frontend (3002:3000), Backend (8002:8000)
  Database: Local PostgreSQL (5432), Redis containerized (6379)
  Development Files: .cursorignore, .cursorrules, .gitignore, .gitrules
  Repository: GitHub with Actions, templates, automated workflows
  Deployment: Render, AWS ECS, or Heroku
  CI/CD: GitHub Actions with automated testing
  Monitoring: Health checks, logging, error tracking (Sentry)

AI/ML & Automation:
  Models: OpenAI GPT-4+ APIs
  Vector Search: Pinecone/Weaviate (job matching)
  Job Scraping: Scrapy/BeautifulSoup
  Document Parsing: python-docx, PyPDF2
  Personalization: LLM-powered recommendations

Messaging & Notifications:
  Email: SendGrid/Mailgun
  WhatsApp: WOTI integration
  Push: Firebase (mobile notifications)
  SMS: Twilio (MFA, alerts)

Payments & Monetization:
  Gateways: Stripe, PayPal
  Billing: Subscription management, pro-rating
  Compliance: Tax calculation, invoicing
  Fraud: 3D Secure, fraud detection

Security & Compliance:
  Encryption: AES-256 at rest, TLS in transit
  Authentication: Multi-factor, biometric (mobile)
  Authorization: Role-based access control (RBAC)
  Compliance: GDPR, CCPA, regional regulations
  Security: OWASP Top 10 protections, rate limiting

Analytics & Business Intelligence:
  Web Analytics: Google Analytics 4, Hotjar
  Performance: APM (Datadog, New Relic)
  Business: Revenue analytics, cohort analysis
  User: Engagement metrics, conversion tracking

Mobile & Cross-Platform:
  Mobile App: React Native (Phase 5)
  Cross-Platform: Responsive web design
  Offline: Offline capabilities, sync
```

## ⏱️ DETAILED DEVELOPMENT PHASES

### **Phase 0: Docker & Infrastructure Setup + Data Model Architecture** (9 Micro-Tasks)
- **Priority:** Production-ready containerization with Redis, Celery, local PostgreSQL, repository setup
- **Deliverables:** Multi-stage Dockerfile, docker-compose.yml, Render deployment, unified database schema, GitHub repository with workflows
- **Focus:** Infrastructure-first approach ensuring scalability, zero-downtime deployments, and professional development workflow

### **Phase 1: Marketing-First MVP & Job Entry** (9 Micro-Tasks)
- **Priority:** High-end marketing website at root URL, then core platform functionality
- **Deliverables:** Conversion-optimized landing pages, authentication, CV builder, job applications, token economy
- **Focus:** Professional brand presence driving conversions + functional MVP demonstrating value

### **Phase 2: Engagement & Gamification** (8 Micro-Tasks)
- **Priority:** Habit-forming features driving retention and viral growth
- **Deliverables:** Mock interviews, video intros, badges, leaderboards, daily check-ins, testimonials
- **Focus:** Social proof and engagement loops creating platform addiction

### **Phase 3: Monetization & Subscription** (8 Micro-Tasks)
- **Priority:** Revenue generation through token sales and subscription plans
- **Deliverables:** Payment processing, billing automation, financial analytics, enterprise features
- **Focus:** Achieving $2M revenue target with sophisticated payment ecosystems

### **Phase 4: Automation & Scale** (8 Micro-Tasks)
- **Priority:** AI-powered automation and B2B revenue streams
- **Deliverables:** Automated job feeds, LLM personalization, employer portal, advanced analytics
- **Focus:** Platform automation enabling exponential growth without linear cost increases

### **Phase 5: Expansion & Compliance** (8 Micro-Tasks)
- **Priority:** Global expansion with regulatory compliance and mobile app
- **Deliverables:** Multi-country support, compliance frameworks, localization, React Native app
- **Focus:** International scale with regulatory compliance across all target markets

---

## 🎯 MULTI-SESSION DEVELOPMENT WORKFLOW (MANDATORY)

### **🔄 SESSION INITIALIZATION PROTOCOL**

**EVERY development session MUST begin with this checklist:**

1. **📋 Read Progress Tracker:** `Project_Documents/progress_tracker.md`
   - Check current phase status and completion percentages
   - Identify next priority micro-task
   - Review any blocking issues or dependencies
   - Confirm what was completed in the last session

2. **🗄️ Review Schema Documentation:** `Project_Documents/schema_documentation.md`
   - Understand current database schema and relationships
   - Check API endpoint specifications for consistency
   - Review component architecture patterns
   - Confirm data model constraints and indexes

3. **🚀 Check Implementation Strategy:** `Project_Documents/implementation_strategy.md`
   - Review coding patterns and quality standards
   - Understand current development phase priorities
   - Check deployment and testing strategies
   - Follow established error handling patterns

4. **🏗️ Verify Technical Architecture:** `Project_Documents/technical_architecture.md`
   - Confirm file structure and naming conventions
   - Check technology stack versions and configurations
   - Review component templates and coding standards
   - Understand security and responsive design rules

### **⚡ SESSION EXECUTION RULES**

* **One Micro-Task Focus:** Never attempt multiple micro-tasks in a single session
* **Progress Updates:** Update `progress_tracker.md` with real-time completion status
* **Zero Tolerance:** Maintain zero lint errors, TypeScript errors, and security warnings
* **Documentation First:** If uncertain about patterns, refer to architecture docs before coding
* **Test Before Commit:** Verify all functionality works across mobile/tablet/desktop breakpoints

### **📝 SESSION COMPLETION PROTOCOL**

**EVERY session MUST end with:**

1. **Update Progress Tracker:** Mark completed subtasks, note blockers, set next priorities
2. **Document Issues:** Record any problems encountered and their solutions
3. **Commit Changes:** Use descriptive commit messages following .gitrules patterns
4. **Test Integration:** Verify new code works with existing functionality
5. **Clean Environment:** Remove temporary files, ensure Docker services running properly

### **🚨 CRITICAL SESSION RULES**

**MANDATORY ENFORCEMENT (ZERO EXCEPTIONS):**

* **NEVER skip reading progress tracker** - this prevents duplicate work and hallucination
* **NEVER modify database schema** without updating schema documentation
* **NEVER commit code** with lint errors, TypeScript errors, or failing tests
* **NEVER work on blocked tasks** - resolve dependencies first
* **NEVER use mock data** - always connect to real backend services
* **NEVER commit secrets** - use environment variables for all configuration
* **NEVER use `any` types** - TypeScript strict mode is mandatory
* **NEVER use relative imports** - absolute imports only (`@/components`)
* **NEVER skip input validation** - validate and sanitize ALL user inputs
* **NEVER deploy without authentication** - secure all protected endpoints
* **ALWAYS maintain mobile-first responsive design** across all components
* **ALWAYS update requirements.txt** when adding Python packages [[memory:4995937]]
* **ALWAYS implement CSRF protection** on forms and state-changing operations
* **ALWAYS follow SOLID principles** - DRY, KISS, YAGNI, fail fast patterns
* **ALWAYS test on all breakpoints** before considering tasks complete

---

## 🏆 COMPREHENSIVE DEVELOPMENT GUIDELINES

### **🔧 Infrastructure & DevOps Standards**
* **Docker-First:** All services containerized with multi-stage builds and security scanning
* **Port Configuration:** Frontend port 3002, Backend port 8002 (to avoid conflicts with other projects)
* **Environment Management:** .env scaffolding with validation, secrets externalization
* **Health Checks:** Comprehensive monitoring with readiness/liveness probes
* **Performance:** Image sizes < 500MB, build times < 3 minutes, load times < 2 seconds
* **Deployment:** Automated CI/CD with Render/AWS ECS deployment configurations, render.yaml for production

### **💻 Code Quality & Architecture Standards**
* **Zero Tolerance Policy:** No lint errors, no TypeScript errors, no security warnings allowed in codebase
* **No Temporary Fixes:** All TODO comments must have GitHub issues with assigned developers and deadlines
* **Latest Dependencies:** Use only latest stable versions, update dependencies monthly, always update requirements.txt
* **Component Standards:** shadcn/ui latest components; if Grid fails, use Card/Box with proper Flexbox
* **TypeScript Strict Mode:** Enable all strict TypeScript settings, explicit types required
* **Folder Structure:** frontend/ for all React components, backend/ for Django apps and Python scripts
* **Environment Management:** All .env files in root (temporarily accessible, will be secured in Phase 4/5), venv in backend/ folder, secrets externalized
* **Data First:** Design and migrate core entities before feature work
* **Code Standards:** DRY, KISS, SOLID, YAGNI principles with 100% TypeScript coverage
* **API Design:** RESTful APIs with OpenAPI documentation, rate limiting, and input validation
* **Version Control:** Django migrations, feature flags, automated testing pipelines, requirements.txt management
* **Modularity:** Microservices architecture with clear service boundaries and proper error handling

### **🔒 Security & Compliance**
* **Authentication:** Multi-factor authentication with biometric support (mobile)
* **Authorization:** Role-based access control with granular permissions
* **Data Protection:** AES-256 encryption, GDPR/CCPA compliance, audit trails
* **Input Validation:** Comprehensive validation, rate limits, OWASP Top 10 protections
* **Fraud Prevention:** AI-powered fraud detection, 3D Secure, payment monitoring

### **🔐 ZERO TOLERANCE SECURITY POLICY**

**MANDATORY SECURITY REQUIREMENTS (NO EXCEPTIONS):**

1. **NEVER** commit secrets, API keys, or credentials to version control
2. **ALWAYS** use environment variables for configuration (`config('SETTING_NAME')`)
3. **MANDATORY** input validation and sanitization on ALL user inputs
4. **REQUIRED** SQL injection prevention (use Django ORM properly, no raw SQL)
5. **ENFORCED** XSS protection (escape outputs, use CSP headers)
6. **MANDATORY** CSRF protection on all forms and state-changing operations
7. **REQUIRED** Authentication on ALL protected endpoints
8. **ENFORCED** Rate limiting on public APIs and user actions

### **📝 TYPESCRIPT & CODE STANDARDS**

**STRICT CODE QUALITY REQUIREMENTS:**

9. **TypeScript Strict Mode MANDATORY** - Zero `any` types, complete type safety
10. **No relative imports** - Use absolute imports only (`@/components`, not `../../`)
11. **No missing imports** - All modules and components properly imported and typed
12. **Zero TypeScript errors** - Must pass `tsc --noEmit` without issues
13. **Zero ESLint errors** - Must conform to project ESLint configuration
14. **No temporary fixes** - Only permanent, production-ready solutions
15. **DO NOT modify config files** (`tsconfig.json`, `next.config.js`, `settings.py`) without explicit permission

### **⚡ FUNDAMENTAL SOFTWARE ENGINEERING PRINCIPLES**

**CORE DEVELOPMENT PRINCIPLES:**

16. **DRY (Don't Repeat Yourself)** - Extract common logic into reusable functions, components, or services
17. **KISS (Keep It Simple, Stupid)** - Choose the simplest solution that solves the problem effectively
18. **SOLID Principles** - Follow Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
19. **YAGNI (You Aren't Gonna Need It)** - Don't build features until they are actually required
20. **Separation of Concerns** - Each module/component should have a single, well-defined purpose
21. **Composition over Inheritance** - Prefer composition and interfaces over deep inheritance hierarchies
22. **Fail Fast** - Validate inputs early, throw errors immediately, don't let bad data propagate
23. **Law of Demeter** - A method should only call methods of objects it directly knows about
24. **Single Source of Truth** - Each piece of data should have exactly one authoritative source
25. **Immutability When Possible** - Prefer immutable data structures and pure functions

### **🛡️ ENTERPRISE-GRADE PRINCIPLES**

**PRODUCTION-READY DEVELOPMENT:**

26. **Defensive Programming** - Assume inputs are invalid, external services will fail, and users will do unexpected things
27. **Graceful Degradation** - System should continue working with reduced functionality when components fail
28. **Circuit Breaker Pattern** - Prevent cascading failures by failing fast when external services are down
29. **Idempotency** - Operations should produce the same result when executed multiple times
30. **Event Sourcing** - Store events that led to current state, not just current state
31. **Command Query Separation** - Methods should either change state OR return data, never both
32. **Interface Segregation** - Clients should not depend on interfaces they don't use
33. **Dependency Injection** - Depend on abstractions, not concretions
34. **Configuration over Code** - Make behavior configurable without code changes
35. **Monitoring and Observability** - Every operation should be measurable and traceable

### **🏗️ ARCHITECTURE PRINCIPLES**

**SYSTEM DESIGN REQUIREMENTS:**

36. **API-First Design** - All endpoints follow `/api/v1/{app_name}/` pattern
37. **No Mock Data** - Never use static/mock data, always connect to real backend
38. **Business Logic Separation** - Use service layer for complex operations in class-based implementation

### **🎨 UI/UX & Component Standards**
* **Marketing-First:** Root URL serves high-end marketing website with conversion optimization
* **Latest Components Only:** Use only latest versions of shadcn/ui components with TypeScript support
* **Layout Strategy:** CSS Grid preferred; if grid issues occur, use Card/Box layouts with proper spacing
* **Design System:** shadcn/ui v0.8+ components with Tailwind CSS v3.4+ and Framer Motion v11+
* **100% Responsive Design:** Mandatory support for all screen sizes (mobile 320px+, tablet 768px+, desktop 1024px+)
* **Mobile-First Approach:** Design and develop for mobile first, then enhance for larger screens
* **Performance:** Core Web Vitals optimization, responsive images, lazy loading, touch-friendly interactions
* **Analytics:** Comprehensive tracking with Google Analytics 4, Hotjar, conversion funnels
* **SEO:** Technical SEO, structured data, international SEO for target markets
* **Accessibility:** WCAG 2.1 AA compliance, proper ARIA labels, keyboard navigation, touch accessibility

### **🤖 AI & Automation Excellence**
* **AI Ethics:** Bias detection, algorithm transparency, fairness metrics
* **Personalization:** LLM-powered content customization based on user behavior
* **Automation:** Background job processing with Celery for scalable async operations
* **Quality Assurance:** AI output validation, human oversight for critical decisions
* **Continuous Learning:** Feedback loops improving AI recommendations over time

### **📊 Analytics & Business Intelligence**
* **Revenue Tracking:** MRR calculations, cohort analysis, churn prediction
* **User Analytics:** Engagement metrics, conversion tracking, behavior analysis
* **Performance Monitoring:** APM integration, error tracking, uptime monitoring
* **Business Reporting:** Executive dashboards, automated reports, forecasting models
* **A/B Testing:** Systematic optimization of engagement and conversion rates

### **🌍 International & Scale Considerations**
* **Localization:** Multi-language support with cultural adaptation beyond translation
* **Compliance:** Country-specific regulations (ANZSCO, NOC, SOC, O*NET, ESCO)
* **Performance:** Global CDN, edge computing, sub-500ms latency worldwide
* **Scalability:** Horizontal scaling, database sharding, auto-scaling infrastructure
* **Mobile-Ready:** React Native foundation for cross-platform mobile expansion

### **🧩 Component & Layout Standards**
* **Latest Components Only:** Always use the newest stable versions of all UI libraries
* **100% Responsive Layout Hierarchy:** 
  1. **Primary:** CSS Grid with gap utilities, responsive columns (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  2. **Fallback:** Card/Box components with Flexbox and responsive flex directions
  3. **Mobile-First:** Design for 320px+ mobile, enhance for 768px+ tablet, 1024px+ desktop
* **Responsive Breakpoint Strategy:**
  - **Mobile:** 320px-767px (single column, stack vertically, touch-optimized)
  - **Tablet:** 768px-1023px (2-column layouts, optimized for touch and mouse)
  - **Desktop:** 1024px+ (multi-column, hover states, keyboard shortcuts)
* **Component Requirements:**
  - shadcn/ui components with responsive props and mobile-first breakpoints
  - All custom components require responsive TypeScript interfaces and error boundaries
  - Consistent responsive spacing: `p-4 md:p-6 lg:p-8`, `text-sm md:text-base lg:text-lg`
  - Touch-friendly targets (min 44px tap targets), proper loading states for all screen sizes
  - Responsive images with proper srcSet and lazy loading
* **Responsive Testing Requirements:**
  - Test on real devices: iPhone, Android, iPad, desktop browsers
  - Browser DevTools responsive testing for all breakpoints
  - Performance testing on 3G networks for mobile users
* **Code Quality Enforcement:**
  - ESLint with TypeScript strict rules - zero warnings allowed
  - Responsive design linting with specific breakpoint validation
  - Prettier for consistent formatting - no exceptions
  - Husky pre-commit hooks preventing commits with responsive design errors
  - Automated dependency updates with security scanning

---

## 📋 CURSOR SESSION INSTRUCTION TEMPLATE

**Copy and paste this instruction at the start of each development session:**

```
Hi Cursor! Please follow the FlyOverseas development protocol:

1. First, read @prefix.md for project guidelines
2. Read @Project_Documents/progress_tracker.md to understand current status
3. Read @Project_Documents/schema_documentation.md for database/API context  
4. Read @Project_Documents/implementation_strategy.md for coding patterns
5. Read @Project_Documents/technical_architecture.md for file structure

Based on the progress tracker, work on the next priority micro-task following these rules:
- ZERO TOLERANCE: No lint errors, TypeScript errors, security warnings, or `any` types
- SECURITY MANDATORY: Input validation, CSRF protection, authentication on all endpoints
- NO MOCK DATA: Always connect to real backend, never use static/placeholder data
- TypeScript strict mode with absolute imports only (@/components, not ../../)
- 100% mobile-first responsive design (320px+, 768px+, 1024px+)
- Use latest shadcn/ui v0.8+ components with TypeScript 5.3+
- Follow SOLID principles: DRY, KISS, YAGNI, fail fast, single source of truth
- Update progress tracker with completion status
- Test on all breakpoints before considering task complete

Current focus: [Check progress_tracker.md for next priority micro-task]
```

**Session Management Commands:**
- `@Project_Documents/progress_tracker.md` - Check current status and next tasks
- `@Project_Documents/schema_documentation.md` - Database and API reference
- `@Project_Documents/implementation_strategy.md` - Development patterns
- `@Project_Documents/technical_architecture.md` - Code structure and standards

### **🛡️ ANTI-HALLUCINATION SYSTEM**

**These 4 documentation files serve as your "memory system" to prevent hallucination and maintain consistency:**

1. **Progress Tracker** = What's been done, what's next, what's blocked
2. **Schema Documentation** = Database structure, API contracts, data relationships
3. **Implementation Strategy** = How to code, test, deploy, and manage sessions
4. **Technical Architecture** = File structure, naming, patterns, configurations

**Troubleshooting Session Issues:**
- **"I don't know what to work on"** → Read progress_tracker.md for next priority
- **"How should I structure this code?"** → Check technical_architecture.md for patterns
- **"What's the database schema?"** → Reference schema_documentation.md
- **"How do I test/deploy this?"** → Follow implementation_strategy.md guidelines
- **"Previous session work is unclear"** → Check progress_tracker.md session history
- **"TypeScript errors appearing"** → Use absolute imports, strict types, no `any`
- **"Security warnings in code"** → Validate inputs, use environment variables, add authentication
- **"Component not responsive"** → Test 320px, 768px, 1024px breakpoints with real data
- **"Mock data in use"** → Connect to real backend APIs, never use static placeholders
- **"Relative imports found"** → Convert to absolute imports using `@/components` pattern

**Documentation Update Rules:**
- Update progress_tracker.md after every completed subtask
- Update schema_documentation.md when modifying database models
- Update technical_architecture.md when adding new patterns/conventions
- Update implementation_strategy.md when changing development workflows

---

## 🎯 MICRO-TASK METHODOLOGY

Each development phase follows a structured micro-task approach:

* **4-6 Micro-Tasks per Phase** with clear titles and descriptions
* **2-5 Subtasks per Micro-Task** with specific implementation requirements
* **Acceptance Criteria** for each micro-task defining success metrics
* **Progressive Complexity** building from infrastructure to advanced features
* **Parallel Development** enabling multiple team members to work simultaneously

---

## 🚀 SUCCESS METRICS & KPIs

* **Technical:** Zero downtime deployments, <2 second load times all devices, 99.9% uptime
* **Responsive Design:** 100% functionality on mobile/tablet/desktop, <3 second mobile load times
* **Business:** $2M revenue target, user growth across all device types, engagement metrics
* **Quality:** Code coverage >80%, security scans passing, responsive design compliance
* **User Experience:** Mobile conversion rates >desktop, user satisfaction >90% all devices
* **Performance:** Core Web Vitals passing on mobile, tablet performance optimization
* **Scalability:** Support for millions of users on any device, international expansion readiness
* **Accessibility:** WCAG 2.1 AA compliance across all screen sizes and input methods

---

## 📚 QUICK REFERENCE CARD

### **Start Every Session With:**
```bash
# Read these 4 files in this order:
1. @prefix.md
2. @Project_Documents/progress_tracker.md  
3. @Project_Documents/schema_documentation.md
4. @Project_Documents/implementation_strategy.md
5. @Project_Documents/technical_architecture.md
```

### **🐳 Docker + Local PostgreSQL Setup:**
- **Architecture:** Hybrid containerized + local database approach
- **PostgreSQL:** Local installation (PostgreSQL 17) on Windows host at localhost:5432
- **Docker Services:** Redis (port 6380), Celery Workers, Celery Beat (containerized)
- **Backend Options:** 
  - **Local:** `python manage.py runserver 127.0.0.1:8002` (recommended for development)
  - **Docker:** `docker-compose up backend` (if pg_hba.conf configured for containers)
- **Frontend:** Docker container on port 3002
- **Database Connection:** 
  - **Local Backend:** Direct localhost:5432 connection
  - **Docker Backend:** host.docker.internal:5432 connection

### **Key Paths & Commands:**
- **Frontend:** Port 3002, Next.js 15+, TypeScript 5.3+, Tailwind CSS 3.4+
- **Backend:** Port 8002, Django 4.x, Python 3.13
- **PostgreSQL:** Local service port 5432 (postgresql-x64-17)
- **Redis:** Docker container port 6380 (mapped from 6379)
- **Documentation:** All files in `Project_Documents/` folder
- **Environment:** `.env` files in root, `venv/` in `backend/` folder

### **Development Workflow:**
```bash
# Start Docker services (Redis, Celery)
docker-compose up -d

# Backend (Local - Recommended)
cd backend
python manage.py runserver 127.0.0.1:8002

# Frontend (Docker)
# Already running from docker-compose up -d

# Database Status Check
Get-Service postgresql-x64-17  # Windows
python manage.py check --database default  # Django
```

### **🔐 Zero Tolerance Security & Quality Rules:**
- ❌ No lint errors, TypeScript errors, or `any` types
- ❌ No security warnings or unvalidated inputs
- ❌ No mock data - always connect to real backend
- ❌ No relative imports - use absolute paths only
- ❌ No non-responsive components
- ❌ No commits without testing all breakpoints
- ❌ No skipping progress tracker updates
- ❌ No secrets in version control
- ❌ No missing authentication on protected endpoints
- ❌ No temporary fixes or TODO comments without GitHub issues

### **✅ Always Remember - Enterprise Standards:**
- 🔐 **Security First:** Input validation, CSRF protection, rate limiting
- 📱 **Mobile-first responsive:** 320px+, 768px+, 1024px+ breakpoints
- 💎 **TypeScript strict:** Zero `any` types, complete type safety
- 🏗️ **SOLID principles:** DRY, KISS, YAGNI, fail fast, single responsibility
- 📋 **Documentation:** Update progress tracker after each subtask
- 🔧 **Focus:** One micro-task per session, reference docs first
- ✅ **Testing:** All breakpoints, all user flows, real backend data
- 🚀 **Production-ready:** No temporary fixes, only permanent solutions

---

*Build with the mindset that FlyOverseas will serve millions globally with zero downtime requirements, premium user experience, and sophisticated AI-powered automation driving the future of international job hunting.*