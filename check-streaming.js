#!/usr/bin/env node

/**
 * Quick Diagnostic Script for Live Streaming
 * Run with: node check-streaming.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Live Streaming Setup...\n');

const checks = [];

// Check 1: Signaling server file exists
const signalingServerPath = path.join(__dirname, 'signaling-server.js');
if (fs.existsSync(signalingServerPath)) {
    checks.push({ name: 'Signaling server file', status: '✅', message: 'Found' });
} else {
    checks.push({ name: 'Signaling server file', status: '❌', message: 'Missing!' });
}

// Check 2: Live streaming utility exists
const liveStreamingPath = path.join(__dirname, 'src', 'utils', 'liveStreaming.js');
if (fs.existsSync(liveStreamingPath)) {
    checks.push({ name: 'Live streaming utility', status: '✅', message: 'Found' });
} else {
    checks.push({ name: 'Live streaming utility', status: '❌', message: 'Missing!' });
}

// Check 3: Live streaming hook exists
const hookPath = path.join(__dirname, 'src', 'hooks', 'useLiveStreaming.js');
if (fs.existsSync(hookPath)) {
    checks.push({ name: 'Live streaming hook', status: '✅', message: 'Found' });
} else {
    checks.push({ name: 'Live streaming hook', status: '❌', message: 'Missing!' });
}

// Check 4: Admin inspection page exists
const adminPagePath = path.join(__dirname, 'src', 'pages', 'admin', 'LiveInspection.jsx');
if (fs.existsSync(adminPagePath)) {
    checks.push({ name: 'Admin inspection page', status: '✅', message: 'Found' });
} else {
    checks.push({ name: 'Admin inspection page', status: '❌', message: 'Missing!' });
}

// Check 5: ws package installed
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.dependencies && packageJson.dependencies.ws) {
        checks.push({ name: 'ws package', status: '✅', message: `Installed (${packageJson.dependencies.ws})` });
    } else {
        checks.push({ name: 'ws package', status: '❌', message: 'Not installed! Run: npm install ws' });
    }
} else {
    checks.push({ name: 'package.json', status: '❌', message: 'Not found!' });
}

// Check 6: Route configured
const routesPath = path.join(__dirname, 'src', 'pages', 'index.jsx');
if (fs.existsSync(routesPath)) {
    const routesContent = fs.readFileSync(routesPath, 'utf8');
    if (routesContent.includes('LiveInspection') && routesContent.includes('/dashboard/admin/inspection')) {
        checks.push({ name: 'Admin route', status: '✅', message: 'Configured' });
    } else {
        checks.push({ name: 'Admin route', status: '⚠️', message: 'May not be configured' });
    }
} else {
    checks.push({ name: 'Routes file', status: '❌', message: 'Not found!' });
}

// Check 7: QuizCompletion integration
const quizCompletionPath = path.join(__dirname, 'src', 'pages', 'QuizCompletion.jsx');
if (fs.existsSync(quizCompletionPath)) {
    const quizContent = fs.readFileSync(quizCompletionPath, 'utf8');
    if (quizContent.includes('useLiveStreaming') && quizContent.includes('startStreaming')) {
        checks.push({ name: 'QuizCompletion integration', status: '✅', message: 'Integrated' });
    } else {
        checks.push({ name: 'QuizCompletion integration', status: '⚠️', message: 'May not be integrated' });
    }
} else {
    checks.push({ name: 'QuizCompletion file', status: '❌', message: 'Not found!' });
}

// Print results
console.log('📋 Diagnostic Results:\n');
checks.forEach(check => {
    console.log(`${check.status} ${check.name}: ${check.message}`);
});

// Summary
const passed = checks.filter(c => c.status === '✅').length;
const failed = checks.filter(c => c.status === '❌').length;
const warnings = checks.filter(c => c.status === '⚠️').length;

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Summary: ${passed} passed, ${failed} failed, ${warnings} warnings\n`);

if (failed > 0) {
    console.log('❌ Some checks failed! Please fix the issues above.\n');
    process.exit(1);
} else if (warnings > 0) {
    console.log('⚠️ All critical checks passed, but there are warnings.\n');
} else {
    console.log('✅ All checks passed! Setup looks good.\n');
}

// Next steps
console.log('📝 Next Steps:\n');
console.log('1. Start signaling server: node signaling-server.js');
console.log('2. Start dev server: npm run dev');
console.log('3. Open student quiz page');
console.log('4. Open admin inspection page: /dashboard/admin/inspection');
console.log('5. Check browser console for errors (F12)\n');

console.log('🔍 If streaming still not working:');
console.log('   - Check STREAMING_TROUBLESHOOTING.md');
console.log('   - Verify signaling server is running');
console.log('   - Check browser console for errors');
console.log('   - Ensure camera/mic/screen permissions granted\n');
