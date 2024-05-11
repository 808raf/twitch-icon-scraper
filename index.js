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
      await page.setViewport({ width: 1920, height: 1080 });

      // Construct the Twitch URL for the current username
      const twitchUrl = `https://www.twitch.tv/${username}`;

      // Navigate the page to the Twitch URL
      await page.goto(twitchUrl);
      console.log(`Currently Scraping: ${username}`);

      // Wait for the Twitch username to load
      result.twitchUsername = await getTwitchUsername(page);

      // Wait for the image to load
      await page.waitForSelector(`img[alt="${result.twitchUsername}"]`);

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

      try {
        // Navigate to the videos page of the Twitch channel
        await page.goto(`https://www.twitch.tv/${username}/videos`);

        // Wait for the followers count element to appear
        await page.waitForSelector("p.CoreText-sc-1txzju1-0.cwNkcn");

        // Extract the followers count
        const followersCount = await page.$eval(
          "p.CoreText-sc-1txzju1-0.cwNkcn",
          (p) => {
            return p.textContent.trim();
          }
        );
        result.followers = followersCount;
        console.log("Followers count:", followersCount);
      } catch (error) {
        console.error("Failed to scrape followers count:", error);
      }

      // Close the current page
      await page.close();
      console.log(`Finished scraping: ${username}`);
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
