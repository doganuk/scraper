import puppeteer from "puppeteer";

const getSubscriptions = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // wait until the dom content is loaded
  await page.goto("https://wltest.dns-systems.net/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const subscriptions = await page.evaluate(() => {

    // Get all package features and header related with packages
    const packageList = document.querySelectorAll(".package-features");
    const packageHeaderList = Array.from(document.querySelectorAll(".header.dark-bg"));
   
    // Convert the packageListList to an iterable array
    // For each quote fetch the text and author
    return Array.from(packageList).map((quote, index) => {
      // Fetch the sub-elements from the previously fetched package
      // Get the details and return it (`.innerText`)
      const packageName = quote.querySelector(`.package-name`).innerText;
      const packageDescription = quote.querySelector(".package-description").innerText;
      const packagePrice = quote.querySelector(".package-price").innerText;
      const packageData = quote.querySelector(".package-data").innerText;
      const packageHeader = packageHeaderList[index].innerText;
      return {packageHeader,packageName, packageDescription, packagePrice, packageData };
    });
  });

  // Display the subscription list
  console.log(subscriptions);

  // Close the browser
  await browser.close();
};

// Start the scraping
getSubscriptions();