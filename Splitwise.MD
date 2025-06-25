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
