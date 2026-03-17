# 🌀 Fidget Factory Web

A fun, colourful market-day e-commerce landing page for **Fidget Factory** – selling fidget toys at Selwyn College, Auckland.

## 🚀 Running the site

This is a plain HTML/CSS site – no build step required.

1. Open `index.html` directly in a browser, **or**
2. Serve it with any static file server:
   ```bash
   # Python
   python3 -m http.server 8080

   # Node (npx)
   npx serve .
   ```

---

## ✏️ Editing products / prices for market day

All products live inside `index.html` as `<article class="product-card">` elements.

### Change a product name or description
Find the relevant `<article>` block and edit the `<h3>` (name) or `<p class="product-card__desc">` (description):

```html
<h3 class="product-card__name">Spiral Fidget</h3>
<p class="product-card__desc">Smooth-spin spiral that keeps your hands busy.</p>
```

### Change a price
Each price uses this pattern – edit the number between the tags:

```html
<p class="product-card__price">
  <span class="price-currency">NZ$</span>5<span class="price-cents">.00</span>
</p>
```

### Add a badge (e.g. "Limited", "New", "Best Seller")
Paste one of these lines inside the `<article>` block, **before** the `product-card__icon` div:

```html
<div class="product-card__badge badge--bestseller">Best Seller ⭐</div>
<div class="product-card__badge badge--new">New 🆕</div>
<div class="product-card__badge badge--popular">Popular 🔥</div>
<div class="product-card__badge badge--limited">Limited 🎯</div>
```

### Add a new product
Copy any existing `<article class="product-card">` block and paste it inside `<div class="product-grid">`. Fill in the new name, description, icon emoji, and price.

### Remove a product
Delete the whole `<article class="product-card">` block for that product.

---

## 🎁 Editing Market Day Specials

Specials are inside `<section class="specials">`. Edit the text, price, and save text in each `<div class="special-card">` block.

---

## 🎨 Changing the colour palette

Colours are CSS custom properties in `style.css` under `:root`:

```css
:root {
  --ff-purple:  #7c3aed;
  --ff-pink:    #ec4899;
  --ff-yellow:  #facc15;
  --ff-teal:    #14b8a6;
  --ff-coral:   #f97316;
  /* … */
}
```

Change any value and it will cascade throughout the whole site.
