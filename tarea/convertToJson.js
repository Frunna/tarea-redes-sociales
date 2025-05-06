// convertToJson.js
import fs from "fs";
import path from "path";

// Function to convert an HTML element to a JSON representation
function htmlToJson(element) {
  const obj = {
    tagName: element.tagName.toLowerCase(),
    attributes: {},
    children: [],
  };

  // Extract attributes of the element
  for (let attr of element.attributes) {
    obj.attributes[attr.name] = attr.value;
  }

  // Recursively convert child nodes
  for (let child of element.childNodes) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      obj.children.push(htmlToJson(child)); // Handle nested elements
    } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
      obj.children.push({ text: child.textContent.trim() }); // Handle text nodes
    }
  }

  return obj;
}

// Read all HTML files from the 'htmls' directory and convert them to JSON
const convertHtmlToJson = () => {
  const htmlFiles = fs.readdirSync("htmls").filter(file => file.endsWith(".html"));

  htmlFiles.forEach((file) => {
    const htmlFilePath = path.join("htmls", file);
    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");

    // Parse the HTML content into a DOM
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlContent, "text/html");

    // Assume we're converting the body or any specific element by ID, e.g., 'content'
    const element = doc.body;  // You can change this selector as needed

    // Convert the HTML element to JSON
    const json = htmlToJson(element);

    // Save the resulting JSON to a file
    const jsonFileName = path.join("jsons", file.replace(".html", ".json"));
    fs.writeFileSync(jsonFileName, JSON.stringify(json, null, 2));
    console.log(`Saved JSON for ${file} to ${jsonFileName}`);
  });
};

convertHtmlToJson();
