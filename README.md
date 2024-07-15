# CodeLoft

CodeLoft is an online judge platform that allows users to solve coding problems and get immediate verdicts on their solutions. The platform authenticates and authorizes users using JSON Web Tokens (JWT) and differentiates between users and admins. Admins can create, update, and delete problems, while users can solve problems and receive verdicts based on predefined test cases. The backend has been deployed on AWS(Amazon Web Services) while the frontend is deployed on render .It uses docker container for efficient and lightweight environment which is pushed to ECR and fetched or pulled from EC2 instances to make it production-ready and scalable.

## Features

- **Authentication and Authorization**: Secure login and registration using JWT.
- **Admin Capabilities**: Admin users can create, update, and delete coding problems.
- **Problem Solving**: Users can solve coding problems and submit solutions.
- **Immediate Feedback**: Upon submission, the platform provides a verdict indicating whether the solution passed all test cases.
- **CRUD Operations**: Supports CRUD operations for problems.
- **Submissions Page**:Shows all the submissions.
## Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Compiler Frontend**: uses Monaco editor for compiler part
- **Deployment**: AWS for backend Vercel for frontend
  
## Screenshots
<div style="display: flex;">
    <img src="ojimages/login.jpeg" alt="Screenshot 1" width="400" height="300">
    <img src="ojimages/home.jpeg" alt="Screenshot 2" width="400" height="300">
</div>
<div style="display: flex;">
  <img src="ojimages/problemspage.jpeg" alt="Screenshot 3" width="400" height="300">
  <img src="ojimages/extraresources.jpeg" alt="Screenshot 4" width="400" height="300">
</div>
<div style="display: flex;">
<img src="ojimages/updateproblem.jpeg" alt="Screenshot 5" width="400" height="300">
<img src="ojimages/createproblem.jpeg" alt="Screenshot 6" width="400" height="300">
</div>
<div style="display: flex;">
<img src="ojimages/compilerrun.jpeg" alt="Screenshot 5" width="400" height="300">
<img src="ojimages/compilererror.jpeg" alt="Screenshot 6" width="400" height="300">
</div>
