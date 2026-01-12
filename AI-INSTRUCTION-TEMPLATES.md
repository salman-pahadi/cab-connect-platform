# 🤖 UNIVERSAL AI ASSISTANT INSTRUCTIONS

**Universal Template for All AI Coding Assistants**  
*Works with: VS Code Copilot, Cursor, Windsurf, Codeium, GitHub Copilot Chat, and more*

---

## 📋 HOW TO USE THIS FILE

1. **Copy** the relevant template below
2. **Fill in** the [BRACKETED] sections with your requirements
3. **Paste** into your AI assistant's chat
4. **Press Enter** and let the AI work

**File References:**
- `@filename` - Use @ symbol if your IDE supports it (Cursor, Windsurf)
- Otherwise, write: "Read the file: filename" or "Reference: filename"

---

## 🚀 TEMPLATE 1: SESSION START (Use Every Time)

```
=== CAB CONNECT DEVELOPMENT SESSION ===

📚 Load Documentation Framework:
- prefix.md (Development framework with 16 expert team)
- START-HERE.md (Project navigation)
- PROGRESS-TRACKER.md (Current status and micro-tasks)

📋 Session Protocol:
1. Read documentation files above
2. Identify current phase and next priority task
3. Follow zero tolerance quality rules (35 mandatory rules)
4. Reference canonical documents in 01-DOCUMENTATION/REFERENCE/
5. Use code templates from 03-DEVELOPMENT-GUIDES/implementation-strategy.md
6. Follow file structure from 04-CODING-STANDARDS/technical-architecture.md

⚠️ Zero Tolerance Rules (MANDATORY):
- NO TypeScript errors or `any` types
- NO lint errors or security warnings
- NO relative imports (use @/ absolute imports only)
- NO mock data (connect to real backend)
- YES input validation on all user inputs
- YES CSRF protection on all forms
- YES authentication on protected endpoints
- YES mobile-first responsive design (320px+, 768px+, 1024px+)

🎯 My Request:
[DESCRIBE WHAT YOU WANT TO DO]

Example: "Show me the next priority micro-task and help me implement it"
Example: "I want to implement WebSocket support for real-time tracking"
Example: "Review my code for compliance with project standards"
Example: "Help me fix a bug in the booking component"

📊 Context:
- Current File: [FILE YOU'RE WORKING ON, IF ANY]
- Issue/Goal: [SPECIFIC PROBLEM OR OBJECTIVE]
- Priority: [High/Medium/Low]

🤝 Expert Team Needed:
[Leave blank - AI will auto-select from 16 experts]

OR specify:
- Robert Chen (Full-Stack Architect)
- Sarah Martinez (UI/UX Design)
- Alex Morgan (Security)
- [See prefix.md for all 16 experts]
```

---

## 🔧 TEMPLATE 2: IMPLEMENT NEW FEATURE

```
=== IMPLEMENT NEW FEATURE ===

📚 Reference Files:
- prefix.md (Framework)
- PROGRESS-TRACKER.md (Current status)
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Code templates)
- 04-CODING-STANDARDS/technical-architecture.md (File structure)
- 01-DOCUMENTATION/REFERENCE/[RELEVANT_REFERENCE_DOC]

🎯 Feature to Implement:
[FEATURE NAME AND DESCRIPTION]

Example: "WebSocket Infrastructure for Real-Time Ride Tracking"
Example: "Payment Gateway Integration with Stripe"
Example: "Push Notifications using Firebase Cloud Messaging"

📋 Requirements:
[LIST SPECIFIC REQUIREMENTS]

Example:
- Support multiple concurrent WebSocket connections
- Authenticate connections using JWT tokens
- Broadcast location updates every 5 seconds
- Handle reconnection on network loss
- Store connection state in Redis

📂 Affected Components:
Backend: [Yes/No] - [Specific files if known]
Mobile: [Yes/No] - [Specific screens if known]
Admin Dashboard: [Yes/No] - [Specific pages if known]

✅ Implementation Steps:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]
[Add more as needed]

OR: "Break this down into implementation steps for me"

📊 Acceptance Criteria:
[DEFINE SUCCESS - HOW DO WE KNOW IT'S DONE?]

Example:
- [ ] WebSocket connections established successfully
- [ ] Authentication working on handshake
- [ ] Multiple clients can connect simultaneously
- [ ] Messages broadcast to all connected clients
- [ ] Tests passing (connection, auth, broadcast)
- [ ] Zero TypeScript errors, zero lint errors
- [ ] Documentation updated
- [ ] Progress tracker updated

🧪 Testing Requirements:
- Unit tests: [Required/Not required]
- Integration tests: [Required/Not required]
- Manual testing on: [Devices/browsers]

📝 Post-Implementation:
- Update PROGRESS-TRACKER.md with completion status
- Add session notes for future reference
- Mark subtasks as complete
```

---

## 🐛 TEMPLATE 3: FIX BUG OR ERROR

```
=== FIX BUG OR ERROR ===

📚 Reference Files:
- prefix.md (Framework and quality rules)
- 04-CODING-STANDARDS/technical-architecture.md (Code standards)
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Error handling patterns)

🐛 Bug Description:
[DESCRIBE THE PROBLEM]

Example: "TypeScript error in BookingCard component"
Example: "API endpoint returning 500 error"
Example: "Mobile app crashes on iOS when opening map"

📂 Affected File(s):
[FILE PATH(S)]

Example: 09-FRONTEND-MOBILE/src/components/booking/BookingCard.tsx

❌ Error Message (if applicable):
```
[PASTE FULL ERROR MESSAGE HERE]
```

📸 Current Code (if relevant):
```typescript
[PASTE PROBLEMATIC CODE HERE]
```

🔍 Expected Behavior:
[WHAT SHOULD HAPPEN]

📊 Current Behavior:
[WHAT IS ACTUALLY HAPPENING]

🧪 Steps to Reproduce:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]

🛠️ Fix Requirements:
- Follow zero tolerance rules (no `any` types, no lint errors)
- Maintain code consistency with existing patterns
- Add tests to prevent regression
- Update documentation if behavior changes

✅ Fix Verification:
- [ ] Error resolved
- [ ] Tests passing
- [ ] No new TypeScript/lint errors introduced
- [ ] Tested on all required devices/browsers
- [ ] Code reviewed against standards
```

---

## 👀 TEMPLATE 4: CODE REVIEW

```
=== CODE REVIEW REQUEST ===

📚 Reference Files:
- prefix.md (Quality standards and zero tolerance rules)
- 04-CODING-STANDARDS/technical-architecture.md (Code patterns)
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Best practices)
- 01-DOCUMENTATION/REFERENCE/10_SECURITY_GUIDELINES.md (Security)

📂 Code to Review:
File: [FILE PATH]

```[LANGUAGE]
[PASTE CODE HERE]
```

🔍 Review Checklist:

**Code Quality:**
- [ ] Zero TypeScript errors
- [ ] Zero ESLint warnings
- [ ] No `any` types used
- [ ] Proper type safety
- [ ] No relative imports (absolute @/ only)
- [ ] Follows naming conventions

**Security:**
- [ ] Input validation implemented
- [ ] No secrets in code
- [ ] Authentication required (if protected)
- [ ] Authorization checked
- [ ] CSRF protection (if form)
- [ ] XSS prevention

**Best Practices:**
- [ ] DRY (no code duplication)
- [ ] KISS (simple, clear logic)
- [ ] SOLID principles followed
- [ ] Proper error handling
- [ ] Loading states handled
- [ ] Empty states handled

**Testing:**
- [ ] Tests written
- [ ] Edge cases covered
- [ ] Error cases tested

**Responsive Design (if UI component):**
- [ ] Mobile (320px+) tested
- [ ] Tablet (768px+) tested
- [ ] Desktop (1024px+) tested
- [ ] Touch-friendly (44px min tap targets)
- [ ] Accessibility labels present

**Performance:**
- [ ] No unnecessary re-renders
- [ ] Proper memoization (if needed)
- [ ] Images optimized
- [ ] Lazy loading used

🎯 Specific Concerns:
[ANYTHING YOU'RE WORRIED ABOUT]

Example: "Is the WebSocket reconnection logic robust?"
Example: "Are there any security vulnerabilities?"
Example: "Is this component properly optimized?"
```

---

## 📝 TEMPLATE 5: CREATE NEW COMPONENT/FILE

```
=== CREATE NEW COMPONENT/FILE ===

📚 Reference Files:
- 04-CODING-STANDARDS/technical-architecture.md (File structure & templates)
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Code patterns)
- prefix.md (Quality rules)

📂 What to Create:
Type: [Backend API Endpoint / Mobile Component / Admin Dashboard Page / Service / Utility]
Name: [COMPONENT/FILE NAME]
Purpose: [WHAT IT DOES]

Example:
Type: Mobile Component
Name: BookingCard
Purpose: Display booking information in a card format with status indicator

📋 Requirements:

**Functionality:**
- [REQUIREMENT 1]
- [REQUIREMENT 2]
- [REQUIREMENT 3]

Example:
- Display booking details (pickup, dropoff, price, status)
- Show driver name and rating if assigned
- Handle tap to navigate to booking details
- Display status badge with color coding

**Props/Parameters:**
- [PROP/PARAM 1]: [TYPE] - [DESCRIPTION]
- [PROP/PARAM 2]: [TYPE] - [DESCRIPTION]

Example:
- booking: Booking - The booking object to display
- onPress: (bookingId: number) => void - Callback when card is tapped
- testID?: string - Optional test ID for testing

**Styling:**
- Follow theme constants (colors, spacing, typography)
- Responsive design (mobile, tablet, desktop)
- Match existing component styles

**Location:**
Backend: 08-BACKEND/app/[FOLDER]/[FILENAME].py
Mobile: 09-FRONTEND-MOBILE/src/[FOLDER]/[FILENAME].tsx
Admin: 10-ADMIN-DASHBOARD/src/[FOLDER]/[FILENAME].tsx

✅ Completion Criteria:
- [ ] Component created with proper types
- [ ] Follows naming conventions
- [ ] Uses absolute imports (@/)
- [ ] Responsive design implemented
- [ ] Accessibility labels added
- [ ] Tests written
- [ ] Zero TypeScript/lint errors
- [ ] Matches code template from technical-architecture.md

🎨 Template to Use:
[Specify which template from technical-architecture.md]

Example: "Use Backend API Endpoint Template"
Example: "Use React Native Screen Template"
Example: "Use Next.js Server Component Template"
```

---

## 🧪 TEMPLATE 6: WRITE TESTS

```
=== WRITE TESTS ===

📚 Reference Files:
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Testing strategy)
- 04-CODING-STANDARDS/technical-architecture.md (Test patterns)

📂 File to Test:
[FILE PATH]

🎯 Test Type:
[Unit / Integration / E2E]

📋 Test Cases Needed:

**Happy Path (Success Cases):**
1. [TEST CASE 1]
2. [TEST CASE 2]

Example:
1. Should display booking information correctly
2. Should call onPress when card is tapped

**Edge Cases:**
1. [EDGE CASE 1]
2. [EDGE CASE 2]

Example:
1. Should handle missing driver information
2. Should display correct status colors for each status type

**Error Cases:**
1. [ERROR CASE 1]
2. [ERROR CASE 2]

Example:
1. Should not crash with invalid booking data
2. Should display error state when API fails

**Security/Authorization (if applicable):**
1. [AUTH TEST 1]
2. [AUTH TEST 2]

Example:
1. Should require authentication for protected endpoint
2. Should return 403 for unauthorized access

✅ Test Requirements:
- Follow test patterns from implementation-strategy.md
- Use proper test file naming (test_name.py or Name.test.tsx)
- Include setup/teardown if needed
- Mock external dependencies
- Assert all requirements met

🧪 Testing Framework:
Backend: pytest
Mobile: Jest + React Native Testing Library
Admin: Jest + Vitest
```

---

## 🚀 TEMPLATE 7: DEPLOY/RELEASE

```
=== DEPLOYMENT REQUEST ===

📚 Reference Files:
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Deployment workflow)
- 01-DOCUMENTATION/REFERENCE/12_DEPLOYMENT_PLAN.md
- 02-PROJECT-PLANNING/DEPLOYMENT-READY-CHECKLIST.md

🎯 Deployment Target:
[Development / Staging / Production]

📦 What to Deploy:
[Backend / Mobile / Admin Dashboard / Marketing Site]

✅ Pre-Deployment Checklist:

**Code Quality:**
- [ ] All tests passing
- [ ] Zero TypeScript errors (tsc --noEmit)
- [ ] Zero ESLint errors (npm run lint)
- [ ] Zero security vulnerabilities (npm audit / safety check)
- [ ] Code reviewed

**Configuration:**
- [ ] Environment variables set
- [ ] Database migrations created and tested
- [ ] API endpoints documented (OpenAPI/Swagger)
- [ ] CORS configured correctly
- [ ] Rate limiting configured
- [ ] Error tracking enabled (Sentry)

**Performance:**
- [ ] Lighthouse score > 90 (frontend)
- [ ] Core Web Vitals passing
- [ ] Database queries optimized
- [ ] Images optimized (<200KB)
- [ ] Bundle size checked

**Security:**
- [ ] Authentication working
- [ ] Authorization enforced
- [ ] Input validation enabled
- [ ] CSRF protection enabled
- [ ] Rate limiting tested
- [ ] SSL certificate valid

**Documentation:**
- [ ] README updated
- [ ] API docs updated
- [ ] Changelog updated
- [ ] PROGRESS-TRACKER updated

🚀 Deployment Steps:
[Auto-generate from deployment workflow OR specify custom steps]

📝 Post-Deployment:
- Smoke tests
- Monitor error logs
- Check analytics
- Update team
```

---

## 💡 TEMPLATE 8: QUICK QUESTION

```
=== QUICK QUESTION ===

📚 Reference Files:
- prefix.md (Development framework)
[Add more if relevant to your question]

❓ Question:
[YOUR QUESTION HERE]

Examples:
- "What's the correct way to implement authentication in FastAPI?"
- "How should I structure the Redux store for real-time data?"
- "What's the proper naming convention for React Native components?"
- "How do I add a new API endpoint following project standards?"
- "What's the recommended way to handle WebSocket reconnection?"

📊 Context (if applicable):
[PROVIDE CONTEXT]

Example:
- Working on: Mobile app booking screen
- Current issue: Need to connect to WebSocket
- Already tried: [What you've attempted]
```

---

## 📚 TEMPLATE 9: UNDERSTAND EXISTING CODE

```
=== EXPLAIN EXISTING CODE ===

📚 Reference Files:
- 04-CODING-STANDARDS/technical-architecture.md (Code patterns)
- prefix.md (Project context)

📂 File to Explain:
[FILE PATH]

📋 Specific Questions:
[WHAT DO YOU WANT TO UNDERSTAND?]

Examples:
- "Explain how this component works"
- "What does this function do and why?"
- "How does data flow through this service?"
- "What's the purpose of this Redux slice?"
- "Explain the authentication flow"

🔍 Focus Areas (optional):
- [ ] Overall architecture
- [ ] Data flow
- [ ] Business logic
- [ ] Security implementation
- [ ] Performance optimizations
- [ ] Integration with other components

🎯 Use Case:
[WHY DO YOU NEED TO UNDERSTAND THIS?]

Example: "Need to modify this to add new feature"
Example: "Debugging an issue and need to understand flow"
Example: "Onboarding to project, learning codebase"
```

---

## 🔄 TEMPLATE 10: REFACTOR CODE

```
=== REFACTOR REQUEST ===

📚 Reference Files:
- prefix.md (Quality standards)
- 04-CODING-STANDARDS/technical-architecture.md (Code patterns)
- 03-DEVELOPMENT-GUIDES/implementation-strategy.md (Best practices)

📂 File to Refactor:
[FILE PATH]

```[LANGUAGE]
[PASTE CODE TO REFACTOR]
```

🎯 Refactoring Goals:
[SELECT ONE OR MORE]

- [ ] Improve code readability
- [ ] Reduce code duplication (DRY)
- [ ] Better error handling
- [ ] Improve type safety
- [ ] Better performance
- [ ] Simplify complex logic (KISS)
- [ ] Better separation of concerns
- [ ] Improve testability
- [ ] Add missing documentation
- [ ] Follow SOLID principles

📋 Constraints:
- Must maintain existing functionality
- Must not break existing tests
- Must follow project coding standards
- Must improve code quality metrics

✅ Success Criteria:
- [ ] Code more readable and maintainable
- [ ] All tests still passing
- [ ] Zero new TypeScript/lint errors
- [ ] Performance same or better
- [ ] Follows project patterns from technical-architecture.md
```

---

## 🎯 TEMPLATE 11: PROGRESS UPDATE

```
=== UPDATE PROGRESS TRACKER ===

📚 Reference File:
- PROGRESS-TRACKER.md

🎯 Update Type:
[Session Complete / Micro-Task Complete / Milestone Complete / Blocker Added]

✅ Completed Work:

**Session Date:** [DATE]
**Task:** [TASK NAME]

**Completed Subtasks:**
- [✅] [SUBTASK 1]
- [✅] [SUBTASK 2]
- [✅] [SUBTASK 3]

**Files Modified:**
- [FILE PATH] - [WHAT CHANGED]
- [FILE PATH] - [WHAT CHANGED]

**Tests Added:**
- [TEST FILE] - [WHAT TESTS]

**Next Session:**
- 🎯 [NEXT PRIORITY TASK]
- ⚠️ Blockers: [ANY ISSUES]

**Session Notes:**
[IMPORTANT CONTEXT FOR NEXT SESSION]

📝 Update Instructions:
Update PROGRESS-TRACKER.md with the above information in the appropriate section.
```

---

## 🔧 CUSTOMIZATION GUIDE

### **How to Customize Templates:**

1. **Replace [BRACKETED] text** with your actual requirements
2. **Remove sections** you don't need
3. **Add sections** for project-specific requirements
4. **Combine templates** for complex tasks

### **Example Customization:**

**Original:**
```
Feature to Implement: [FEATURE NAME]
```

**Customized:**
```
Feature to Implement: Real-Time Driver Location Tracking with WebSocket
```

---

## 📖 QUICK REFERENCE

### **File Paths (Common References):**

```
prefix.md - Master framework (ALWAYS REFERENCE)
START-HERE.md - Project navigation
PROGRESS-TRACKER.md - Current status
FOLDER-STRUCTURE.md - Repository structure

01-DOCUMENTATION/
  PHASE-1-MASTER-DEVELOPMENT-PLAN.md
  REQUIREMENTS-MATRIX.md
  REFERENCE/
    03_PHASE1_DECISIONS.md (LOCKED - read-only)
    06_DATABASE_SCHEMA.md
    07_API_CONTRACTS.md
    10_SECURITY_GUIDELINES.md

03-DEVELOPMENT-GUIDES/
  implementation-strategy.md (CODE TEMPLATES)
  WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md

04-CODING-STANDARDS/
  technical-architecture.md (PROJECT STRUCTURE)
```

### **When to Use Which Template:**

| Scenario | Template | Priority |
|----------|----------|----------|
| Starting work session | Template 1 | HIGH |
| Building new feature | Template 2 | HIGH |
| Fixing bugs | Template 3 | HIGH |
| Code review | Template 4 | MEDIUM |
| Creating files | Template 5 | MEDIUM |
| Writing tests | Template 6 | MEDIUM |
| Deploying | Template 7 | LOW |
| Quick questions | Template 8 | LOW |
| Learning code | Template 9 | LOW |
| Refactoring | Template 10 | LOW |
| Tracking progress | Template 11 | HIGH |

---

## ⚡ POWER USER TIPS

### **Tip 1: Chain Multiple Templates**

```
[PASTE TEMPLATE 1 - Session Start]

Then:

[PASTE TEMPLATE 2 - Implement Feature]

Result: AI loads framework + implements feature in one go
```

### **Tip 2: Save Your Common Variations**

Create a personal notes file with your frequently used customized templates.

### **Tip 3: Use Template Shortcuts**

Create shorter versions for repetitive tasks:

```
=== QUICK START ===
@prefix.md @PROGRESS-TRACKER.md

Task: [TASK]
Expert: [EXPERT NAME if specific]

[Details]
```

### **Tip 4: Reference Multiple Docs**

```
References:
- prefix.md (framework)
- implementation-strategy.md (templates)
- technical-architecture.md (structure)
- 01-DOCUMENTATION/REFERENCE/07_API_CONTRACTS.md (API specs)
```

---

## 🎉 YOU'RE READY!

**This file works with ANY AI coding assistant:**
- ✅ VS Code GitHub Copilot
- ✅ Cursor AI
- ✅ Windsurf (Codeium)
- ✅ Codeium
- ✅ Amazon CodeWhisperer
- ✅ Tabnine
- ✅ And any future AI coding IDE

**Just:**
1. Copy the relevant template
2. Fill in your requirements
3. Paste into AI chat
4. Get production-ready code

---

**File:** `AI-INSTRUCTION-TEMPLATES.md`  
**Version:** 1.0  
**Updated:** January 12, 2026  
**Project:** Cab Connect Platform
