# 📁 Project Structure Guide

## Organized Folder Hierarchy

```
cab-connect-platform-main/
│
├── 📄 START-HERE.md                          ← Read First! Project navigation guide
├── 📄 README.md                              ← Root project overview
│
├── 📁 01-DOCUMENTATION/                      ← Core Architecture & Design
│   ├── 📄 README.md                          ← How to use this folder
│   ├── 📄 PHASE-1-MASTER-DEVELOPMENT-PLAN.md
│   ├── 📄 REQUIREMENTS-MATRIX.md
│   ├── 📄 DOCUMENTATION-COMPLETE.md
│   └── 📄 COMPLETION-SUMMARY.md
│
├── 📁 02-PROJECT-PLANNING/                   ← Project Management & Tracking
│   ├── 📄 README.md                          ← How to use this folder
│   └── 📄 PROJECT-STATUS-DASHBOARD.md        ← Weekly status updates here
│
├── 📁 03-DEVELOPMENT-GUIDES/                 ← Step-by-Step Development
│   ├── 📄 README.md                          ← How to use this folder
│   ├── 📄 WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md ← Follow this daily!
│   └── 📄 QUICK-START-GUIDE.md
│
├── 📁 04-CODING-STANDARDS/                   ← Code Quality & AI Rules
│   ├── 📄 README.md                          ← How to use this folder
│   └── 📄 .cursorrules                       ← Copy to project root after init
│
├── 📁 05-CLIENT-REQUIREMENTS/                ← What to Build
│   ├── 📄 README.md                          ← How to use this folder
│   └── 📄 Client-Filled-Requirements.md      ← Client specs
│
├── 📁 06-AI-ASSISTANT-SETUP/                 ← AI Tool Configuration
│   ├── 📄 README.md                          ← How to use this folder
│   └── 📁 Cursor Setup & Development Helper Files/
│
├── 📁 07-ARCHIVED/                           ← Old Documentation
│   └── 📄 (Reference only, don't use for development)
│
├── 📁 08-BACKEND/ (Empty - to be created)    ← Backend Code
│   ├── 📁 app/                               ← Will contain: routes, models, services
│   ├── 📁 tests/                             ← Backend tests
│   ├── 📁 migrations/                        ← Database migrations
│   ├── requirements.txt                      ← Python dependencies
│   ├── main.py                               ← FastAPI entry point
│   └── .env                                  ← Environment variables
│
├── 📁 09-FRONTEND-MOBILE/ (Empty - to be created)  ← Mobile Apps
│   ├── 📁 passenger-app/                     ← Passenger React Native project
│   │   ├── app.json
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── navigation/
│   │   │   └── redux/
│   │   └── tests/
│   │
│   └── 📁 driver-app/                        ← Driver React Native project
│       ├── app.json
│       ├── package.json
│       ├── src/
│       │   ├── screens/
│       │   ├── components/
│       │   ├── navigation/
│       │   └── redux/
│       └── tests/
│
├── 📁 10-ADMIN-DASHBOARD/ (Empty - to be created)  ← Admin Web App
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── redux/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tests/
│
├── 📁 docs/                                  ← Original phase documentation (Reference)
│   ├── 00_README.md
│   ├── 01_PHASE1_OVERVIEW.md
│   ├── 02_BRAND_GUIDELINES.md
│   ├── 03_PHASE1_DECISIONS.md
│   ├── 04_SCOPE_IN_OUT.md
│   ├── 05_SYSTEM_ARCHITECTURE.md
│   ├── 06_DATABASE_SCHEMA.md
│   ├── 07_API_CONTRACTS.md
│   ├── 08_USER_FLOWS.md
│   ├── 09_ADMIN_FUNCTIONS.md
│   ├── 10_SECURITY_GUIDELINES.md
│   ├── 11_AI_CODING_ASSISTANTS_RULES.md
│   ├── 12_DEPLOYMENT_PLAN.md
│   ├── 13_TESTING_CHECKLIST.md
│   ├── 14_HANDOVER_PLAN.md
│   └── 15_CHANGELOG.md
│
├── 📁 FIJI-CAB-CONNECT/                      ← Project planning materials (Reference)
│   ├── 00-PROJECT-DOCS/
│   ├── 00-REFERENCE-TEMPLATES/
│   ├── 01-BRANDING/
│   ├── 02-ARCHITECTURE/
│   ├── 03-PHASES/
│   ├── 09-PAYMENTS/
│   ├── 10-API/
│   ├── README.md
│   └── START-HERE.md
│
├── 📁 fiji-cab-connect-marketing-website/    ← Phase 0 Website (Live)
│   └── (Next.js project for marketing)
│
└── 📄 .gitignore                             ← Git ignore rules

```

---

## 📊 Folder Purpose Summary

### **🎯 Active Development Folders**

| Folder | Purpose | Content |
|--------|---------|---------|
| **01-DOCUMENTATION** | Architecture & specifications | 4 core documents (12,000+ words) |
| **02-PROJECT-PLANNING** | Timeline & status tracking | Milestones and deliverables |
| **03-DEVELOPMENT-GUIDES** | Implementation instructions | 30-day breakdown with examples |
| **04-CODING-STANDARDS** | Code quality rules | `.cursorrules` + guidelines |
| **05-CLIENT-REQUIREMENTS** | What to build | Client specs and requirements |
| **06-AI-ASSISTANT-SETUP** | AI configuration | Prompts and setup guides |

### **🚀 Development Folders** (To be created)

| Folder | Purpose | Tech Stack |
|--------|---------|-----------|
| **08-BACKEND** | FastAPI application | Python, PostgreSQL, Redis |
| **09-FRONTEND-MOBILE** | Mobile applications | React Native, Expo, Redux |
| **10-ADMIN-DASHBOARD** | Admin web app | React, Vite, Tailwind |

### **📚 Reference Folders**

| Folder | Purpose | Status |
|--------|---------|--------|
| **docs/** | Original documentation | Reference only |
| **FIJI-CAB-CONNECT/** | Project planning | Reference only |
| **07-ARCHIVED/** | Deprecated files | Archive |
| **fiji-cab-connect-marketing-website/** | Phase 0 website | Completed |

---

## 🗂️ How to Use Each Folder

### **1️⃣ START-HERE.md (Root)**
**First file to read**
- Project overview
- Folder navigation
- Quick start guide
- Link to all other resources

### **2️⃣ 01-DOCUMENTATION/**
**Read when understanding the project**
- Architecture diagrams
- System design
- Database schema
- API specifications
- All 50+ API endpoints
- All 15+ database tables

### **3️⃣ 02-PROJECT-PLANNING/**
**Update weekly during development**
- Current status
- Progress metrics
- Deliverables checklist
- Timeline tracking
- Risk assessment

### **4️⃣ 03-DEVELOPMENT-GUIDES/**
**Follow every single day**
- Week 1-6 breakdown
- Day 1-30 tasks
- Code examples
- Setup commands
- Testing procedures

### **5️⃣ 04-CODING-STANDARDS/**
**Reference during coding**
- Naming conventions
- Code patterns
- Security rules
- Testing requirements
- Performance guidelines

### **6️⃣ 05-CLIENT-REQUIREMENTS/**
**Check when implementing features**
- User stories
- Feature specifications
- Success criteria
- Budget and timeline
- Scope definition

### **7️⃣ 06-AI-ASSISTANT-SETUP/**
**Setup before Week 1, Day 1**
- Cursor configuration
- Copilot setup
- Prompt templates
- Development tips

### **8️⃣ 08-BACKEND/** (Empty now)
**Will contain the API server**
- FastAPI project structure
- Models and schemas
- Routes and endpoints
- Database migrations
- Tests and fixtures

### **9️⃣ 09-FRONTEND-MOBILE/** (Empty now)
**Will contain mobile apps**
- Passenger app code
- Driver app code
- Shared components
- Navigation setup
- Redux store

### **🔟 10-ADMIN-DASHBOARD/** (Empty now)
**Will contain admin website**
- React components
- Pages and routes
- Redux slices
- API integration
- Charts and graphs

---

## 📍 Navigation Guide

### **"I need to understand the entire project"**
→ Read in this order:
1. START-HERE.md
2. 01-DOCUMENTATION/PHASE-1-MASTER-DEVELOPMENT-PLAN.md
3. 01-DOCUMENTATION/REQUIREMENTS-MATRIX.md

### **"I need to start coding today"**
→ Read in this order:
1. 03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md (Week 1)
2. 04-CODING-STANDARDS/
3. 05-CLIENT-REQUIREMENTS/Client-Filled-Requirements.md

### **"I need to track project progress"**
→ Use:
1. 02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md
2. Update weekly
3. Reference PROJECT-STATUS-DASHBOARD.md daily

### **"I need to implement a specific feature"**
→ Find in:
1. 01-DOCUMENTATION/REQUIREMENTS-MATRIX.md (feature spec)
2. 03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md (which week/day)
3. 04-CODING-STANDARDS/ (how to code it)
4. docs/ (detailed architecture if needed)

### **"I need AI to help me code"**
→ Setup:
1. 06-AI-ASSISTANT-SETUP/ (install tool)
2. 04-CODING-STANDARDS/.cursorrules (copy to project)
3. Ask AI tool using example prompts

---

## 🎯 Reading Path by Role

### **👨‍💼 Project Manager**
Priority: 02-PROJECT-PLANNING > 02-PROJECT-PLANNING > 01-DOCUMENTATION

### **👨‍💻 Backend Developer**
Priority: 03-DEVELOPMENT-GUIDES > 04-CODING-STANDARDS > 01-DOCUMENTATION

### **📱 Mobile Developer**
Priority: 03-DEVELOPMENT-GUIDES > 04-CODING-STANDARDS > 01-DOCUMENTATION

### **🎨 Frontend Developer**
Priority: 03-DEVELOPMENT-GUIDES > 04-CODING-STANDARDS > 01-DOCUMENTATION

### **🏗️ Tech Lead / Architect**
Priority: 01-DOCUMENTATION > 04-CODING-STANDARDS > 02-PROJECT-PLANNING

### **🧪 QA Engineer**
Priority: 01-DOCUMENTATION > 03-DEVELOPMENT-GUIDES > 04-CODING-STANDARDS

---

## 📋 File Organization By Purpose

### **Documentation Files**
```
01-DOCUMENTATION/
  - PHASE-1-MASTER-DEVELOPMENT-PLAN.md    [Architecture]
  - REQUIREMENTS-MATRIX.md                 [Specs]
  - DOCUMENTATION-COMPLETE.md              [Index]
  - COMPLETION-SUMMARY.md                  [Overview]
```

### **Development Files**
```
03-DEVELOPMENT-GUIDES/
  - WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md      [Daily tasks]
  - QUICK-START-GUIDE.md                   [Overview]
```

### **Project Management Files**
```
02-PROJECT-PLANNING/
  - PROJECT-STATUS-DASHBOARD.md            [Status tracking]
```

### **Standards & Configuration Files**
```
04-CODING-STANDARDS/
  - .cursorrules                           [AI rules]
  - README.md                              [Standards guide]
```

### **Requirements Files**
```
05-CLIENT-REQUIREMENTS/
  - Client-Filled-Requirements.md          [Client specs]
```

---

## ✅ Folder Setup Checklist

Before starting development, verify:

- [ ] All folders 01-10 exist
- [ ] All README.md files created
- [ ] START-HERE.md is in root
- [ ] Root README.md updated
- [ ] .cursorrules accessible in 04-CODING-STANDARDS/
- [ ] docs/ folder intact (reference)
- [ ] FIJI-CAB-CONNECT/ folder intact (reference)
- [ ] Folders 08-10 are empty (ready for code)

---

## 🔄 Workflow Paths

### **Daily Development Workflow**
```
1. Open 03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md
2. Find today's tasks
3. Reference 04-CODING-STANDARDS/ for patterns
4. Code in 08, 09, or 10 folders
5. Test thoroughly
6. Commit to Git
7. Update 02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md
```

### **Feature Implementation Workflow**
```
1. Read 01-DOCUMENTATION/REQUIREMENTS-MATRIX.md
2. Find feature in 05-CLIENT-REQUIREMENTS/
3. Find implementation date in 03-DEVELOPMENT-GUIDES/
4. Reference code examples in 03-DEVELOPMENT-GUIDES/
5. Code in appropriate folder (08, 09, or 10)
6. Reference 04-CODING-STANDARDS/ for patterns
7. Test and commit
```

### **Bug Fix Workflow**
```
1. Check 02-PROJECT-PLANNING/ for issue tracking
2. Review original spec in 01-DOCUMENTATION/
3. Review code standards in 04-CODING-STANDARDS/
4. Fix in 08, 09, or 10 folders
5. Add test case
6. Verify against requirements
7. Update status dashboard
```

---

## 📞 Quick Reference

| Question | Answer |
|----------|--------|
| Where do I start? | [START-HERE.md](../START-HERE.md) |
| What are we building? | [01-DOCUMENTATION/](../01-DOCUMENTATION/) |
| How do I build it? | [03-DEVELOPMENT-GUIDES/](../03-DEVELOPMENT-GUIDES/) |
| How do I code it? | [04-CODING-STANDARDS/](../04-CODING-STANDARDS/) |
| Where does my code go? | [08-BACKEND/](../08-BACKEND/), [09-FRONTEND-MOBILE/](../09-FRONTEND-MOBILE/), [10-ADMIN-DASHBOARD/](../10-ADMIN-DASHBOARD/) |
| How do I track progress? | [02-PROJECT-PLANNING/](../02-PROJECT-PLANNING/) |
| What are the requirements? | [05-CLIENT-REQUIREMENTS/](../05-CLIENT-REQUIREMENTS/) |
| How do I use AI tools? | [06-AI-ASSISTANT-SETUP/](../06-AI-ASSISTANT-SETUP/) |

---

**Last Updated:** January 11, 2026  
**Status:** ✅ Structure Complete & Organized  
**Next Step:** Open [START-HERE.md](../START-HERE.md)
