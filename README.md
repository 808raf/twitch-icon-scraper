# Twitch Icon Scraper

This is a simple tool for scraping Twitch profile information, including profile icons, using Puppeteer.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Sample JSON Output](#sample-json-output)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Twitch Icon Scraper is a Node.js application built with Puppeteer, a headless browser automation tool. It allows you to scrape Twitch profile information, including profile icons, for a list of Twitch usernames provided as input.

## Features

- Scrapes Twitch profile icons in two formats (70x70) and (300x300).
- Allows scraping for multiple Twitch usernames in one go.
- Customizable to scrape additional information as needed.
- Outputs results to twitch_results.json
- 05/10/2024 - Added follower count scraping

## Installation

To use Twitch Icon Scraper, you need to have Node.js and npm (Node Package Manager) installed on your system. If you haven't installed them yet, you can download and install them from [the official Node.js website](https://nodejs.org/).

Once you have Node.js and npm installed, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/808raf/twitch-icon-scraper.git
   ```

2. Navigate to the project directory:

   ```bash
   cd twitch-icon-scraper
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To use Twitch Icon Scraper, follow these steps:

1. Open the `twitchUsernames.js` file in the `src` directory.

2. Edit the `twitchUsernames` array with the list of Twitch usernames you want to scrape:

   ```javascript
   const twitchUsernames = ["username1", "username2", "username3"];
   ```

3. Save the changes to the `twitchUsernames.js` file.

4. Run the application using Node.js:

   ```bash
   node index.js
   ```

5. The application will scrape the Twitch profile information for each username and save the results to a JSON file named `twitch_results.json`.

6. You can find the scraped data in the `twitch_results.json` file in the project directory.

## Sample JSON Output

Here's an example of what the `twitch_results.json` file might contain:

```json
[
  {
    "username": "username1",
    "twitchUsername": "Username 1",
    "imageSrc70x70": "https://example.com/username1_70x70.png",
    "imageSrc300x300": "https://example.com/username1_300x300.png"
    "followers": "1.3m followers"
  },
  {
    "username": "username2",
    "error": "Failed to find element matching selector 'h1.tw-title'"
  },
  {
    "username": "username3",
    "twitchUsername": "Username 3",
    "imageSrc70x70": "https://example.com/username3_70x70.png",
    "imageSrc300x300": "https://example.com/username3_300x300.png"
    "followers": "100k followers"
  }
]
```

Each object in the JSON array represents the scraped data for a Twitch username. If scraping was successful, it includes the `twitchUsername`, `imageSrc70x70`, `imageSrc300x300` and `followers` fields. If an error occurred during scraping, it includes an `error` field with the error message.

## Contributing

Contributions to Twitch Icon Scraper are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Make sure to follow the [code of conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
