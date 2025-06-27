Project Structure:

splitwise-clone/
├── public/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── Dashboard/
│ │ │ ├── Dashboard.jsx
│ │ │ └── BalanceSummary.jsx
│ │ ├── Groups/
│ │ │ ├── CreateGroup.jsx
│ │ │ ├── GroupDetails.jsx
│ │ │ └── GroupList.jsx
│ │ ├── Expenses/
│ │ │ ├── AddExpense.jsx
│ │ │ ├── ExpenseList.jsx
│ │ │ └── SettleUp.jsx
│ │ └── Shared/
│ │ ├── Navbar.jsx
│ │ └── ProtectedRoute.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── LoginPage.jsx
│ │ ├── RegisterPage.jsx
│ │ ├── DashboardPage.jsx
│ │ ├── GroupPage.jsx
│ │ └── NotFoundPage.jsx
│ ├── App.jsx
│ ├── index.js
│ ├── api/ (for axios calls)
│ ├── context/ (for user and group state management)
│ └── utils/ (encryption, calculation logic)
├── package.json
└── README.md

Important commands:

To run the server - npm run dev
To run in powershell without admin - powershell -ExecutionPolicy ByPass

Pre-requisites:
React Router DOM should be installed : npm install react-router-dom

Development:
To bypass login(for building pages that are accessed after logging in) :

1. Open console on the browser
2. Add - localStorage.setItem("token", "test-token");
3. Hit "Enter"

To log out:

1. Open console on the browser
2. Add - localStorage.removeItem("token");
3. Hit "Enter"
