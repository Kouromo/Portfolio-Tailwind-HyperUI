const fs = require('fs');

let cssPath = 'src/input.css';
let content = fs.readFileSync(cssPath, 'utf-8');

// Replace everything from the 2K media query to the end
let newContent = content.replace(/\/\* Optimisations d'affichage pour Ǹcrans 2K[\s\S]*$/, 
`/* Optimisations d'affichage pour écrans 2K (1440p / QHD) et grands moniteurs */
@media (min-width: 1536px) {
  /* En augmentant légèrement la taille de base (18px au lieu de 16px), 
     les textes sont plus lisibles sur 2K, et toutes les marges / tailles de conteneur 
     en "rem" de Tailwind s'agrandissent proportionnellement sans étouffer les bords. */
  html {
    font-size: 18px;
  }
}
`);

// Try replacing with normal French string in case it wasn't garbled in the file
newContent = newContent.replace(/\/\* Optimisations d'affichage pour écrans 2K[\s\S]*$/, 
`/* Optimisations d'affichage pour écrans 2K (1440p / QHD) et grands moniteurs */
@media (min-width: 1536px) {
  /* En augmentant légèrement la taille de base (18px au lieu de 16px), 
     les textes sont plus lisibles sur 2K, et toutes les marges / tailles de conteneur 
     en "rem" de Tailwind s'agrandissent proportionnellement sans étouffer les bords. */
  html {
    font-size: 18px;
  }
}
`);

fs.writeFileSync(cssPath, newContent, 'utf-8');
console.log('Updated CSS');
