# Cab Connect Platform - Project Folder Structure

**Last Updated:** January 15, 2026  
**Project:** Fiji Cab Connect Platform (Phase 1)  
**Status:** ✅ OPTIMIZED - Clean structure with minimal root files

---

## 📋 Directory Overview

This document provides a comprehensive guide to the project folder structure for the Cab Connect Platform. Each section outlines the purpose, contents, and usage of each directory.

**IMPORTANT:** This structure was optimized on Jan 15, 2026 to eliminate duplicates and reduce AI confusion.

---

## 🗂️ Root Level Structure (OPTIMIZED)

```
cab-connect-platform-main/
├── .cursorrules                           # AI assistant configuration (SINGLE SOURCE)
├── .gitignore                             # Git ignore file
├── .vscode/                               # VS Code workspace settings
│
├── README.md                              # Project overview & quick start
├── prefix.md                              # Development framework (16 experts)
├── START-HERE.md                          # Project entry point & navigation
├── PROGRESS-TRACKER.md                    # Current phase tracking
├── FOLDER-STRUCTURE.md                    # This file - structure guide
├── CHANGELOG.md                           # Version history
├── TODO.md                                # Active tasks
│
├── docker-compose.local.yml               # Local PostgreSQL setup
├── start-local-db.ps1                     # Start local DB script
├── stop-local-db.ps1                      # Stop local DB script
├── render.yaml                            # Production deployment config
├── package.json                           # Root dependencies
├── eas.json                               # Expo build config
├── app.json                               # Expo app config
│
├── 01-DOCUMENTATION/                      # Canonical specs (READ-ONLY)
├── 02-PROJECT-PLANNING/                   # Project planning & status
├── 03-DEVELOPMENT-GUIDES/                 # Development guides & templates
├── 04-CODING-STANDARDS/                   # Code standards & conventions
├── 05-CLIENT-REQUIREMENTS/                # Client requirements & branding
├── 06-AI-ASSISTANT-SETUP/                 # AI assistant prompts
├── 07-ARCHIVED/                           # ALL archived/old documents
├── 08-BACKEND/                            # FastAPI backend
├── 09-ADMIN-DASHBOARD/                    # Admin dashboard (Next.js)
├── 10-PASSENGER-APP/                      # Passenger mobile app
├── 11-DRIVER-APP/                         # Driver mobile app
└── fiji-cab-connect-marketing-website/    # Marketing website (Next.js)
```

---

## 📁 Detailed Directory Structure

### 01-DOCUMENTATION/
**Purpose:** Central repository for all Phase 1 project documentation

**Contents:**
- `AUDIT-REPORT.md` - Comprehensive audit report
- `AUDIT-SUMMARY.md` - Summary of audit findings
- `CLEANUP-COMPLETE.md` - Documentation cleanup completion status
- `COMPLETION-SUMMARY.md` - Project completion summary
- `DOCUMENTATION-COMPLETE.md` - Documentation completion checklist
- `PHASE-1-MASTER-DEVELOPMENT-PLAN.md` - Master development plan for Phase 1
- `README.md` - Documentation folder overview
- `REQUIREMENTS-MATRIX.md` - Requirements traceability matrix
- `REFERENCE/` - Reference documentation subdirectory (see below)

**REFERENCE/ Subdirectory:**
- `00_README.md` - Reference guide index
- `01_PHASE1_OVERVIEW.md` - Phase 1 overview and scope
- `02_BRAND_GUIDELINES.md` - Brand guidelines and standards
- `03_PHASE1_DECISIONS.md` - Key decisions made in Phase 1
- `04_SCOPE_IN_OUT.md` - In-scope and out-of-scope items
- `05_SYSTEM_ARCHITECTURE.md` - System architecture documentation
- `06_DATABASE_SCHEMA.md` - Database schema and ERD
- `07_API_CONTRACTS.md` - API specifications and contracts
- `08_USER_FLOWS.md` - User journey and flow diagrams
- `09_ADMIN_FUNCTIONS.md` - Admin dashboard functionalities
- `10_SECURITY_GUIDELINES.md` - Security best practices
- `11_AI_CODING_ASSISTANTS_RULES.md` - AI assistant guidelines
- `12_DEPLOYMENT_PLAN.md` - Deployment strategy
- `13_TESTING_CHECKLIST.md` - Testing requirements
- `14_HANDOVER_PLAN.md` - Handover procedures
- `15_CHANGELOG.md` - Version changelog
- `Cab Connect – Phase 1 Execution Document` - Execution document
- `SYSTEM-ARCHITECTURE-FIJI.md` - Fiji-specific architecture

**Usage:** Reference for project documentation, requirements, and technical specifications.

---

### 02-PROJECT-PLANNING/
**Purpose:** Project planning, status tracking, and client communication

**Contents:**
- `PROJECT-OVERVIEW.md` - High-level project overview
- `PROJECT-STATUS-DASHBOARD.md` - Current project status
- `PROJECT-SUMMARY-FOR-CLIENT.md` - Client-facing summary
- `README.md` - Project planning folder guide
- `FINAL-REPORT-ARCHIVED.md` - Final report (archived)
- `README-ARCHIVED.md` - Archived planning documentation
- `FOLDER-STRUCTURE-ARCHIVED.md` - Previous folder structure
- `ORGANIZATION-SUMMARY-ARCHIVED.md` - Previous organization summary
- `REORGANIZATION-COMPLETE-ARCHIVED.md` - Reorganization completion log
- `ARCHIVE/` - Archived project planning documents
  - `PHASE-0-MARKETING-WEBSITE.md` - Phase 0 marketing website info
  - `PHASE-BREAKDOWN.md` - Phase breakdown document
- `payments/` - Payment tracking
  - `PAYMENT-TRACKER.md` - Payment tracking records
  - `README.md` - Payments folder guide
  - `receipts/` - Payment receipts

**Usage:** Track project progress, manage status updates, and maintain client communication records.

---

### 03-DEVELOPMENT-GUIDES/
**Purpose:** Guides and templates for developers

**Contents:**
- `GETTING-STARTED.md` - Getting started guide for new developers
- `QUICK-START-GUIDE.md` - Quick start instructions
- `WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md` - Weekly development roadmap
- `README.md` - Development guides overview
- `templates/` - Reusable templates for development
  - `AI-INSTRUCTIONS.md` - AI assistant instructions template
  - `BRAND-KIT-FULL.md` - Complete brand kit
  - `BRAND-KIT-LITE.md` - Lightweight brand kit
  - `design-tokens-template.ts` - Design tokens template
  - `DEVELOPMENT-GUIDE.md` - Development guide template

**Usage:** Reference for onboarding new developers, weekly progress tracking, and using standard templates.

---

### 04-CODING-STANDARDS/
**Purpose:** Coding standards and conventions

**Contents:**
- `README.md` - Coding standards overview
- `templates/` - Code templates and examples

**Usage:** Reference for code quality, style guides, and best practices.

---

### 05-CLIENT-REQUIREMENTS/
**Purpose:** Client specifications and branding assets

**Contents:**
- `Client-Filled-Requirements.md` - Client-provided requirements
- `README.md` - Client requirements overview
- `branding/` - Brand assets and guidelines
  - Various branding files (logos, color palettes, fonts, etc.)

**Usage:** Store and reference client requirements, branding assets, and brand guidelines.

---

### 06-AI-ASSISTANT-SETUP/
**Purpose:** Configuration and prompts for AI assistant tools

**Contents:**
- `CURSOR-AI-EXPERT-PROMPT.md` - Cursor AI expert configuration
- `HOW-TO-USE-CURSORRULES.md` - Instructions for using Cursor rules
- `SUPER-SENIOR-EXPERT-TEAM-PROMPT.md` - Senior team prompt configuration
- `README.md` - AI assistant setup guide
- `Cab Connect – Brand Name & Usage Documentation` - Brand usage for AI
- `phase1-proposed` - Proposed configurations for Phase 1

**Usage:** Configure and maintain AI assistant tools like Cursor for consistent coding help.

---

### 07-ARCHIVED/
**Purpose:** Archive for older project documents and archives

**Contents:**
- `AUDITS/` - Historical audit reports
- `SESSION-LOGS/` - Session summaries and one-off reports
- `LEGACY/` - Legacy project structures and snapshots (including out-of-scope Phase 1 planning)

**Usage:** Reference old documentation and configurations; not actively used in current phase.

---

### 08-BACKEND/
**Purpose:** Backend application development

**Contents:**
- `app/` - FastAPI application code
- `docs/` - Backend docs (deployment, SMS/OTP guides)

**Status:** Folder structure ready for backend implementation

**Usage:** Backend API, services, and database logic development.

---

### 09-ADMIN-DASHBOARD/
**Purpose:** Admin dashboard application development

**Status:** Active development

**Usage:** Administrative interface, user management, and system monitoring.

---

### 10-PASSENGER-APP/
**Purpose:** Passenger mobile app development

**Status:** Active development

**Usage:** React Native (Expo) passenger app.

---

### 11-DRIVER-APP/
**Purpose:** Driver mobile app development

**Status:** Active development

**Usage:** React Native (Expo) driver app.

---

### fiji-cab-connect-marketing-website/
**Purpose:** Next.js marketing website for Cab Connect

**Technology Stack:** Next.js (React framework)

**Contents:**
- `next.config.js` - Next.js configuration
- `package.json` - Project dependencies
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `README.md` - Website documentation
- `app/` - Next.js app directory (routes and layouts)
- `components/` - React components
- `lib/` - Utility libraries and helpers
- `public/` - Static assets
- `scripts/` - Build and utility scripts
- `project-documents/` - Project-related documents
- `FINAL-AUDIT-REPORT.md` - Audit report for marketing website

**Usage:** Marketing website development using Next.js, Tailwind CSS, and TypeScript.

---

### .vscode/
**Purpose:** Visual Studio Code workspace settings

**Contents:**
- Workspace configuration files for consistent editor setup across the team

**Usage:** Shared VS Code settings, extensions recommendations, and launch configurations.

---

## 📊 Summary Table

| Directory | Purpose | Status | Ownership |
|-----------|---------|--------|-----------|
| 01-DOCUMENTATION | Project documentation | ✅ Complete | Documentation Lead |
| 02-PROJECT-PLANNING | Project planning & status | ✅ Active | Project Manager |
| 03-DEVELOPMENT-GUIDES | Developer guides | ✅ Complete | Tech Lead |
| 04-CODING-STANDARDS | Code standards | ✅ Complete | Tech Lead |
| 05-CLIENT-REQUIREMENTS | Client requirements | ✅ Complete | Product Manager |
| 06-AI-ASSISTANT-SETUP | AI tool configuration | ✅ Complete | Tech Lead |
| 07-ARCHIVED | Archived documents | 📦 Archived | Archive Manager |
| 08-BACKEND | Backend development | 🚀 Ready | Backend Lead |
| 09-ADMIN-DASHBOARD | Admin dashboard dev | 🚀 Ready | Admin Dashboard Lead |
| 10-PASSENGER-APP | Passenger app dev | 🚀 Ready | Mobile Lead |
| 11-DRIVER-APP | Driver app dev | 🚀 Ready | Mobile Lead |
| fiji-cab-connect-marketing-website | Marketing website | 🚀 Active | Marketing Dev Lead |

---

## 🎯 Quick Navigation

### For New Developers
1. Start: [03-DEVELOPMENT-GUIDES/GETTING-STARTED.md](03-DEVELOPMENT-GUIDES/GETTING-STARTED.md)
2. Quick Start: [03-DEVELOPMENT-GUIDES/QUICK-START-GUIDE.md](03-DEVELOPMENT-GUIDES/QUICK-START-GUIDE.md)
3. Brand Guidelines: [05-CLIENT-REQUIREMENTS/](05-CLIENT-REQUIREMENTS/)

### For Project Managers
1. Status: [02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md](02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md)
2. Overview: [02-PROJECT-PLANNING/PROJECT-OVERVIEW.md](02-PROJECT-PLANNING/PROJECT-OVERVIEW.md)
3. Client Summary: [02-PROJECT-PLANNING/PROJECT-SUMMARY-FOR-CLIENT.md](02-PROJECT-PLANNING/PROJECT-SUMMARY-FOR-CLIENT.md)

### For Technical Leads
1. Architecture: [01-DOCUMENTATION/REFERENCE/05_SYSTEM_ARCHITECTURE.md](01-DOCUMENTATION/REFERENCE/05_SYSTEM_ARCHITECTURE.md)
2. API Contracts: [01-DOCUMENTATION/REFERENCE/07_API_CONTRACTS.md](01-DOCUMENTATION/REFERENCE/07_API_CONTRACTS.md)
3. Database Schema: [01-DOCUMENTATION/REFERENCE/06_DATABASE_SCHEMA.md](01-DOCUMENTATION/REFERENCE/06_DATABASE_SCHEMA.md)
4. Security Guidelines: [01-DOCUMENTATION/REFERENCE/10_SECURITY_GUIDELINES.md](01-DOCUMENTATION/REFERENCE/10_SECURITY_GUIDELINES.md)

### For Developers
1. Development Guide: [03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md](03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md)
2. Coding Standards: [04-CODING-STANDARDS/README.md](04-CODING-STANDARDS/README.md)
3. AI Setup: [06-AI-ASSISTANT-SETUP/README.md](06-AI-ASSISTANT-SETUP/README.md)

---

## 🔄 Folder Maintenance

### Regular Updates
- **Weekly:** Update [02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md](02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md)
- **As Needed:** Add new documentation to appropriate folders
- **Phase Completion:** Archive outdated documents to [07-ARCHIVED/](07-ARCHIVED/)

### Best Practices
1. Keep documentation synchronized with actual project state
2. Archive completed phases instead of deleting
3. Maintain clear, descriptive file names
4. Use README.md in each major folder for navigation
5. Update this structure document when adding new folders

---

## 📝 File Naming Conventions

- **Markdown Documents:** `UPPER-CASE-WITH-HYPHENS.md`
- **Configuration Files:** `lowercase.config.js` or `lowercase.config.ts`
- **Application Folders:** `lowercase-with-hyphens/` or `camelCase/`
- **Numbered References:** `##_DESCRIPTION.md` (e.g., `05_SYSTEM_ARCHITECTURE.md`)

---

## 🔐 Version Control

- `.gitignore` - Specifies files not tracked by Git
- Root folder is the Git repository
- All documentation is version controlled
- Archives are kept for historical reference

---

## 📞 Support & Questions

For questions about folder organization or document locations, refer to the README.md files in each major directory, or contact your project lead.

---

**Document Status:** Active  
**Last Reviewed:** January 11, 2026  
**Next Review:** End of Phase 1
