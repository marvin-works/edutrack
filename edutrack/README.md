# EduTrack — Student Academic Analytics & Performance Management System
*Understand your performance. Plan your progress.*

## Run locally
1. Open the `edutrack` folder in VS Code.
2. Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.
   (Double-clicking `index.html` also works in most browsers.)
No build step and no dependencies. The only external request is the Google Fonts stylesheet; the app works without it.

## Structure
```
index.html  login.html  signup.html      public pages
dashboard.html  gpa.html  performance.html  reach.html  goals.html  profile.html   protected pages
css/style.css        theme and responsive layout
js/app.js            core: storage, session, GPA/CGPA maths, insights, SVG chart, sidebar shell, router (every page)
js/auth.js           landing, signup, login, sample data
js/dashboard.js  js/gpa.js  js/performance.js  js/reach.js  js/goals.js  js/profile.js    one file per page
```
Each page loads `app.js` plus its own module, sets `window.PAGE`, and calls `route()`, which redirects logged-out users to login and logged-in users away from login/signup.

## Data (LocalStorage key `edutrack_db`)
`users` (profile + salted SHA-256 password hash) and `data[email]` = `{ sems: [...], goals: [...] }`, so accounts never share data. The session is `edutrack_session`. Semester GPA, units and quality points are computed from the stored courses, never stored, so edits and deletes always recalculate everything.

## Formulas
- Quality points = credit unit × grade point (5.0 scale: A5 B4 C3 D2 E1 F0; 4.0 scale: A4 B3 C2 D1 F0)
- GPA = total quality points ÷ total credit units
- CGPA = quality points of ALL semesters ÷ credit units of ALL semesters (not an average of GPAs)
- Required GPA = (Target × (Completed + Remaining) − Current CGPA × Completed) ÷ Remaining
- Maximum achievable CGPA = (Current CGPA × Completed + Max grade × Remaining) ÷ (Completed + Remaining)

## Security note
Authentication uses LocalStorage for demonstration only. It is NOT production-grade security.

EduTrack is an academic planning and analytics tool designed to help students understand their academic performance and make informed study decisions. It is not affiliated with any university and does not guarantee academic improvement.
