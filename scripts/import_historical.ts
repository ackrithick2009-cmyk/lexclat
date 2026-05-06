import * as fs from 'fs/promises';
import * as path from 'path';

interface AffairItem {
    date: string;
    category: string;
    headline: string;
    summary: string;
    sourceUrl: string;
    timestamp: number;
}

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'currentAffairs.json');

function inferCategory(headline: string, summary: string): string {
    const text = (headline + " " + summary).toUpperCase();
    if (text.includes("RBI") || text.includes("BANK") || text.includes("ECONOMY") || text.includes("GDP") || text.includes("LOAN")) return "BANKING & ECONOMY";
    if (text.includes("NASA") || text.includes("ISRO") || text.includes("SATELLITE") || text.includes("SCIENTIST") || text.includes("VIRUS")) return "SCIENCE & TECHNOLOGY";
    if (text.includes("NAVY") || text.includes("ARMY") || text.includes("MILITARY") || text.includes("DEFENCE") || text.includes("MISSILE")) return "DEFENCE";
    if (text.includes("SPORTS") || text.includes("CUP") || text.includes("MATCH") || text.includes("CRICKET") || text.includes("OLYMPIC")) return "SPORTS";
    if (text.includes("AWARD") || text.includes("PRIZE") || text.includes("WINNER") || text.includes("HONOUR")) return "AWARDS & HONOURS";
    if (text.includes("APPOINT") || text.includes("RESIGN") || text.includes("CHAIRMAN") || text.includes("DIRECTOR")) return "APPOINTMENTS & RESIGNATIONS";
    if (text.includes("CLIMATE") || text.includes("POLLUTION") || text.includes("ENVIRONMENT") || text.includes("VOLCANO")) return "ENVIRONMENT";
    if (text.includes("INTERNATIONAL") || text.includes("GLOBAL") || text.includes("SUMMIT") || text.includes("UN ")) return "INTERNATIONAL AFFAIRS";
    return "NATIONAL AFFAIRS";
}

async function parseMarkdown(filePath: string) {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const items: AffairItem[] = [];
    let currentItem: any = null;
    for (const line of lines) {
        if (line.startsWith('### ')) {
            if (currentItem) items.push(currentItem);
            const match = line.match(/### (.*?) - (.*)/);
            if (match) {
                const dateStrRaw = match[1].trim(); 
                const headline = match[2].trim();
                if (headline.includes("Daily Current Affairs Quiz")) {
                    currentItem = null;
                    continue;
                }
                const dateParts = dateStrRaw.replace(',', '').split(' ');
                if (dateParts.length >= 3) {
                    const dateStrNormalized = `${dateParts[1]}-${dateParts[0].toLowerCase()}-${dateParts[2]}`;
                    currentItem = {
                        date: dateStrNormalized,
                        headline: headline,
                        summary: '',
                        sourceUrl: 'Historical Data',
                        timestamp: Date.now()
                    };
                }
            }
        } else if (currentItem && line.trim()) {
            currentItem.summary += (currentItem.summary ? '\n' : '') + line.trim();
        }
    }
    if (currentItem) items.push(currentItem);
    return items;
}

async function run() {
    const dirPath = path.join(process.cwd(), 'wiki', 'current_affairs');
    const files = await fs.readdir(dirPath);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    let allItems: AffairItem[] = [];
    for (const file of mdFiles) {
        console.log(`Processing ${file}...`);
        const items = await parseMarkdown(path.join(dirPath, file));
        for (const item of items) {
            item.category = inferCategory(item.headline, item.summary);
            allItems.push(item);
        }
    }

    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    
    // Sort by date (mock timestamp for historical)
    // We can parse the date string to get a real timestamp
    const getTs = (d: string) => {
        const [day, month, year] = d.split('-');
        return new Date(`${month} ${day}, ${year}`).getTime();
    };

    allItems.sort((a, b) => getTs(b.date) - getTs(a.date));

    await fs.writeFile(DATA_FILE, JSON.stringify(allItems, null, 2));
    console.log(`Imported ${allItems.length} items to ${DATA_FILE}.`);
}

run().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
