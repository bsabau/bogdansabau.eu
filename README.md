# bogdansabau.eu

Personal site — a single-page web presence for an independent senior data engineer.

## Stack

Plain static HTML/CSS/JS — no build step, no dependencies. The contact form
posts to [Formspree](https://formspree.io) via `fetch`.

## Structure

```
index.html          markup, meta tags, JSON-LD
css/style.css       styles
js/main.js          contact sheet + form handling
assets/og-image.png social share image
robots.txt          crawl directives
sitemap.xml         sitemap
```

## Develop

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
```

## Deploy

Hosted on OVHcloud web hosting. Upload `index.html` and the `css/` and `js/`
folders to the web root (`www/`), keeping the structure intact.
