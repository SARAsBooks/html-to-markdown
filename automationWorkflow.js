const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');
const fs = require('fs').promises;

async function fetchURLContent(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error(`Error fetching URL content: ${error}`);
  }
}

function extractReadableContent(html, url) {
  try {
    const dom = new JSDOM(html, { url: url });
    const article = new Readability(dom.window.document).parse();
    return article;
  } catch (error) {
    console.error(`Error extracting readable content: ${error}`);
  }
}

function convertToMarkdown(html) {
  try {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);
    return markdown;
  } catch (error) {
    console.error(`Error converting HTML to Markdown: ${error}`);
  }
}

async function saveAsMarkdownFile(filename, content) {
  await fs.writeFile(filename, content, 'utf-8');
}

async function runWorkflow(url) {
  const html = await fetchURLContent(url);
  const article = extractReadableContent(html, url);
  if (article) {
    const markdown = convertToMarkdown(
      article.content.replaceAll('<br></em>', '</em><br>')
      );
    const content = `# ${article.title}\n\n${markdown}\n\n[Source](${url})`;
    const filename = `${article.title}.md`;
    await saveAsMarkdownFile(filename, content);
    console.log(article.siteName);
  } else {
    console.error('Unable to extract readable content from the URL');
  }
}

const url = 'https://www.poetryfoundation.org/poetrymagazine/poems/155480/one-of-us';
runWorkflow(url);
