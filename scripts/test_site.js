import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const errors = [];
const warnings = [];

function getFiles(dir, ext = '.html') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full, ext));
    } else if (file.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getFiles(distDir);

let checkedPages = 0;
let pagesWithJsonLd = 0;
let pagesWithCanonical = 0;
let pagesWithOgImage = 0;
let linkChecks = [];
let imgChecks = [];

for (const file of htmlFiles) {
  checkedPages++;
  const html = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(distDir, file);

  if (!html.includes('<title>') || html.includes('<title></title>')) {
    errors.push(`Missing title in ${relPath}`);
  }

  if (!html.includes('meta name="description"')) {
    warnings.push(`Missing meta description in ${relPath}`);
  }

  if (html.includes('link rel="canonical"')) {
    pagesWithCanonical++;
  } else {
    warnings.push(`Missing canonical in ${relPath}`);
  }

  if (html.includes('property="og:image"')) {
    pagesWithOgImage++;
  }

  if (html.includes('application/ld+json')) {
    pagesWithJsonLd++;
    try {
      const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
      if (match) JSON.parse(match[1]);
    } catch (e) {
      errors.push(`Invalid JSON-LD in ${relPath}: ${e.message}`);
    }
  }

  // Links
  const linkMatches = html.matchAll(/href="(\/[^"#?]*)[#?]?/g);
  for (const m of linkMatches) {
    if (m[1].startsWith('//') || m[1].startsWith('/_astro')) continue;
    linkChecks.push({ from: relPath, to: m[1] });
  }

  // Images
  const imgMatches = html.matchAll(/src="(\/images\/[^"]+)"/g);
  for (const m of imgMatches) {
    imgChecks.push({ from: relPath, src: m[1] });
  }
}

// Deduplicate links to check
const uniqueLinks = [...new Set(linkChecks.map((l) => l.to))];
let brokenLinks = 0;
for (const link of uniqueLinks) {
  let target = link.replace(/\/$/, '');
  let f1 = path.join(distDir, target, 'index.html');
  let f2 = path.join(distDir, target + '.html');
  let f3 = path.join(distDir, target);
  if (!fs.existsSync(f1) && !fs.existsSync(f2) && !fs.existsSync(f3)) {
    brokenLinks++;
    errors.push(`Broken link target: "${link}"`);
  }
}

// Deduplicate images
const uniqueImages = [...new Set(imgChecks.map((i) => i.src))];
let brokenImages = 0;
for (const img of uniqueImages) {
  let decoded = decodeURIComponent(img);
  let f = path.join(distDir, decoded);
  if (!fs.existsSync(f)) {
    brokenImages++;
    errors.push(`Missing image asset: "${img}"`);
  }
}

const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const sitemap0 = path.join(distDir, 'sitemap-0.xml');
const robotsTxt = path.join(distDir, 'robots.txt');
const adminConfig = path.join(distDir, 'admin', 'config.yml');
const adminIndex = path.join(distDir, 'admin', 'index.html');

console.log('--------------------------------------------------');
console.log('✅ GfD BW Production Build & Health Test Suite');
console.log('--------------------------------------------------');
console.log(`HTML Pages Tested:          ${checkedPages}`);
console.log(`Pages with Canonical:       ${pagesWithCanonical} / ${checkedPages}`);
console.log(`Pages with OG Social Image: ${pagesWithOgImage} / ${checkedPages}`);
console.log(`Pages with Schema.org JSON: ${pagesWithJsonLd} / ${checkedPages}`);
console.log(`Unique Internal Links:      ${uniqueLinks.length} (Broken: ${brokenLinks})`);
console.log(`Unique Images Tested:       ${uniqueImages.length} (Broken: ${brokenImages})`);
console.log(`Sitemap Index generated:    ${fs.existsSync(sitemapIndex) ? 'PASS' : 'FAIL'}`);
console.log(`Sitemap-0 generated:        ${fs.existsSync(sitemap0) ? 'PASS' : 'FAIL'}`);
console.log(`robots.txt configured:      ${fs.existsSync(robotsTxt) ? 'PASS' : 'FAIL'}`);
console.log(`Admin Portal ready:         ${fs.existsSync(adminIndex) && fs.existsSync(adminConfig) ? 'PASS' : 'FAIL'}`);
console.log(`Total Errors:               ${errors.length}`);
console.log(`Total Warnings:             ${warnings.length}`);
console.log('--------------------------------------------------');

if (errors.length > 0) {
  console.log('Errors:', errors);
}
