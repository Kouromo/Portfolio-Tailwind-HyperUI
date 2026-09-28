const fs = require('fs');
const path = require('path');

// 1. Delete CV_Matéo_Alves_JV.pdf
const cvToDelete = 'src/CV_Matéo_Alves_JV.pdf';
if (fs.existsSync(cvToDelete)) {
    fs.unlinkSync(cvToDelete);
    console.log('Deleted', cvToDelete);
}

// 2. Update FR files
const frFiles = ['src/index.html', 'src/projets.html'];
const frDir = 'src/projets';
if (fs.existsSync(frDir)) {
    frFiles.push(...fs.readdirSync(frDir).filter(f => f.endsWith('.html')).map(f => path.join(frDir, f)));
}

frFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    let newContent = content.replace(/CV_Matéo_Alves_JV\.pdf/g, 'CV_Mateo_FR.pdf');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Updated FR CV link in ${file}`);
    }
});

// 3. Update EN files
const enFiles = ['src/index-en.html', 'src/projects-en.html'];
const enDir = 'src/projects';
if (fs.existsSync(enDir)) {
    enFiles.push(...fs.readdirSync(enDir).filter(f => f.endsWith('.html')).map(f => path.join(enDir, f)));
}

enFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    // It might be CV_Matéo_Alves_JV.pdf or CV_Mateo_FR.pdf in the English files due to my previous script
    let newContent = content.replace(/CV_Matéo_Alves_JV\.pdf/g, 'CV_Mateo_EN.pdf');
    newContent = newContent.replace(/CV_Mateo_FR\.pdf/g, 'CV_Mateo_EN.pdf');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Updated EN CV link in ${file}`);
    }
});
