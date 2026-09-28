const fs = require('fs');
const path = require('path');

const baseDirs = ['src/projets', 'src/projects'];
const cvButtonFR = `
                <a href="/src/CV_Matéo_Alves_JV.pdf" download="CV_Matéo_Alves_JV.pdf" target="_blank"
                    class="hidden items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50/80 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-[#7458C6] hover:border-[#7458C6]/30 sm:inline-flex">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" class="size-3.5 text-[#7458C6]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Mon CV
                </a>
`;
const cvButtonEN = cvButtonFR.replace('Mon CV', 'My Resume');

baseDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const isFR = dir === 'src/projets';
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Look for the "Me contacter" or "Contact me" button in the header
        const contactMatch = content.match(/<a[^>]*href="\/src\/index(-en)?\.html#contact"[^>]*>[\s\S]*?<\/a>/);
        if (contactMatch) {
            // Check if CV button is already added
            if (!content.includes('Mon CV') && !content.includes('My Resume')) {
                const cvBtn = isFR ? cvButtonFR : cvButtonEN;
                content = content.replace(contactMatch[0], cvBtn + '\n                ' + contactMatch[0]);
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`Added CV button to ${filePath}`);
            }
        }
    });
});
