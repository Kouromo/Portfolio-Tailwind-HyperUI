const fs = require('fs');
const path = require('path');

const baseDirs = ['src/projets', 'src/projects'];

baseDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Regex to match the modal and script
        // The modal typically starts with <!-- Modal Lightbox... --> and ends before <script>
        
        let newContent = content.replace(/<!-- Modal Lightbox[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
        newContent = newContent.replace(/<script>[\s\S]*?const lightboxOverlay = document\.getElementById\('lightbox-overlay'\);[\s\S]*?<\/script>/g, '<script src="/src/js/lightbox.js"></script>');
        
        // Also remove the english comment version if present
        newContent = newContent.replace(/<!-- Lightbox Modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

        // Just in case it doesn't match the comment exactly, we can also use:
        newContent = newContent.replace(/<div id="lightbox-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

        // Check if <script src="/src/js/lightbox.js"></script> is already present, if not and we didn't replace, we might need to add it before </body>
        if (!newContent.includes('<script src="/src/js/lightbox.js"></script>')) {
             newContent = newContent.replace('</body>', '    <script src="/src/js/lightbox.js"></script>\n</body>');
        }

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Updated ${filePath}`);
        }
    });
});
