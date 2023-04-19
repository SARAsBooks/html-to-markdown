# html-to-markdown

an automation workflow in Node.js using the `mozilla-readability`, `jsdom`, and `turndown` libraries. The workflow will consist of the following steps:

1. Fetch the content of a given URL
2. Extract the main readable content using Mozilla's Readability library
3. Convert the extracted content to Markdown using Turndown
