# Deployment Guide: GitHub Desktop & GitHub Pages

This guide will walk you through publishing your CMSR Website to GitHub and deploying it live using GitHub Pages.

## 📋 Prerequisites

- GitHub account
- GitHub Desktop installed on your computer
- This repository already initialized with git

## 🚀 Step 1: Publish to GitHub using GitHub Desktop

### Option A: If you already have a GitHub repository

1. **Open GitHub Desktop**
   - Launch GitHub Desktop application

2. **Add the Repository**
   - Click `File` → `Add Local Repository`
   - Navigate to: `/Users/sumansourabh77/Documents/Suman/CMSR Website L`
   - Click `Add`

3. **Connect to GitHub**
   - If not already connected, click `Repository` → `Repository Settings`
   - Click `Remote` tab
   - Click `Add Remote` or edit existing
   - Enter your repository URL: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
   - Click `Save`

4. **Publish/Push to GitHub**
   - In GitHub Desktop, you should see your commit
   - Click `Publish branch` (if first time) or `Push origin` (if repository exists)
   - Your code will be pushed to GitHub!

### Option B: Create a new repository from GitHub Desktop

1. **Open GitHub Desktop**
   - Launch GitHub Desktop application

2. **Add the Repository**
   - Click `File` → `Add Local Repository`
   - Navigate to: `/Users/sumansourabh77/Documents/Suman/CMSR Website L`
   - Click `Add`

3. **Publish to GitHub**
   - Click `Publish repository` button (top right)
   - Choose:
     - ✅ Keep this code private (or uncheck for public)
     - Repository name: `cmsr-website` (or your preferred name)
   - Click `Publish Repository`
   - Your code will be uploaded to GitHub!

## 🌐 Step 2: Enable GitHub Pages

1. **Go to GitHub Website**
   - Open your browser and go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

2. **Navigate to Settings**
   - Click on the `Settings` tab (top right of your repository)

3. **Go to Pages Section**
   - Scroll down to `Pages` in the left sidebar
   - Or go directly to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/settings/pages`

4. **Configure GitHub Pages**
   - Under `Source`, select: `GitHub Actions`
   - This will use the workflow file we created (`.github/workflows/deploy.yml`)

5. **Save Settings**
   - The settings will be saved automatically

## 🔄 Step 3: Automatic Deployment

Once you've enabled GitHub Pages with GitHub Actions:

1. **Push any changes** to the `main` branch using GitHub Desktop
2. **GitHub Actions will automatically:**
   - Build your website
   - Deploy it to GitHub Pages
   - Make it live!

3. **View your website**
   - After deployment (usually 2-3 minutes), your site will be live at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## 📝 Step 4: Making Updates

Every time you want to update your website:

1. **Make changes** to your code
2. **Commit in GitHub Desktop:**
   - Write a commit message (e.g., "Update homepage content")
   - Click `Commit to main`
3. **Push to GitHub:**
   - Click `Push origin` button
4. **Wait for deployment:**
   - GitHub Actions will automatically rebuild and redeploy
   - Check the `Actions` tab in GitHub to see deployment progress

## 🔍 Troubleshooting

### If deployment fails:
1. Check the `Actions` tab in your GitHub repository
2. Look for error messages in the workflow logs
3. Common issues:
   - Missing dependencies (should be fixed now)
   - Build errors (check the Actions log)

### If the website shows 404:
1. Make sure GitHub Pages is enabled in Settings → Pages
2. Ensure the source is set to `GitHub Actions`
3. Wait a few minutes for the first deployment to complete

### If routes don't work:
- The configuration should handle this automatically
- If issues persist, check the browser console for errors

## 📚 Additional Resources

- [GitHub Desktop Documentation](https://docs.github.com/en/desktop)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## ✅ Quick Checklist

- [ ] Repository published to GitHub via GitHub Desktop
- [ ] GitHub Pages enabled in repository settings
- [ ] Source set to "GitHub Actions"
- [ ] First deployment completed (check Actions tab)
- [ ] Website accessible at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

**Your website will automatically update every time you push changes to the main branch!** 🎉

