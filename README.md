# HyLearn (developed by AJIT KUMAR PANDIT)

Deployed Link :: [Link](https://hylearn.vercel.app)

![Image](./hylearn.png)

# Demo

## User View (STUDENT)

![Image](./student_HyLearn_view.gif)

## Admin View (CREATOR)

![Image](./admin_HyLearn_view.gif)

## Super Admin View (ADMIN)

![Image](./superadmin_HyLearn_view.gif)

## Running On Local Host

### Clone the git repository

```bash
git clone https://github.com/AJIT-KUMAR-PANDIT/HyLearn.git
```

## How to run locally

### Env For Server

```bash
DB=
Activation_Secret=
Jwt_Sec=
Forgot_Secret=
frontendurl=
PORT=5000
Gmail=
Password=
Razorpay_Key=
Razorpay_Secret=
```

### Env For Frontend

```bash
Razorpay_Key=
VITE_GOOGLE=
VITE_SERVER=http://localhost:5000
VITE_FRONTEND=
```

### go to client directory and install dependencies

```bash
cd client
npm install
```

### go to server directory and install dependencies

```bash
cd server
npm install
```

### go to server directory and run it

```bash
cd server
npm run dev
```

### go to client directory and run it

```bash
cd client
npm run dev
```
