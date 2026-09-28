const fs = require('fs');

const files = [
    'src/index.html',
    'src/index-en.html',
    'src/projets.html',
    'src/projects-en.html'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace all instances of CV_Mateo_FR.pdf with CV_Matéo_Alves_JV.pdf
    let newContent = content.replace(/CV_Mateo_FR\.pdf/g, 'CV_Matéo_Alves_JV.pdf');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
