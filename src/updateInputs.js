const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');

function processDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Simple regex to match onChangeText={setStateFunction}
            const regex = /onChangeText=\{([a-zA-Z0-9_]+)\}/g;
            if (regex.test(content) && content.includes('import ') && !content.includes('sanitizeInput')) {
                // Determine depth relative to screens dir
                const relativePath = path.relative(screensDir, fullPath);
                const depth = relativePath.split(path.sep).length;

                const importPrefix = depth === 1 ? '../' : '../../';
                const importPath = importPrefix + 'utils/sanitize';

                // Add import on top
                content = content.replace(/(import React.*?)\n/, `$1\nimport { sanitizeInput } from '${importPath}';\n`);

                // Replace onChangeText={setFunc} with onChangeText={(t) => setFunc(sanitizeInput(t))}
                content = content.replace(regex, 'onChangeText={(t) => $1(sanitizeInput(t))}');

                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

processDir(screensDir);
