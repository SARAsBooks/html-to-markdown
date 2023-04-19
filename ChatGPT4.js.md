In this document, we will outline an automation workflow in Node.js using the `node-fetch`, `mozilla-readability`, `jsdom`, and `showdown` libraries. The workflow will consist of the following steps:

1. Fetch the content of a given URL
2. Extract the main readable content using Mozilla's Readability library
3. Convert the extracted content to Markdown using ShowdownJS

First, ensure you have Node.js installed and the required packages installed using npm:

```
npm install node-fetch mozilla-readability jsdom showdown
```

Now, let's create a script called automationWorkflow.js and follow these steps:
    
1. Import the required libraries:
    ```
    const fetch = require('node-fetch');
    const { Readability } = require('mozilla-readability');
    const { JSDOM } = require('jsdom');
    const Showdown = require('showdown');
    ```
    
2. Create a function to fetch the content of a given URL:
    ```
    async function fetchURLContent(url) {
      try {
        const response = await fetch(url);
        const html = await response.text();
        return html;
      } catch (error) {
        console.error(`Error fetching URL content: ${error}`);
      }
    }
    ```
    
3. Create a function to extract the main readable content using Mozilla's Readability library:
    ```
    function extractReadableContent(html) {
      try {
        const dom = new JSDOM(html);
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        return article;
      } catch (error) {
        console.error(`Error extracting readable content: ${error}`);
      }
    }
    ```
    
4. Create a function to convert the extracted content to Markdown using ShowdownJS:
    ```
    function convertToMarkdown(html) {
      try {
        const converter = new Showdown.Converter();
        const markdown = converter.makeMarkdown(html);
        return markdown;
      } catch (error) {
        console.error(`Error converting HTML to Markdown: ${error}`);
      }
    }
    ```
    
5. Create an async function to execute the entire workflow:
    ```
    async function runWorkflow(url) {
      const html = await fetchURLContent(url);
      const article = extractReadableContent(html);
      if (article) {
        const markdown = convertToMarkdown(article.content);
        console.log(markdown);
      } else {
        console.error('Unable to extract readable content from the URL');
      }
    }
    ```
    
6. Execute the workflow with a sample URL:
    ```
    const url = 'https://example.com/article';
    runWorkflow(url);
    ```

Save the script and run it using the following command:
```
node automationWorkflow.js
```
    
This will output the main readable content of the provided URL in Markdown format. You can modify the script as needed to further customize the automation workflow.