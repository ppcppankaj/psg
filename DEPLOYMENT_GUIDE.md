# Deployment Guide - PSG Associate Website

## Quick Start Deployment

This guide covers deploying the PSG Associate premium website to production.

---

## Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Built for Next.js
- ✅ Auto-deployments from GitHub
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Analytics included

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Go to [Vercel.com](https://vercel.com)**
   - Sign up / Log in
   - Click "Add New..." → "Project"
   - Import GitHub repository

3. **Configure Environment Variables**
   ```
   SMTP_USER = your_email@gmail.com
   SMTP_PASS = your_app_password (16 chars from Gmail)
   NEXT_PUBLIC_URL = https://psgassociate.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is now live!

5. **Connect Domain**
   - Go to Settings → Domains
   - Add your domain (psgassociate.com)
   - Update DNS records as instructed

### Auto-Deploy Setup

Every push to `main` branch automatically deploys:
```bash
git push origin main  # Triggers automatic deployment
```

---

## Option 2: Deploy to Netlify

### Steps

1. **Connect Repository**
   - Go to [Netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and choose your repo

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Go to Site settings → Environment
   - Add all variables from .env.local

4. **Deploy**
   - Netlify will build and deploy automatically

---

## Option 3: Self-Hosted on VPS/Dedicated Server

### Requirements
- Ubuntu 20.04+ or similar
- Node.js 18+
- npm/yarn
- PostgreSQL (optional, for database)
- PM2 (for process management)

### Setup Steps

1. **SSH into your server**
   ```bash
   ssh user@your_server_ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**
   ```bash
   cd /var/www
   git clone https://github.com/your-username/psg-website.git
   cd psg-website
   npm install
   ```

4. **Build project**
   ```bash
   npm run build
   ```

5. **Create .env.local**
   ```bash
   cat > .env.local << EOF
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   NEXT_PUBLIC_URL=https://psgassociate.com
   EOF
   ```

6. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

7. **Start application**
   ```bash
   pm2 start npm --name "psg-website" -- start
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt-get install -y nginx
   ```

   Create `/etc/nginx/sites-available/psgassociate.com`:
   ```nginx
   server {
     listen 80;
     server_name psgassociate.com www.psgassociate.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/psgassociate.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d psgassociate.com -d www.psgassociate.com
   ```

10. **Auto-renew SSL**
    ```bash
    sudo systemctl enable certbot.timer
    sudo systemctl start certbot.timer
    ```

---

## Post-Deployment Checklist

### Functionality Tests

- [ ] **Homepage loads correctly**
  ```bash
  curl https://psgassociate.com
  ```

- [ ] **All pages accessible**
  - https://psgassociate.com/
  - https://psgassociate.com/about
  - https://psgassociate.com/services
  - https://psgassociate.com/contact
  - https://psgassociate.com/job-seeker
  - https://psgassociate.com/client-requirement

- [ ] **Forms submit successfully**
  - Test contact form
  - Test job seeker form
  - Test client requirement form
  - Verify emails are received

- [ ] **Email delivery working**
  - Send test email through contact form
  - Check admin inbox
  - Check user confirmation email

### Performance & SEO

- [ ] **Lighthouse audit**
  - Run Chrome DevTools audit
  - Target: 90+ scores
  - Check Core Web Vitals

- [ ] **Google Search Console**
  - Add property
  - Submit sitemap: `/sitemap.xml`
  - Check for indexing errors
  - Request indexing of main pages

- [ ] **Page Speed**
  - Test with PageSpeed Insights
  - Test with GTmetrix
  - Analyze waterfall charts

- [ ] **Mobile responsiveness**
  - Test on multiple devices
  - Check touch interactions
  - Verify forms on mobile
  - Test WhatsApp button

### Security Audit

- [ ] **SSL Certificate**
  - Verify HTTPS works
  - Check certificate validity
  - Test mixed content warnings

- [ ] **Security Headers**
  - Add security headers in Nginx/server config:
  ```nginx
  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-Content-Type-Options "nosniff";
  add_header X-XSS-Protection "1; mode=block";
  add_header Referrer-Policy "no-referrer-when-downgrade";
  ```

- [ ] **CORS Configuration**
  - Verify only trusted origins allowed
  - Test API endpoints

- [ ] **Rate Limiting**
  - Verify rate limiting works
  - Test with multiple rapid requests

---

## Monitoring & Maintenance

### Setup Monitoring

**Vercel Dashboard**:
- Monitor deployment status
- Check analytics
- Review error logs

**Self-Hosted with PM2**:
```bash
# View logs
pm2 logs psg-website

# Monitor processes
pm2 monit

# Restart if needed
pm2 restart psg-website

# View startup logs
pm2 start npm --name "psg-website" -- start
```

### Automated Backups

**GitHub** (code only):
```bash
# Automatic with git push
git push origin main
```

**Self-Hosted**:
```bash
# Create daily backup script
cat > /home/user/backup.sh << EOF
#!/bin/bash
BACKUP_DIR="/var/backups/psg-website"
mkdir -p $BACKUP_DIR
cp -r /var/www/psg-website $BACKUP_DIR/$(date +%Y%m%d)
find $BACKUP_DIR -mtime +30 -delete  # Keep last 30 days
EOF

# Make executable and schedule
chmod +x /home/user/backup.sh
crontab -e
# Add: 0 2 * * * /home/user/backup.sh
```

### Regular Maintenance

- **Weekly**: Check error logs for issues
- **Monthly**: Review analytics and performance
- **Quarterly**: Security audit
- **Annually**: Update dependencies

---

## DNS Configuration

Point your domain to your hosting:

### For Vercel
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.89
```

### For Netlify
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: psg-website.netlify.app
```

### For Self-Hosted
```
Type: A
Name: @
Value: your.server.ip.address

Type: CNAME
Name: www
Value: @
```

---

## Troubleshooting Deployment Issues

### Issue: Build fails on deploy

**Solution**:
- Check build logs on platform
- Verify all environment variables set
- Run local build test: `npm run build`
- Check for TypeScript errors: `npx tsc --noEmit`

### Issue: Emails not sending in production

**Solution**:
- Verify SMTP credentials in environment
- Check Gmail app password (16 chars)
- Ensure 2FA enabled on email account
- Test with: `telnet smtp.gmail.com 587`

### Issue: Site shows old content

**Solution**:
- Clear browser cache (Ctrl+Shift+Del)
- Purge CDN cache (Vercel/Netlify settings)
- Force rebuild:
  ```bash
  vercel rebuild  # Vercel
  npm run build && npm start  # Self-hosted
  ```

### Issue: SSL certificate errors

**Solution**:
- Wait 24 hours for DNS propagation
- Force certificate renewal:
  ```bash
  sudo certbot renew --force-renewal
  ```
- Check certificate: `openssl s_client -connect psgassociate.com:443`

### Issue: High server CPU usage

**Solution**:
- Check for memory leaks: `pm2 monit`
- Restart application: `pm2 restart all`
- Check logs: `pm2 logs`
- Consider upgrading server resources

---

## Performance Optimization (Post-Deploy)

### Enable Caching Headers

**Nginx**:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
  expires 30d;
  add_header Cache-Control "public, immutable";
}

location / {
  expires 1d;
  add_header Cache-Control "public";
}
```

### Enable Gzip Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/html text/css text/javascript application/json;
gzip_min_length 1000;
```

### CDN Configuration

For self-hosted, integrate with Cloudflare:
1. Add domain to Cloudflare
2. Update DNS nameservers
3. Enable caching in Cloudflare dashboard
4. Set caching level to "Cache Everything"

---

## Analytics & Monitoring

### Google Analytics 4

Add to production `.env`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Error Tracking (Optional)

Consider using:
- Sentry for error tracking
- LogRocket for session replay
- New Relic for performance monitoring

---

## Scaling Considerations

If traffic increases:

1. **Vercel**: Auto-scales, no action needed
2. **Netlify**: Auto-scales, no action needed
3. **Self-hosted**: Consider:
   - Load balancer (nginx/HAProxy)
   - Multiple Node.js instances with PM2
   - Dedicated database server
   - Redis for caching

---

## Rollback Strategy

### If deployment breaks

**Vercel/Netlify**:
- Go to Deployments
- Click on previous stable version
- Promote to production

**Self-Hosted**:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or use PM2 rollback
pm2 save
pm2 kill
git reset --hard HEAD~1
npm install && npm run build
pm2 start npm --name "psg-website" -- start
```

---

## Support

For issues, contact:
- **Email**: psgassociate1@gmail.com
- **Phone**: +91 93130 45554

---

**Last Updated**: May 13, 2026
**Version**: 1.0.0
