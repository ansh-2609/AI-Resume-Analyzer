// server/scrapers/linkedinScraper.js
const puppeteer = require('puppeteer');
const db = require('../config/db');

async function scrapeLinkedInJobs(keywords = 'software engineer', location = 'remote') {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Navigate to LinkedIn jobs
        const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Scroll to load more jobs
        await autoScroll(page);
        
        // Extract job listings
        const jobs = await page.evaluate(() => {
            const jobElements = document.querySelectorAll('.job-card-container');
            const jobList = [];
            
            jobElements.forEach(job => {
                const title = job.querySelector('.job-card-list__title')?.innerText || '';
                const company = job.querySelector('.job-card-container__company-name')?.innerText || '';
                const location = job.querySelector('.job-card-container__metadata-item')?.innerText || '';
                const link = job.querySelector('.job-card-list__title')?.href || '';
                
                if (title) {
                    jobList.push({
                        title,
                        company,
                        location,
                        link,
                        source: 'linkedin'
                    });
                }
            });
            
            return jobList;
        });
        
        // Save to database
        for (const job of jobs) {
            await db.execute(
                `INSERT INTO jobs (job_title, company, location, job_url, source)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
                [job.title, job.company, job.location, job.link, job.source]
            );
        }
        
        console.log(`Scraped ${jobs.length} jobs from LinkedIn`);
        return jobs;
        
    } finally {
        await browser.close();
    }
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = { scrapeLinkedInJobs };
