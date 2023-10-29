// IMPORTS

import Puppeteer from "puppeteer-extra"
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import { amazon_index } from "./algolia";
import { minimal_args } from "./puppeteer";

// VARIABLES

export const categories = [
  {
    "name": "Clothing, Shoes & Jewelry",
    "url": "https://www.amazon.com/s?i=fashion&bbn=1015897601"
  },
  {
    "name": "Home & Kitchen",
    "url": "https://www.amazon.com/s?i=garden&bbn=1015897601"
  },
  {
    "name": "Electronics",
    "url": "https://www.amazon.com/s?i=electronics&bbn=1015897601"
  },
  {
    "name": "Tools & Home Improvement",
    "url": "https://www.amazon.com/s?i=tools&bbn=1015897601"
  },
  {
    "name": "Sports & Outdoors",
    "url": "https://www.amazon.com/s?i=sporting&bbn=1015897601"
  },
  {
    "name": "Toys & Games",
    "url": "https://www.amazon.com/s?i=toys-and-games&bbn=1015897601"
  },
  {
    "name": "Garden & Outdoor",
    "url": "https://www.amazon.com/s?i=lawngarden&bbn=1015897601"
  },
  {
    "name": "Automotive Parts & Accessories",
    "url": "https://www.amazon.com/s?i=automotive&bbn=1015897601"
  },
  {
    "name": "Office Products",
    "url": "https://www.amazon.com/s?i=office-products&bbn=1015897601"
  },
  {
    "name": "Cell Phones & Accessories",
    "url": "https://www.amazon.com/s?i=mobile&bbn=1015897601"
  },
  {
    "name": "Health, Household & Baby Care",
    "url": "https://www.amazon.com/s?i=hpc&bbn=1015897601"
  },
  {
    "name": "Appliances",
    "url": "https://www.amazon.com/s?i=appliances&bbn=1015897601"
  },
  {
    "name": "Video Games",
    "url": "https://www.amazon.com/s?i=videogames&bbn=1015897601"
  },
  {
    "name": "Baby",
    "url": "https://www.amazon.com/s?i=baby-products&bbn=1015897601"
  },
  {
    "name": "Pet Supplies",
    "url": "https://www.amazon.com/s?i=pets&bbn=1015897601"
  },
  {
    "name": "Arts, Crafts & Sewing",
    "url": "https://www.amazon.com/s?i=arts-crafts&bbn=1015897601"
  },
  {
    "name": "Movies & TV",
    "url": "https://www.amazon.com/s?i=dvd&bbn=1015897601"
  },
  {
    "name": "Musical Instruments",
    "url": "https://www.amazon.com/s?i=mi&bbn=1015897601"
  },
  {
    "name": "Beauty & Personal Care",
    "url": "https://www.amazon.com/s?i=beauty&bbn=1015897601"
  },
  {
    "name": "Home & Business Services",
    "url": "https://www.amazon.com/s?i=local-services&bbn=1015897601"
  },
]

export type Category = {
  name: string;
  url: string;
}

export type Product = {
  title: string;
  image: string;
  link: string;
  price: string;
  id: string;
  category: string;
  retail_price: Number;
  updated_at: string;
  offers: Offer[];
}

export type Offer = {
  condition: string;
  description: string;
  ships_from: string;
  sold_by: string;
  offer_price: any;
  savings: any;
  savings_percent: any;
}

// PUPPETEER CODE

async function scrapeAmazon() {
  Puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  Puppeteer.use(StealthPlugin());

  const browser = await Puppeteer.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: minimal_args
  });

  for (const category of categories) {
    // creating a page boilerplate
    const page = await browser.newPage();
    /* page.on('request', (request) => {
      if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
        request.respond({ status: 200, body: 'aborted' })
      } else {
        request.continue();
      }
    }); */
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto(category.url, {
      waitUntil: "load",
      timeout: 0,
    });

    await page.waitForSelector(".s-main-slot");

    const pages = await page.evaluate(async () => {
      const pagination = Array.from(document.querySelectorAll('.s-pagination-item'));
      const last_page = (pagination[pagination.length - 2] as any).innerText;
      return Number(last_page);
    });

    let pages_counter = pages - 1 // @dev 0;

    while (pages_counter < pages) {
      pages_counter++;
      console.log(`[AMAZON - ${category.name}]: scraping page ${pages_counter}/${pages}...`);

      // [1] parse products
      await page.waitForSelector(".s-main-slot");
      const temp_products = await page.evaluate(async () => {
        const dom = Array.from(document.querySelectorAll('.s-main-slot .s-result-item:not(.AdHolder)'));
        const products: any = [];
        for (const product of dom) {
          let title = product.querySelector('h2')?.innerText;
          let image = product.querySelector('img')?.src;
          let link = product.querySelector('div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-mini > div > span:nth-child(5) > a')?.href;
          let price = Number(product.querySelector('div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-mini > div:nth-child(1) > span.a-color-base')?.innerText.replace('$', ''));
          let asin = product.getAttribute('data-asin');

          // check if link is valid
          await fetch(link).then((res) => {
            if (res.status === 404) {
              console.log('[AMAZON]: invalid product link', link);
              link = null;
            };
          });

          if (title && image && link && price && asin) products.push({ title, image, link, price, objectId: asin });
        }
        return products;
      })

      const products_with_category = temp_products.map((p) => ({ ...p, category: category.name }));
      await amazon_index.saveObjects(products_with_category, { autoGenerateObjectIDIfNotExist: true });

      // [4] go to next page
      await page.waitForSelector(".s-main-slot");
      const next_page = await page.evaluate(async () => {
        const next_page = document.querySelector('.s-pagination-next')?.href;
        return next_page;
      });
      await page.goto(next_page, {
        waitUntil: "load",
        timeout: 0,
      });
    }

    await page.close();

  }

}

export default scrapeAmazon;