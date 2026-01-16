# 🤖 AI ASSISTANT MASTER TEMPLATES v3.0
**Elite Development Workflow | Zero-Tolerance Quality | Milestone 5 Active**

> **Phase 1 Constraints:** Polling Only | Cash Only | No WebSockets | No Payment Gateways

---

## ⚡ DAILY PROTOCOL

### **START → WORK → END**

```
1. START: @prefix.md @PROGRESS-TRACKER.md → Task → Execute
2. WORK:  Pick template (T2=Build, T3=Fix, T5=Create, T6=Test)
3. END:   Quality checks → Update tracker → Git push
```

**Every. Single. Day. No exceptions.**

---

## 📋 TEMPLATE SELECTOR

| Action | Template | Use When | Priority |
|--------|----------|----------|----------|
| **Session start** | **T1** | Every morning | 🔴 **CRITICAL** |
| **Session end** | **T11** | Every evening | 🔴 **CRITICAL** |
| Build feature | T2 | Adding functionality | 🟡 Daily |
| Fix bug | T3 | Resolving errors | 🟡 Daily |
| Create file | T5 | New components | 🟢 Weekly |
| Write tests | T6 | Test coverage | 🟢 Weekly |
| Code review | T4 | Quality check | 🟢 Weekly |
| Quick question | T8 | Fast answers | As needed |
| Understand code | T9 | Learning | As needed |
| Refactor | T10 | Optimization | As needed |
| Status update | T12 | Progress report | As needed |
| Project audit | T13 | Cleanup | Quarterly |

---

## 🚀 T1: SESSION START

**Quick:**
```
@prefix.md @PROGRESS-TRACKER.md @START-HERE.md

Task: [YOUR TASK]
Priority: [High/Med/Low]
```

**Full:**
```
=== SESSION START ===

📚 Load:
@prefix.md
@PROGRESS-TRACKER.md
@START-HERE.md
@01-DOCUMENTATION/REFERENCE/03_PHASE1_DECISIONS.md

🚫 FORBIDDEN (Phase 1):
- WebSockets/Socket.IO → Use polling
- Payment gateways → Cash only
- Mock data → Real backend
- TypeScript `any`
- Relative imports → Use @/

✅ MANDATORY:
- Zero lint/type errors
- Input validation
- CSRF protection
- Mobile-first (320px+)
- Auth on protected routes

🎯 Task: [DESCRIBE]
📂 Files: [IF KNOWN]
🤝 Expert: [FROM prefix.md]
```

---

## 🔧 T2: BUILD FEATURE

**Quick:**
```
@prefix.md @PROGRESS-TRACKER.md @implementation-strategy.md

Feature: [NAME]
Requirements:
- [REQ]
- [REQ]
- Phase 1: Polling (no WebSockets)
- Phase 1: Cash only (no gateways)

Scope: Backend/Mobile/Admin [Yes/No]
```

**Full:**
```
=== BUILD: [FEATURE] ===

📚 @prefix.md @PROGRESS-TRACKER.md @implementation-strategy.md

🎯 Requirements:
- [SPECIFIC]
- Phase 1: Polling-based
- Phase 1: Cash payments only

📂 Scope:
- Backend: [PATH]
- Mobile: [10-PASSENGER-APP or 11-DRIVER-APP]
- Admin: [09-ADMIN-DASHBOARD]

✅ Done When:
- [ ] Feature works end-to-end
- [ ] Zero errors (TS/Python)
- [ ] Tests pass (unit + integration)
- [ ] Phase 1 constraints met
- [ ] PROGRESS-TRACKER updated
```

---

## 🐛 T3: FIX BUG

```
=== FIX BUG ===

@prefix.md @technical-architecture.md

🐛 Issue: [DESCRIBE]
📂 File: [PATH]

❌ Error:
[PASTE ERROR]

🔍 Expected: [WHAT SHOULD HAPPEN]
📊 Actual: [WHAT IS HAPPENING]

Reproduce:
1. [STEP]
2. [STEP]

✅ Fixed When:
- [ ] Error gone
- [ ] Tests pass
- [ ] Zero new errors
- [ ] Regression test added
```

---

## 👀 T4: CODE REVIEW

```
=== REVIEW CODE ===

@prefix.md @technical-architecture.md @10_SECURITY_GUIDELINES.md

📂 File: [PATH]

Code:
[PASTE CODE]

🔍 Check:
- [ ] Zero TS/lint errors
- [ ] No `any` types
- [ ] Input validation
- [ ] Error handling
- [ ] Tests written
- [ ] Phase 1 constraints (polling + cash)
- [ ] Security (auth, CSRF, XSS)
```

---

## 📝 T5: CREATE FILE

```
=== CREATE FILE ===

@technical-architecture.md @implementation-strategy.md

Type: [Backend/Mobile/Admin]
Name: [FILENAME]
Purpose: [WHAT IT DOES]

Requirements:
- [REQ]
- [REQ]

Location:
- Backend: 08-BACKEND/app/[FOLDER]/[FILE].py
- Mobile: 10-PASSENGER-APP/src/[FOLDER]/[FILE].tsx (or 11-DRIVER-APP)
- Admin: 09-ADMIN-DASHBOARD/src/[FOLDER]/[FILE].tsx

✅ Done When:
- [ ] Created with proper types
- [ ] Uses @/ imports
- [ ] Tests written
- [ ] Zero errors
```

---

## 🧪 T6: WRITE TESTS

```
=== WRITE TESTS ===

@implementation-strategy.md

File: [PATH TO TEST]
Type: [Unit/Integration/E2E]

Cases:
**Happy Path:**
- [CASE]

**Edge Cases:**
- [CASE]

**Error Cases:**
- [CASE]

Framework:
- Backend: pytest
- Mobile: Jest + React Native Testing Library
- Admin: Vitest
```

---

## 🚀 T7: DEPLOY

```
=== DEPLOY ===

@DEPLOYMENT-READY-CHECKLIST.md

Target: [Dev/Staging/Prod]
Component: [Backend/Mobile/Admin]

✅ Pre-Deploy:
- [ ] All tests pass
- [ ] Zero TS/Python errors
- [ ] Zero security vulns
- [ ] Env vars set
- [ ] DB migrations ready

📝 Post-Deploy:
- Smoke test
- Monitor logs
- Check analytics
```

---

## 💡 T8: QUICK QUESTION

```
@prefix.md

❓ Question: [YOUR QUESTION]

Context:
- Working on: [AREA]
- Current issue: [ISSUE]
- Already tried: [WHAT]
```

---

## 📚 T9: UNDERSTAND CODE

```
@technical-architecture.md @prefix.md

📂 File: [PATH]

❓ Questions:
- [WHAT DO YOU WANT TO UNDERSTAND?]

Focus:
- [ ] Architecture
- [ ] Data flow
- [ ] Business logic
- [ ] Security
```

---

## 🔄 T10: REFACTOR

```
=== REFACTOR ===

@prefix.md @technical-architecture.md

📂 File: [PATH]

Code:
[PASTE CODE]

🎯 Goals:
- [ ] Improve readability
- [ ] Reduce duplication (DRY)
- [ ] Better error handling
- [ ] Improve type safety

✅ Constraints:
- Maintain functionality
- Don't break tests
- Follow project standards
```

---

## 🎯 T11: END SESSION (MANDATORY)

**⚠️ RUN BEFORE CLOSING EVERY SESSION**

```
=== END SESSION ===

📋 STEP 1: QUALITY CHECKS

Backend:
cd 08-BACKEND; python -m ruff check .; python -m mypy app/; python -m pytest tests/ -v

Mobile (Passenger):
cd 10-PASSENGER-APP; npm run type-check; npm run lint; npm test; npm audit

Mobile (Driver - if changed):
cd 11-DRIVER-APP; npm run type-check; npm run lint; npm test; npm audit

Admin:
cd 09-ADMIN-DASHBOARD; npm run type-check; npm run lint; npm test; npm audit

✅ All must pass with ZERO errors!

---

📋 STEP 1.5: OPTIMIZE NEW FILES (if any)

New files checklist:
- [ ] No console.log() or debug code
- [ ] All imports used
- [ ] Proper error handling
- [ ] TypeScript types complete (no `any`)
- [ ] Comments on complex logic
- [ ] Naming conventions followed
- [ ] No unresolved TODO/FIXME
- [ ] Correct location per FOLDER-STRUCTURE.md

---

📋 STEP 2: UPDATE PROGRESS-TRACKER.md

Session: [DATE] | [HH:MM]
Task: [MICRO-TASK NAME]

✅ Completed:
- [✅] [SUBTASK]
- [✅] [SUBTASK]

📂 Files:
- [PATH] - [CHANGE]

✅ Quality:
- [ ] Tests pass
- [ ] Zero errors
- [ ] Standards met

🎯 Next: [NEXT TASK]
⚠️ Blockers: [IF ANY]

---

📋 STEP 3: GIT COMMIT

git status
git add .
git commit -m "type(scope): description

- Detail 1
- Detail 2

Closes #[ISSUE]"
git push

---

✅ SESSION COMPLETE CHECKLIST

- [ ] All tests passing
- [ ] Zero TS/Python errors
- [ ] Zero lint warnings
- [ ] Zero security vulns
- [ ] PROGRESS-TRACKER updated
- [ ] Code committed & pushed
- [ ] Next task identified
- [ ] Blockers documented

**Only when ALL ✅, session is complete!**
```

---

## 📊 T12: QUICK STATUS UPDATE

```
@PROGRESS-TRACKER.md

✅ Done: [WHAT]
📂 Files: [PATH]
🎯 Next: [NEXT]
⚠️ Issues: [BLOCKERS]
```

---

## 🏗️ T13: PROJECT AUDIT

```
@FOLDER-STRUCTURE.md @technical-architecture.md

🎯 Audit: [Root/Docs/Full]

Goals:
- [ ] Remove duplicates
- [ ] Fix broken links
- [ ] Archive completed reports
- [ ] Update indexes

Verify:
- Root files < 15
- Zero duplicates
- Zero broken links
- Quick refs available
```

---

## 🎯 QUICK REFERENCE

### **Daily Workflow**
```
START (T1) → WORK (T2/T3/T5/T6) → END (T11)
```

### **Phase 1 Constraints (Non-Negotiable)**
- 🚫 No WebSockets → Use polling
- 🚫 No payment gateways → Cash only
- 🚫 No mock data → Real backend
- 🚫 No TypeScript `any`
- ✅ Zero lint/type errors mandatory

### **Current Milestone**
- **Milestone 5:** Admin Dashboard & Analytics
- **Focus:** Polling-based admin interface
- **Timeline:** 3-5 days

### **Folder Paths**
```
08-BACKEND/
09-ADMIN-DASHBOARD/
10-PASSENGER-APP/
11-DRIVER-APP/
fiji-cab-connect-marketing-website/
```

---

## 📖 FILE REFERENCE SYNTAX

**Cursor/Windsurf:**
```
@prefix.md
@PROGRESS-TRACKER.md
@START-HERE.md
```

**VS Code Copilot:**
```
/workspace prefix.md
```

**Generic:**
```
Reference: prefix.md
```

---

**File:** `AI-MASTER-TEMPLATES-V3.md`  
**Version:** 3.0 (EXPERT-OPTIMIZED)  
**Updated:** January 15, 2026  
**Standard:** Aligned with SUPER-SENIOR-EXPERT-TEAM-PROMPT.md

### v3.0 Improvements:
✅ 80% more concise than v2.0  
✅ Expert-level clarity (SUPER-SENIOR standard)  
✅ Phase 1 constraints in every relevant template  
✅ Zero fluff, 100% actionable  
✅ Optimized for Milestone 5 (Admin Dashboard)  
✅ All folder paths corrected  
✅ New file optimization step in T11  
✅ Elite workflow matching SUPER-SENIOR-EXPERT-TEAM-PROMPT.md
