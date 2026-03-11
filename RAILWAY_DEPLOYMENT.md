# Deploying Backend to Railway

Your backend is perfectly set up and ready to be deployed to Railway! 

Railway is a fantastic choice because it automatically detects Node.js, installs dependencies using your `package.json`, runs your custom build script (`prisma generate && tsc`), and starts the server with your `start` script (`node dist/index.js`).

## Step 1: Push to GitHub
If you haven't already, push your entire `cafe-la-connect` project repository to a new repository on your GitHub account.

## Step 2: Connect to Railway
1. Go to [Railway.app](https://railway.app/) and log in with your GitHub account.
2. Click **New Project** and select **Deploy from GitHub repo**.
3. Choose your `cafe-la-connect` repository.
4. *Important:* Railway might try to deploy your entire repository. If your repository contains both frontend and backend folders, you need to tell Railway to only deploy the `server` folder.
   - When the project appears on your Railway dashboard, click on the deployed service card.
   - Go to **Settings** -> **Build**.
   - Set the **Root Directory** to `server`.

## Step 3: Add Environment Variables
Your live server needs to know how to connect to your live database!

1. In the Railway dashboard for your service, go to the **Variables** tab.
2. Click **New Variable** and add the following:
   - **Name:** `DATABASE_URL`
   - **Value:** `mongodb+srv://sayankar144:Thor144%40@cluster0.vhilyir.mongodb.net/cafe_db?appName=Cluster0` (Exactly as it is in your local `.env`)

## Step 4: Get Your Live URL
1. Still in the Railway dashboard, go back to the **Settings** tab.
2. Under **Environment**, look for **Domains**.
3. Click **Generate Domain** to get a free public URL for your backend (e.g., `cafe-la-server-production.up.railway.app`).

**Copy this URL!** You will need it when you deploy your frontend to Netlify so your frontend knows where to send requests.
