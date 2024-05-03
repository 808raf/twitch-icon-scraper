const getTwitchUsername = async (page) => {
  // Extract the h1 with class="tw-title"
  const twitchTitle = await page.$eval("h1.tw-title", (h1) => h1.textContent);

  return twitchTitle;
};

export default getTwitchUsername;
