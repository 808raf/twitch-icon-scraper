import puppeteer from "puppeteer";
import getTwitchUsername from "./getTwitchUsername.js";
import usernames from "./twitchUsernames.js";
import fs from "fs";

(async () => {
  // Array of Twitch usernames
  const twitchUsernames = usernames;

  // Array to store results
  const results = [];

  // Launch the browser
  const browser = await puppeteer.launch();

  for (const username of twitchUsernames) {
    // Create an object to store the result for the current username
    const result = { username };

    try {
      // Open a new page for each username
      const page = await browser.newPage();

      // Construct the Twitch URL for the current username
      const twitchUrl = `https://www.twitch.tv/${username}`;

      // Navigate the page to the Twitch URL
      await page.goto(twitchUrl);

      // Wait for the Twitch username to load
      result.twitchUsername = await getTwitchUsername(page);

      // Extract the image source and alt attribute for 70x70
      result.imageSrc70x70 = await page.$eval(
        `img[alt=${result.twitchUsername}]`,
        (img) => img.getAttribute("src")
      );

      // Construct the image source for 300x300
      result.imageSrc300x300 = result.imageSrc70x70.replace(
        "-70x70",
        "-300x300"
      );

      // Close the current page
      await page.close();
    } catch (error) {
      console.error(`Error scraping Twitch username "${username}".`);
      // Store the error message in the result object
      result.error = `Error scraping Twitch username: ${username}.`;
    }

    // Push the result object to the results array
    results.push(result);
  }

  // Close the browser
  await browser.close();

  // Write results to JSON file
  fs.writeFileSync("twitch_results.json", JSON.stringify(results, null, 2));
  console.log("Results written to twitch_results.json file.");
})();
