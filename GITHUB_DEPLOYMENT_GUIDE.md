# GitHub Deployment Guide for CMSR Website

This guide will walk you through deploying your CMSR website to GitHub Pages using GitHub Desktop.

## Prerequisites

- GitHub Desktop installed on your computer
- GitHub account (username: `sumanstiss`)
- Node.js and npm installed (for building the website)

---

## Step 1: Create a New Repository on GitHub

1. **Go to GitHub.com** and sign in with your account (`sumanstiss`)
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `cmsr-website` (or any name you prefer)
   - **Description**: "CMSR Consultants Official Website"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

---

## Step 2: Connect Your Local Project to GitHub

### Option A: Using GitHub Desktop (Recommended)

1. **Open GitHub Desktop**
2. Click **"File"** → **"Add Local Repository"**
3. Click **"Choose..."** and navigate to your project folder:
   ```
   /Users/sumansourabh77/Documents/Suman/CMSR Website L
   ```
4. Click **"Add Repository"**

5. **If the repository is not connected to GitHub:**
   - Click **"Publish repository"** button (top right)
   - **Repository name**: `cmsr-website` (or your chosen name)
   - **Description**: "CMSR Consultants Official Website"
   - **Keep this code private**: Uncheck this (must be public for free GitHub Pages)
   - Click **"Publish Repository"**

### Option B: If Repository Already Exists on GitHub

1. In GitHub Desktop, click **"Repository"** → **"Repository Settings"**
2. Click **"Remote"** tab
3. Click **"Add Remote"**
4. Enter:
   - **Name**: `origin`
   - **Primary remote**: Check this
   - **URL**: `https://github.com/sumanstiss/cmsr-website.git` (replace with your actual repository name)
5. Click **"Add Remote"**

---

## Step 3: Commit and Push Your Code

1. **In GitHub Desktop**, you'll see all your changed files
2. **Review the changes** in the left panel
3. **Write a commit message** at the bottom:
   ```
   Initial commit: CMSR Website ready for deployment
   ```
4. Click **"Commit to main"** (or your branch name)
5. Click **"Push origin"** button (top right) to upload to GitHub

---

## Step 4: Enable GitHub Pages

1. **Go to your repository on GitHub.com**:
   ```
   https://github.com/sumanstiss/cmsr-website
   ```
2. Click on **"Settings"** tab (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)` (we'll use GitHub Actions)
5. Click **"Save"**

---

## Step 5: Configure GitHub Pages with GitHub Actions

1. **In your repository**, go to **"Settings"** → **"Pages"**
2. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
3. The workflow file (`.github/workflows/deploy.yml`) is already in your project
4. **After you push the code**, GitHub Actions will automatically:
   - Build your website
   - Deploy it to GitHub Pages

---

## Step 6: Base Path Configuration (Automatic!)

**Good news!** The base path is automatically configured by GitHub Actions. You don't need to manually update it.

The workflow file (`.github/workflows/deploy.yml`) automatically sets the correct base path based on your repository name when building.

**For local testing**, the base path defaults to `/` which is fine for development.

---

## Step 7: Wait for Deployment

1. **Go to your repository** on GitHub.com
2. Click on **"Actions"** tab
3. You'll see a workflow run called **"Deploy to GitHub Pages"**
4. **Wait for it to complete** (green checkmark)
   - This usually takes 2-5 minutes
   - The workflow will:
     - Install dependencies
     - Build your website
     - Deploy to GitHub Pages

---

## Step 8: Access Your Website

Once deployment is complete:

1. **Go to** `Settings` → `Pages` in your repository
2. You'll see your website URL:
   ```
   https://sumanstiss.github.io/cmsr-website/
   ```
   (Replace `cmsr-website` with your repository name)

3. **Click the link** or copy it to share!

---

## Step 9: Future Updates

Whenever you make changes to your website:

1. **Make your changes** in your code editor
2. **Open GitHub Desktop**
3. **Review changes** in the left panel
4. **Write a commit message** (e.g., "Update navigation styling")
5. Click **"Commit to main"**
6. Click **"Push origin"**
7. **GitHub Actions will automatically rebuild and redeploy** your website
8. Wait 2-5 minutes for the deployment to complete

---

## Troubleshooting

### Website shows 404 error
- **Check the base path** in `vite.config.ts` matches your repository name
- **Wait a few minutes** - GitHub Pages can take time to update
- **Clear your browser cache** and try again

### GitHub Actions workflow fails
- **Check the "Actions" tab** for error messages
- **Common issues**:
  - Missing dependencies (run `npm install` locally first)
  - Build errors (check the build log)
  - Base path issues

### Can't see the "Pages" option in Settings
- Make sure your repository is **Public** (not private)
- Free GitHub accounts require public repos for GitHub Pages

### Changes not appearing
- **Wait 2-5 minutes** after pushing
- **Check GitHub Actions** to ensure deployment completed
- **Hard refresh** your browser (Ctrl+F5 or Cmd+Shift+R)

---

## Quick Reference Commands

If you prefer using terminal instead of GitHub Desktop:

```bash
# Navigate to your project
cd "/Users/sumansourabh77/Documents/Suman/CMSR Website L"

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

---

## Your Website URL Format

Your website will be accessible at:
```
https://sumanstiss.github.io/[repository-name]/
```

For example, if your repository is named `cmsr-website`:
```
https://sumanstiss.github.io/cmsr-website/
```

---

## Need Help?

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **GitHub Desktop Guide**: https://docs.github.com/en/desktop
- **GitHub Actions**: Check the "Actions" tab in your repository

---

**Congratulations!** Your CMSR website is now live on GitHub Pages! 🎉

