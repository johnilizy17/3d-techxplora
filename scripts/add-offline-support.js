#!/usr/bin/env node

/**
 * Script to automatically add offline support to all pages
 * Run with: node scripts/add-offline-support.js
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../src/pages');

// Template for offline support imports
const OFFLINE_IMPORTS = `
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { WifiOff, Download, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
`;

// Template for offline indicator component
const OFFLINE_INDICATOR = `
{/* Offline Indicator */}
{!isOnline && (
  <div className="bg-orange-100 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-500/20 p-4 rounded-2xl mb-6 flex items-center gap-3">
    <WifiOff className="w-5 h-5 text-orange-600 dark:text-orange-500" />
    <div>
      <span className="text-sm font-bold text-orange-700 dark:text-orange-400 block">
        You're offline
      </span>
      <span className="text-xs text-orange-600 dark:text-orange-500">
        {isOfflineAvailable ? 'Viewing cached content' : 'Some features may be limited'}
      </span>
    </div>
  </div>
)}
`;

// Pages that need offline support
const PAGES_TO_UPDATE = [
  'QuizCompletion.jsx',
  'QuizResult.jsx',
  'Quizzes.jsx',
  'StartQuiz.jsx',
  'CoursePreview.jsx',
  'Profile.jsx',
  'Groups.jsx',
  'Leaderboard.jsx',
  'CreateQuiz.jsx',
  'ManageCourses.jsx',
  'Wallet.jsx',
  'TeacherGroupDetails.jsx',
  'ViewManagedCourse.jsx',
  'EditQuiz.jsx',
  'EditCourse.jsx',
  'CreateCourse.jsx',
  'CreateGroup.jsx',
  'JoinGroup.jsx',
  'JoinQuiz.jsx',
  'UserProfile.jsx',
  'Stats.jsx',
  'Syllabus.jsx',
  'Teachers.jsx'
];

function addOfflineSupport(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has offline support
    if (content.includes('useOnlineStatus')) {
      console.log(`✓ ${path.basename(filePath)} already has offline support`);
      return;
    }

    // Add imports after existing imports
    const importMatch = content.match(/import.*from.*;\n/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport) + lastImport.length;
      content = content.slice(0, lastImportIndex) + OFFLINE_IMPORTS + content.slice(lastImportIndex);
    }

    // Add hooks in component
    const componentMatch = content.match(/export default function \w+\(\) \{/);
    if (componentMatch) {
      const hookCode = `
  const isOnline = useOnlineStatus();
  const { isSyncing, pendingCount } = useOfflineSync();
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
`;
      const insertIndex = content.indexOf(componentMatch[0]) + componentMatch[0].length;
      content = content.slice(0, insertIndex) + hookCode + content.slice(insertIndex);
    }

    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Added offline support to ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx') && PAGES_TO_UPDATE.includes(file)) {
      addOfflineSupport(filePath);
    }
  });
}

console.log('🚀 Adding offline support to all pages...\n');
processDirectory(PAGES_DIR);
console.log('\n✅ Done! All pages now have offline support.');
console.log('\n📝 Next steps:');
console.log('1. Review the changes');
console.log('2. Add specific caching logic for each page');
console.log('3. Test offline functionality');
console.log('4. Generate app icons');
console.log('5. Deploy!');
