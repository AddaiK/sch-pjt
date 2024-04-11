1. Download zip file on Github or clone repo if conversant with version control.
2. Open VS Code or any code editor to the root of the project.
3. Open a terminal pointing to the root directory of project and issue 'npm install' command to install all modules of application
4. When module installation is done, issue 'npm start' command to run your application on a local server.
5. Your app is ready and live!!

NB: Install NodeJs 
# installs Chocolatey (Windows Package Manager)
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));
# download and install Node.js
choco install nodejs --version="20.12.0"
# verifies the right Node.js version is in the environment
node -v # should print `v20.12.0`
# verifies the right NPM version is in the environment
npm -v # should print `10.5.0`


# Supabase URL
Database_URL - https://supabase.com/dashboard/project/hbvzbmargzwrfctmqqtd/editor

# Supabase login
login - adjei.edwin381@gmail.com
password - SamsProject@1

# Google login
login - adjei.edwin381@gmail.com
password - SamsProject@123

# Database
database name - Sams Database
password - SamsProject@1


# Prerequisites for GitHub Configuration
Before you begin, make sure you have the following:

- A Windows PC with an active internet connection.
- An email address to sign up for a GitHub account.
- Basic knowledge of using the command line interface (CLI) in Windows.

Steps
# Sign up for GitHub

Open your web browser and navigate to GitHub.
Click on the "Sign up" button and follow the prompts to create a GitHub account.
Make sure to verify your email address after signing up.

# Download and Install Git

Go to the Git website and download the latest version of Git for Windows.
Run the downloaded installer and follow the installation instructions.
During the installation, you can choose the default options unless you have specific preferences.

# Configure Git

Open the command prompt by pressing Win + R, typing cmd, and hitting Enter.
Set your username and email address for Git by running the following commands:

git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
Replace "Your Name" with your actual name and "your.email@example.com" with the email you used to sign up for GitHub.


# Verify Your Setup

To ensure Git and GitHub are set up correctly, try cloning a repository.
Navigate to a repository on GitHub that you want to clone.
Click on the "Code" button and copy the SSH URL.

Go to VS Code
On the Welcome Screen, you should see Clone Git Repository.
Click on that.
Paste the URL you copied and press enter.


