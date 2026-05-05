import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';
import * as path from 'path';

// GK Today Current Affairs base URL
const BASE_URL = 'https://www.gktoday.in/current-affairs/page/';

// Output directory
const OUTPUT_DIR = path.join(process.cwd(), 'wiki', 'current_affairs');

interface CurrentAffair {
    title: string;
    dateStr: string;
    summary: string;
    monthKey: string; // e.g. "2025_06_June"
}

// Utility to pause between requests to prevent IP blocking
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchPage(pageNumber: number): Promise<string> {
    const url = `${BASE_URL}${pageNumber}/`;
    console.log(`Fetching ${url}...`);
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    
    return await response.text();
}

function parseMonthKey(dateText: string): string | null {
    // Expected format something like "June 15, 2025" or "15 June 2025"
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    for (let i = 0; i < months.length; i++) {
        if (dateText.includes(months[i])) {
            const yearMatch = dateText.match(/202[4-6]/);
            const year = yearMatch ? yearMatch[0] : new Date().getFullYear().toString();
            const monthNum = String(i + 1).padStart(2, '0');
            return `${year}_${monthNum}_${months[i]}`;
        }
    }
    return null;
}

function extractItems(html: string): CurrentAffair[] {
    const $ = cheerio.load(html);
    const items: CurrentAffair[] = [];
    
    const posts = $('.home-post-item').toArray();
    
    for (const post of posts) {
        const el = $(post);
        const postData = el.find('.post-data');
        
        const title = postData.find('h3 a').text().trim() || postData.find('h3').text().trim();
        const dateStr = postData.find('.home-post-data-meta').text().trim();
        
        // Clone postData, remove h3 and p tags, and extract the text for summary
        const clone = postData.clone();
        clone.find('h3, p').remove();
        const summary = clone.text().trim();
        
        if (title && summary) {
            const monthKey = parseMonthKey(dateStr) || parseMonthKey(title) || "Unknown_Month";
            items.push({ title, dateStr, summary, monthKey });
        }
    }
    
    return items;
}

async function writeItems(items: CurrentAffair[]) {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Group by monthKey
    const grouped: Record<string, CurrentAffair[]> = {};
    for (const item of items) {
        if (!grouped[item.monthKey]) {
            grouped[item.monthKey] = [];
        }
        grouped[item.monthKey].push(item);
    }
    
    for (const [monthKey, monthItems] of Object.entries(grouped)) {
        const filePath = path.join(OUTPUT_DIR, `${monthKey}.md`);
        let content = '';
        
        try {
            content = await fs.readFile(filePath, 'utf-8');
        } catch (e) {
            content = `# Current Affairs: ${monthKey.replace(/_/g, ' ')}\n\n`;
        }
        
        for (const item of monthItems) {
            // Avoid duplicates
            if (!content.includes(item.title)) {
                content += `### ${item.dateStr || 'Latest'} - ${item.title}\n`;
                content += `${item.summary}\n\n`;
            }
        }
        
        await fs.writeFile(filePath, content);
        console.log(`Updated ${filePath} with ${monthItems.length} items.`);
    }
}

async function run() {
    console.log("Starting GK Today Scraper...");
    let page = 1;
    const maxPages = process.argv.includes('--test') ? 1 : 40; // Fetch up to 40 pages normally (about 400 posts, 1+ year)
    
    let allItems: CurrentAffair[] = [];
    
    while (page <= maxPages) {
        try {
            const html = await fetchPage(page);
            const items = extractItems(html);
            console.log(`Found ${items.length} items on page ${page}`);
            
            if (items.length === 0) {
                console.log("No items found or HTML structure changed. Try refining the Cheerio selectors.");
                break;
            }
            
            allItems = allItems.concat(items);
            page++;
            await delay(1000); // Wait 1 second between requests
        } catch (error) {
            console.error("Error fetching page:", error);
            break;
        }
    }
    
    if (allItems.length > 0) {
        await writeItems(allItems);
        console.log("Scraping completed successfully.");
    } else {
        console.log("No items scraped.");
    }
}

run();
