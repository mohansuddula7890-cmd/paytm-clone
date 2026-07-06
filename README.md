ABOUT APP
    Developed a full-stack payment application using the MERN stack with secure JWT-based authentication and transactional money transfers. The application enables users to register, log in securely, manage their account, and transfer money between registered users while ensuring data consistency.

KEY FEATURES:

    * Secure Sign Up and Sign In with JWT-based authentication.
    * Protected dashboard displaying the user’s account balance.
    * Browse all registered users with a Send Money option for each user.
    * Dedicated transfer page for entering the transfer amount and confirming transactions.
    * MongoDB transactions to ensure atomic and reliable money transfers, preventing partial updates.
    * Logout functionality for secure session termination.
    * Account deletion feature for user account management.

TECH STACK:
    React.js, Node.js, Express.js, MongoDB, JWT, Axios, Tailwind CSS


PROCEDURE TO RUN THIS APPLICATION-(paytm-clone)

    1)create .env file in frontend folder 
      and add this 

      VITE_API_URL=http://localhost:3000

    2)create .env file in backend folder
      and add this

      MONGODB_URI=mongodb+srv://mohansuddula:976431@cluster0.vhw4b6z.mongodb.net/paytmApp?retryWrites=true&w=majority&appName=Cluster0

      JWT_SECRET=your_super_secret_key
    3)1st command to run
        npm install
    4)in vscode,follow below instructions
          a)open new terminal and change directory to frontend using below command
          cd frontend 
          and now run this command to run frontend server
            npm run dev
            open URL shown in terminal(http://localhost:5173)

          b)open new terminal and change directory to backend using below command
          cd backend
          and now run this command to run frontend server
            nodemon index.js
          output should 
            listening to port 3000
            connected
    5)now open the URL shown in frontend terminal,
      it open new tab in chrome(showing-PAYMENT APP)
      CHANGE THE URL TO
      1)http://localhost:5173/signup to SIGNUP
      2)http://localhost:5173/signin to SIGNIN(if you have account)
