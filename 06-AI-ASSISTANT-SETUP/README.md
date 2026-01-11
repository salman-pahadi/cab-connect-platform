# 🤖 AI Assistant Setup & Configuration

This folder contains configuration, prompts, and setup guides for using AI assistants (Copilot, Cursor, Claude) for development.

## 📋 Resources

### **Folder Contents**
- **Cursor Setup & Development Helper Files/** - Cursor AI configuration and prompts
- **Setup guides** - How to configure AI assistants
- **Prompt templates** - System prompts for different roles
- **Configuration files** - Setup files for various tools

---

## 🎯 AI Assistant Integration

### **What You Get**
This setup enables **AI-assisted auto-development** with Copilot, Cursor, or Claude:
- ✅ Automatic code generation following standards
- ✅ Day-by-day task breakdown for sequential development
- ✅ Code examples for every pattern
- ✅ Automated testing suggestions
- ✅ Security best practices enforcement

### **How It Works**
1. **AI reads `.cursorrules`** - Understands coding standards
2. **AI reads task description** - Understands what to build
3. **AI reads code examples** - Knows the exact pattern to follow
4. **AI generates code** - Follows all standards automatically
5. **AI includes tests** - Creates test cases automatically

---

## 🚀 Getting Started with AI Assistants

### **Cursor (Recommended for this project)**

**Installation:**
```bash
# Download from https://cursor.sh
# Install like VS Code
```

**Setup:**
1. Copy `.cursorrules` from `04-CODING-STANDARDS/`
2. Paste to project root after backend/frontend initialization
3. Restart Cursor
4. Start asking questions about development

**Example prompts:**
```
"Implement user authentication endpoint following .cursorrules"
"Generate test cases for the ride booking API"
"Create React component for home screen"
"Fix this error: [paste error]"
```

---

### **GitHub Copilot (VS Code)**

**Installation:**
```bash
# Install GitHub Copilot extension in VS Code
# Sign in with GitHub account
```

**Setup:**
1. Copy `.cursorrules` to project root
2. Enable in settings: `"github.copilot.enable"`
3. Start coding and use Copilot suggestions

**Usage:**
```
Tab - Accept suggestion
Ctrl+Shift+\ - Open suggestions panel
Ctrl+L - Clear and refocus
```

---

### **Claude (Web or API)**

**Via Web (claude.ai):**
1. Go to https://claude.ai
2. Create new conversation
3. Paste `.cursorrules` content
4. Paste development task
5. Follow suggestions

**Via API (for automation):**
```python
import anthropic

client = anthropic.Anthropic(api_key="your-key")

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": """
            You are a Cab Connect developer. Follow these rules:
            [paste .cursorrules content]
            
            Task: Implement user registration endpoint
            """
        }
    ]
)

print(message.content[0].text)
```

---

## 📋 Expert Team Prompts

### **For Code Generation**
```
You are an expert Cab Connect developer.

Rules:
[Insert .cursorrules content]

Task: [Your specific task]

Requirements:
- Follow all rules exactly
- Include complete code
- Add tests
- Add error handling
- Add docstrings
```

---

### **For Architecture Decisions**
```
You are the system architect for Cab Connect platform.

Context: [Paste PHASE-1-MASTER-DEVELOPMENT-PLAN.md]

Question: [Your architectural question]

Consider:
- Tech stack constraints (FastAPI, React Native, PostgreSQL)
- Timeline (5-6 weeks)
- Scalability requirements
- Security requirements
```

---

### **For Problem Solving**
```
You are a senior developer debugging Cab Connect platform.

Error:
[Paste error message/stack trace]

Context:
[Describe what you were trying to do]

Code:
[Paste relevant code section]

Help me:
1. Understand the error
2. Fix it
3. Prevent it in future
```

---

## 💡 AI Assistant Tips

### **Best Practices**
1. **Be specific** - More detail = better code
2. **Give context** - Share `.cursorrules` and requirements
3. **Ask iteratively** - Refine answers with follow-ups
4. **Review carefully** - AI makes mistakes sometimes
5. **Test thoroughly** - Always test generated code

### **What Works Well**
- ✅ Generating boilerplate code
- ✅ Creating test cases
- ✅ Fixing compilation errors
- ✅ Writing documentation
- ✅ Suggesting optimizations

### **What Needs Review**
- ⚠️ Architecture decisions (verify with team)
- ⚠️ Security implementations (always audit)
- ⚠️ Complex business logic (test thoroughly)
- ⚠️ Performance optimizations (benchmark)

---

## 📚 Conversation Starters

### **For Backend Development**
```
"Using FastAPI, create [API endpoint name] endpoint.
Requirements:
[List requirements from REQUIREMENTS-MATRIX.md]

Follow these rules: [Include relevant .cursorrules section]"
```

### **For Mobile Development**
```
"Using React Native with Expo, create [screen name].
Features:
[List features]

Use Redux for state management.
Follow these patterns: [Include code examples]"
```

### **For Database Work**
```
"Create PostgreSQL migration for [table name].
Schema:
[List columns]

Index requirements:
[List indexes]

Constraints:
[List constraints]"
```

---

## 🔄 AI-Powered Workflow

### **Daily Development Flow**
1. **Morning:** Read daily task from WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md
2. **Understand:** Read requirements and code examples
3. **Ask AI:** "Implement [task] following .cursorrules"
4. **Review:** Check generated code carefully
5. **Test:** Run all tests
6. **Refine:** Ask AI for improvements
7. **Commit:** Push to GitHub
8. **Update:** Update PROJECT-STATUS-DASHBOARD.md

### **Example Session**
```
User: "Implement passenger login screen (Week 1, Day 3)"

AI: [Generates React Native component]

User: "Add phone input validation"

AI: [Updates component with validation]

User: "Generate tests for this component"

AI: [Creates Jest test suite]

User: "Add error message styling"

AI: [Updates styles]

Result: Complete, tested, styled component ready to merge
```

---

## 🛡️ Security Considerations

### **When Using AI for Security Code**
- ✅ Always have security review by senior dev
- ✅ Test against OWASP guidelines
- ✅ Review AI-generated authentication code carefully
- ✅ Verify encryption implementations
- ✅ Don't trust AI for security decisions alone

### **Data Privacy**
- ✅ Don't paste production data
- ✅ Don't paste real API keys
- ✅ Don't paste user information
- ✅ Use example/dummy data in prompts
- ✅ Review before committing sensitive code

---

## 📊 Productivity Gains

With proper AI usage, you can expect:
- **Code Generation:** 3-4x faster
- **Bug Fixing:** 2-3x faster
- **Testing:** 2x faster
- **Documentation:** 3x faster
- **Overall:** 2-3x faster development

**Key:** Quality review and testing are still essential

---

## 🚨 Common Mistakes to Avoid

1. ❌ Blindly accepting all AI suggestions
2. ❌ Not testing AI-generated code
3. ❌ Using production data in prompts
4. ❌ Skipping security reviews
5. ❌ Not verifying complex logic
6. ❌ Forgetting about edge cases
7. ❌ Not updating requirements in prompts

---

## 📞 Support

**Questions about AI usage?**
1. Check prompts in this folder
2. Review successful examples in codebase
3. Ask team lead for guidance
4. Check AI assistant documentation

---

## 🔗 Related Resources

| Resource | Location |
|----------|----------|
| Coding Standards | 04-CODING-STANDARDS/ |
| Development Guide | 03-DEVELOPMENT-GUIDES/ |
| Code Examples | 03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md |
| Requirements | 05-CLIENT-REQUIREMENTS/ |

---

## ✅ AI Setup Checklist

Before starting development:

- [ ] Installed Cursor or enabled Copilot
- [ ] Copied .cursorrules to project root
- [ ] Read through coding standards
- [ ] Understood how to ask for help
- [ ] Reviewed code generation examples
- [ ] Set up security best practices
- [ ] Team trained on AI tool usage
- [ ] Ready for Week 1, Day 1

---

**Last Updated:** January 11, 2026  
**Status:** ✅ AI Integration Ready  
**Recommended Tool:** Cursor AI (with .cursorrules)
