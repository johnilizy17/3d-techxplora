# PWA Deployment Checklist

Complete this checklist before deploying your PWA to production.

## Pre-Deployment

### 1. Icons & Assets ✓
- [ ] Generate all required icon sizes (72, 96, 128, 144, 152, 192, 384, 512)
- [ ] Place icons in `public/` folder
- [ ] Create badge icon (72x72) for notifications
- [ ] Test icons display correctly on different devices
- [ ] Optimize icon file sizes (use PNG compression)

### 2. Manifest Configuration ✓
- [ ] Update `public/manifest.json` with correct app name
- [ ] Set appropriate theme colors
- [ ] Add app description
- [ ] Configure start URL
- [ ] Set display mode (standalone recommended)
- [ ] Add screenshots (optional but recommended)

### 3. Service Worker ✓
- [ ] Test service worker registers correctly
- [ ] Verify caching strategies work
- [ ] Test offline fallback page
- [ ] Update cache version if needed
- [ ] Test cache invalidation on updates

### 4. Testing

#### Local Testing
- [ ] Build production version: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Test in Chrome DevTools:
  - [ ] Service Worker active
  - [ ] Cache Storage populated
  - [ ] Offline mode works
  - [ ] Install prompt appears
- [ ] Test in Firefox
- [ ] Test in Safari (if available)

#### Mobile Testing
- [ ] Test on Android Chrome
- [ ] Test on iOS Safari
- [ ] Test install process
- [ ] Test offline functionality
- [ ] Test app icon and splash screen
- [ ] Test orientation handling

#### Offline Testing
- [ ] Load app online first
- [ ] Go offline (airplane mode)
- [ ] Navigate between pages
- [ ] Submit forms (should queue)
- [ ] Go back online
- [ ] Verify queued actions sync

### 5. Performance
- [ ] Run Lighthouse audit (aim for 90+ PWA score)
- [ ] Check bundle size (use `npm run build` and check dist/)
- [ ] Optimize images and assets
- [ ] Enable compression on server (gzip/brotli)
- [ ] Test on slow 3G connection

### 6. Security
- [ ] Ensure HTTPS is enabled (required for PWA)
- [ ] Validate manifest.json
- [ ] Check Content Security Policy
- [ ] Review cached sensitive data
- [ ] Implement proper authentication for sync

## Deployment

### 1. Build
```bash
npm run build
```

### 2. Deploy to Hosting

#### Vercel
```bash
vercel --prod
```

#### Netlify
```bash
netlify deploy --prod
```

#### Custom Server
- Upload `dist/` folder contents
- Ensure `sw.js` is at root
- Ensure `manifest.json` is at root
- Configure server for SPA routing

### 3. Server Configuration

#### Headers to Add
```
# Service Worker
/sw.js
  Cache-Control: no-cache

# Manifest
/manifest.json
  Content-Type: application/manifest+json

# Enable HTTPS
Force HTTPS redirect

# Compression
Enable gzip/brotli for JS, CSS, HTML
```

#### SPA Routing
Ensure all routes redirect to `index.html` for client-side routing.

### 4. DNS & SSL
- [ ] Configure custom domain
- [ ] Enable SSL certificate
- [ ] Test HTTPS works
- [ ] Update manifest start_url if needed

## Post-Deployment

### 1. Verification
- [ ] Visit site on HTTPS
- [ ] Check service worker registers
- [ ] Test install prompt appears
- [ ] Install app on mobile device
- [ ] Test offline mode
- [ ] Verify icons display correctly
- [ ] Check theme colors apply

### 2. Testing Checklist
- [ ] Desktop Chrome - Install & offline
- [ ] Desktop Firefox - Offline mode
- [ ] Desktop Edge - Install & offline
- [ ] Android Chrome - Install & offline
- [ ] iOS Safari - Add to home screen & offline
- [ ] Samsung Internet - Install & offline

### 3. Analytics
- [ ] Verify Google Analytics tracking works
- [ ] Track PWA install events
- [ ] Monitor offline usage
- [ ] Track sync failures

### 4. Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor service worker errors
- [ ] Track cache hit rates
- [ ] Monitor sync queue size

## Lighthouse Audit Targets

Run: Chrome DevTools > Lighthouse > Progressive Web App

Target Scores:
- [ ] PWA: 90+
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### PWA Checklist Items
- [ ] Registers a service worker
- [ ] Responds with 200 when offline
- [ ] Has a web app manifest
- [ ] Configured for a custom splash screen
- [ ] Sets a theme color
- [ ] Content sized correctly for viewport
- [ ] Has a `<meta name="viewport">` tag
- [ ] Provides a valid apple-touch-icon

## Common Issues & Solutions

### Issue: Service Worker Not Registering
**Solutions:**
- Ensure HTTPS is enabled
- Check browser console for errors
- Verify `sw.js` is accessible at `/sw.js`
- Clear browser cache and reload

### Issue: Install Prompt Not Showing
**Solutions:**
- Ensure all required icons exist
- Validate manifest.json
- Visit site at least twice
- Check browser console for manifest errors
- Note: iOS doesn't show install prompt

### Issue: Offline Mode Not Working
**Solutions:**
- Verify service worker is active
- Check Cache Storage has entries
- Test with DevTools offline mode first
- Ensure fetch events are being intercepted

### Issue: App Not Updating
**Solutions:**
- Increment cache version in `sw.js`
- Implement update notification
- Force reload: Unregister SW + clear cache
- Check update logic in service worker

### Issue: Icons Not Displaying
**Solutions:**
- Verify icon paths in manifest.json
- Check icon files exist in public/
- Ensure correct MIME types
- Test icon sizes are correct

## Maintenance

### Regular Tasks
- [ ] Update cache version when deploying changes
- [ ] Monitor cache size and clear old data
- [ ] Review and optimize cached assets
- [ ] Update manifest when branding changes
- [ ] Test on new browser versions

### When Deploying Updates
1. Increment `CACHE_VERSION` in `sw.js`
2. Build and deploy
3. Service worker will auto-update
4. Users will see update notification
5. Monitor for errors

### Cache Management
- Clear old cache automatically (7+ days)
- Limit cache size to prevent storage issues
- Prioritize critical assets
- Remove unused cached items

## Resources

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Manifest Validator](https://manifest-validator.appspot.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Documentation
- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google PWA Guide](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Icon Generators
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [App Icon Generator](https://appicon.co/)

## Success Criteria

Your PWA is ready when:
- ✅ Lighthouse PWA score is 90+
- ✅ App installs on mobile devices
- ✅ Works offline (cached pages load)
- ✅ Service worker updates automatically
- ✅ Icons display correctly everywhere
- ✅ Theme colors match design
- ✅ Offline indicator shows when disconnected
- ✅ Queued actions sync when back online
- ✅ No console errors
- ✅ Fast load times (< 3s on 3G)

## Final Checks

Before announcing PWA launch:
- [ ] All checklist items completed
- [ ] Tested on multiple devices
- [ ] Lighthouse audit passed
- [ ] No critical errors in console
- [ ] Analytics tracking works
- [ ] Error monitoring set up
- [ ] Documentation updated
- [ ] Team trained on PWA features

---

**Congratulations!** 🎉 Your PWA is ready for production!

For support, refer to:
- `PWA_SETUP.md` - Detailed setup guide
- `QUICK_START_PWA.md` - Quick start guide
- `INTEGRATION_EXAMPLES.md` - Code examples
