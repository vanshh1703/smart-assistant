import fs from 'fs';
import path from 'path';

const files = [
  'Dashboard.jsx',
  'Projects.jsx',
  'KnowledgeBase.jsx',
  'MeetingSummaries.jsx'
];

const basePath = 'c:/Users/negiv/OneDrive/Desktop/ai full stack project/frontend/src/pages';

files.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract imports from lucide-react
  const lucideMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/);
  if (!lucideMatch) {
    console.log(`${file}: No lucide-react imports found.`);
    return;
  }

  const importedIcons = lucideMatch[1].split(',').map(i => i.trim()).filter(i => i && !i.startsWith('//'));

  // Extract used icons in JSX ( <IconName ... )
  const usedIconsMatch = content.matchAll(/<([A-Z][A-Za-z0-9]+)\s/g);
  const usedIcons = new Set();
  for (const match of usedIconsMatch) {
    const iconName = match[1];
    // Filter out potential React components that aren't icons
    // Icons in Lucide are typically single words or camelCase
    // We'll just check if they are in the imported list if they look like an icon.
    usedIcons.add(iconName);
  }

  const missingIcons = [];
  usedIcons.forEach(icon => {
    // Only care about icons not in importedIcons and not common React components/local components
    const commonReact = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'main', 'button', 'input', 'img', 'aside', 'ul', 'li', 'a', 'nav', 'form', 'label', 'tr', 'td', 'th', 'thead', 'tbody', 'table', 'footer', 'header', 'i', 'b', 'strong', 'em', 'br', 'hr', 'svg', 'path', 'rect', 'circle', 'line', 'polyline', 'polygon', 'ellipse', 'text', 'tspan', 'defs', 'g', 'marker', 'mask', 'pattern', 'use', 'image', 'clippath', 'lineargradient', 'radialgradient', 'stop', 'filter', 'feGaussianBlur', 'feOffset', 'feMerge', 'feMergeNode', 'feColorMatrix', 'feFlood', 'feComponentTransfer', 'feFuncR', 'feFuncG', 'feFuncB', 'feFuncA', 'feComposite', 'feMorphology', 'feTile', 'feDisplacementMap', 'feTurbulence', 'feDiffuseLighting', 'feSpecularLighting', 'feDistantLight', 'fePointLight', 'feSpotLight', 'feConvolveMatrix', 'feSpecularLighting', 'feImage', 'feBlend', 'symbol'];
    const localComps = ['Sidebar', 'Header', 'ChartPulse', 'GridGradient', 'MiniTrend', 'MetricCard', 'ActionCard', 'CloudUpload', 'CirclePulse', 'CloudUpload'];
    
    if (!importedIcons.includes(icon) && !commonReact.includes(icon.toLowerCase()) && !localComps.includes(icon)) {
      missingIcons.push(icon);
    }
  });

  if (missingIcons.length > 0) {
    console.log(`${file}: Missing icons: ${missingIcons.join(', ')}`);
  } else {
    console.log(`${file}: All icons verified.`);
  }
});
