To run the server - npm run dev
To run in powershell without admin - powershell -ExecutionPolicy ByPass

✅ Step-by-Step Thunder Client Testing Guide
✅ 1. Register a User
Method: POST
URL: http://localhost:5000/api/auth/register

Body → JSON

json
Copy
Edit
{
"name": "Himanshu",
"email": "himanshu@example.com",
"password": "123456"
}
Expected Response:

json
Copy
Edit
{
"token": "Bearer eyJhbGci...your.jwt.token...",
"user": {
"id": "60f...",
"name": "Himanshu",
"email": "himanshu@example.com"
}
}
✅ 2. Login with the Registered User
Method: POST
URL: http://localhost:5000/api/auth/login

Body → JSON

json
Copy
Edit
{
"email": "himanshu@example.com",
"password": "123456"
}
Expected Response:

json
Copy
Edit
{
"token": "Bearer eyJhbGci...your.jwt.token...",
"user": {
"id": "60f...",
"name": "Himanshu",
"email": "himanshu@example.com"
}
}

Data is going in - Test -> Users
