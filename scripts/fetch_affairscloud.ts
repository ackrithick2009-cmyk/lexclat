import * as cheerio from 'cheerio';
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

const CATEGORIES = [
    "NATIONAL AFFAIRS",
    "INTERNATIONAL AFFAIRS",
    "BANKING & FINANCE",
    "BANKING & ECONOMY",
    "SCIENCE & TECHNOLOGY",
    "SPORTS",
    "AWARDS & RECOGNITIONS",
    "AWARDS & HONOURS",
    "APPOINTMENTS & RESIGNATIONS",
    "DEFENCE",
    "ENVIRONMENT",
    "IMPORTANT DAYS",
    "STATE NEWS",
    "OBITUARY",
    "BANKING & FINANCE"
];

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'currentAffairs.json');

async function fetchAffairsCloud(dateStr: string): Promise<AffairItem[]> {
    const url = `https://affairscloud.com/current-affairs-${dateStr}/`;
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.status}`);
            return [];
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const items: AffairItem[] = [];

        let currentCategory = "General";
        
        // Target the main content area
        $('.entry-content').find('*').each((i, el) => {
            const tagName = el.tagName.toLowerCase();
            const text = $(el).text().trim();
            
            if (!text) return;

            // Check if this element is a category header
            if (CATEGORIES.includes(text.toUpperCase())) {
                currentCategory = text.toUpperCase();
                return;
            }

            // Heuristic for headlines: Starts with a bold element or is the start of a paragraph with significant length
            if ((tagName === 'p' || tagName === 'h3') && text.length > 30) {
                if (text.includes("Click here for") || text.includes("Aspirant:") || text.includes("Read More")) return;
                
                // Avoid capturing the same text multiple times (since we use .find('*'))
                if (items.some(item => item.headline === text || text.includes(item.headline))) return;

                let headline = "";
                let summary = "";
                
                // Try to split into headline and summary
                const splitters = [" In May 2026", " On May", " - ", " : ", ". "];
                let splitFound = false;
                
                for (const splitter of splitters) {
                    const idx = text.indexOf(splitter);
                    if (idx > 0 && idx < 200) {
                        headline = text.substring(0, idx).trim();
                        summary = text.substring(idx).trim();
                        splitFound = true;
                        break;
                    }
                }

                if (!splitFound) {
                    headline = text.substring(0, 100).trim();
                    summary = text.trim();
                }

                if (headline.length > 10) {
                    items.push({
                        date: dateStr,
                        category: currentCategory,
                        headline: headline,
                        summary: summary,
                        sourceUrl: url,
                        timestamp: Date.now()
                    });
                }
            }
        });

        return items;
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
        return [];
    }
}

async function saveToJSON(items: AffairItem[]) {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    
    let existingData: AffairItem[] = [];
    try {
        const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
        existingData = JSON.parse(fileContent);
    } catch (e) {}

    const existingHeadlines = new Set(existingData.map(item => item.headline.toLowerCase()));
    let newCount = 0;
    
    for (const item of items) {
        if (!existingHeadlines.has(item.headline.toLowerCase())) {
            existingData.push(item);
            newCount++;
        }
    }

    // Sort by timestamp descending
    existingData.sort((a, b) => b.timestamp - a.timestamp);

    await fs.writeFile(DATA_FILE, JSON.stringify(existingData, null, 2));
    console.log(`Saved ${newCount} new items. Total: ${existingData.length}`);
}

async function run() {
    let dateStr = process.argv[2];
    if (!dateStr) {
        const today = new Date();
        const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        dateStr = `${today.getDate()}-${monthNames[today.getMonth()]}-${today.getFullYear()}`;
    }
    const items = await fetchAffairsCloud(dateStr);
    if (items.length > 0) {
        await saveToJSON(items);
    } else {
        console.log("No items found.");
    }
}

run().then(() => process.exit(0));
