# GitHub Pages Deployment Guide

This guide will help you deploy your DevOps portfolio to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your local machine
- Basic knowledge of Git commands

## Step-by-Step Deployment

### 1. Create a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `devops-portfolio` or `yourusername.github.io`)
5. Make it public
6. Don't initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Upload Your Files

#### Option A: Using Git Command Line

1. Open terminal/command prompt
2. Navigate to your project folder
3. Initialize Git repository:
   ```bash
   git init
   ```

4. Add all files:
   ```bash
   git add .
   ```

5. Commit your changes:
   ```bash
   git commit -m "Initial commit: DevOps portfolio website"
   ```

6. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/yourusername/your-repository-name.git
   ```

7. Push to GitHub:
   ```bash
   git push -u origin main
   ```

#### Option B: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all your files (index.html, styles.css, script.js, README.md, .gitignore)
4. Add commit message: "Initial commit: DevOps portfolio website"
5. Click "Commit changes"

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" folder
7. Click "Save"

### 4. Access Your Website

- Your website will be available at: `https://yourusername.github.io/your-repository-name`
- It may take a few minutes for the changes to take effect
- You can check the deployment status in the "Actions" tab

## Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository Settings > Pages
2. Enter your custom domain in the "Custom domain" field
3. Add a `CNAME` file to your repository root with your domain name
4. Configure DNS settings with your domain provider

## Updating Your Website

To update your website:

1. Make changes to your files locally
2. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
3. Changes will automatically deploy to GitHub Pages

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure your main HTML file is named `index.html`
2. **Styling not loading**: Check that `styles.css` is in the same directory as `index.html`
3. **JavaScript not working**: Verify `script.js` is properly linked
4. **Images not displaying**: Ensure image paths are correct and images are uploaded

### Checking Deployment Status

1. Go to your repository
2. Click on "Actions" tab
3. Look for "pages build and deployment" workflow
4. Check if it's successful or if there are any errors

## Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Minify CSS/JS**: Use online tools to minify your CSS and JavaScript
3. **Use CDN**: Consider using a CDN for external resources
4. **Enable Compression**: GitHub Pages automatically enables gzip compression

## Security Considerations

1. **No Sensitive Data**: Don't include API keys or sensitive information
2. **HTTPS**: GitHub Pages automatically provides HTTPS
3. **Content Security**: Be mindful of what you publish publicly

## Support

If you encounter issues:

1. Check GitHub Pages documentation
2. Look at the Actions tab for error messages
3. Verify your file structure matches the requirements
4. Ensure all file names are lowercase and don't contain spaces

---

Your DevOps portfolio is now live! 🚀
