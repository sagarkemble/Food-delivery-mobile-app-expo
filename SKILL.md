---
name: swiggy-ui
description: >
  Design and build Swiggy-style food delivery UI components and screens with pixel-perfect fidelity to Swiggy's design language. Use this skill whenever the user wants to recreate, clone, prototype, or get inspired by Swiggy's UI — including home screens, restaurant listings, menu pages, cart, checkout, order tracking, Instamart, search, filters, or any other Swiggy screen. Also use when building generic food delivery apps that should feel modern, warm, and app-native like Swiggy. Triggers: "Swiggy UI", "food delivery app", "restaurant listing", "order tracking screen", "cart page", "food app design", "Swiggy clone", "Instamart UI".
---

# Swiggy UI Design Skill

A skill for recreating Swiggy's food delivery app UI with high design fidelity — covering visual tokens, component patterns, screen layouts, micro-interactions, and content strategy.

---

## 1. Brand & Visual Identity

### Color Palette

```css
:root {
  /* Primary */
  --swiggy-orange:     #FC8019;   /* Primary CTA, active states, brand accent */
  --swiggy-orange-dark:#E36B00;   /* Pressed/hover state */
  --swiggy-orange-light:#FFF3E8;  /* Tinted backgrounds, tag fills */

  /* Neutrals */
  --bg-primary:        #FFFFFF;
  --bg-secondary:      #F5F5F5;   /* Screen background, card lift */
  --bg-surface:        #FAFAFA;   /* Subtle card, section backgrounds */
  --divider:           #E8E8E8;
  --divider-strong:    #D4D4D4;

  /* Text */
  --text-primary:      #1C1C1C;   /* Headings, restaurant names */
  --text-secondary:    #686B78;   /* Subtitles, meta info */
  --text-tertiary:     #93959F;   /* Placeholders, disabled */
  --text-on-orange:    #FFFFFF;

  /* Semantic */
  --green-veg:         #0F8A65;   /* Veg dot indicator */
  --red-nonveg:        #E43B4F;   /* Non-veg dot indicator */
  --yellow-rating:     #F4B119;   /* Star ratings */
  --blue-offer:        #1BA672;   /* Discount/offer badges (Swiggy uses teal-green) */
  --purple-pro:        #7B61FF;   /* Swiggy One / Pro membership */

  /* Instamart */
  --instamart-teal:    #00B5AD;
  --instamart-bg:      #E6F7F7;
}
```

### Typography

Swiggy uses a rounded, friendly sans-serif system. Approximate with:

```css
/* Primary: Okra (Swiggy's custom font) — substitute with */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

/* Fallback stack */
font-family: 'Okra', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Type Scale:**
| Role              | Size   | Weight | Usage                              |
|-------------------|--------|--------|------------------------------------|
| `--text-xs`       | 10px   | 500    | Labels, badges, fine print         |
| `--text-sm`       | 12px   | 400–600| Meta info, tags, cuisine types     |
| `--text-base`     | 14px   | 400–600| Body, descriptions, item names     |
| `--text-md`       | 16px   | 600–700| Section headers, prices, CTAs      |
| `--text-lg`       | 18px   | 700    | Restaurant names, screen titles    |
| `--text-xl`       | 20–24px| 700–800| Hero text, category page headers   |

### Spacing & Grid

- Base unit: **4px**
- Screen horizontal padding: **16px**
- Card internal padding: **12–16px**
- Section vertical gap: **8–12px**
- Between sections: **24px**
- Bottom nav height: **56px** (+ safe area inset)

### Border Radius

```css
--radius-xs:   4px;   /* Tags, small chips */
--radius-sm:   8px;   /* Input fields, small cards */
--radius-md:   12px;  /* Cards, modals */
--radius-lg:   16px;  /* Banners, bottom sheets */
--radius-full: 999px; /* Pill buttons, badges */
```

### Shadows & Elevation

```css
--shadow-card:   0 2px 8px rgba(0,0,0,0.08);
--shadow-raised: 0 4px 16px rgba(0,0,0,0.12);
--shadow-modal:  0 8px 32px rgba(0,0,0,0.18);
--shadow-bottom-nav: 0 -2px 12px rgba(0,0,0,0.08);
```

---

## 2. Core Components

### 2.1 Top Navigation Bar

- White background, no border — floats over scroll
- Left: Location pill with down-caret
  - Bold location name (~15px, `--text-primary`)
  - Subtitle: delivery time estimate in orange
- Right: Profile avatar or bell icon
- Search bar below nav (or inline): rounded pill, grey background (#F0F0F0), magnifier icon left, mic icon right

```html
<!-- Structure -->
<div class="nav-bar">
  <div class="location-picker">
    <span class="location-label">Home ▾</span>
    <span class="delivery-eta">Delivery in 30 mins</span>
  </div>
  <div class="nav-actions">
    <button class="icon-btn search-btn">🔍</button>
    <button class="icon-btn profile-btn">👤</button>
  </div>
</div>
```

---

### 2.2 Restaurant Card

The most prominent UI element — used in horizontal and vertical scrolling lists.

**Anatomy:**
```
┌────────────────────────────────┐
│  [Hero Image — 16:9 ratio]     │
│  [Offer badge — top left]      │
│  [Promo label — bottom left]   │
├────────────────────────────────┤
│  Restaurant Name (bold, 16px)  │
│  Cuisine · Location            │
│  ⭐ 4.2  •  30–35 mins  •  ₹40  │
└────────────────────────────────┘
```

**Key details:**
- Image: `border-radius: 12px 12px 0 0`, object-fit: cover
- Offer badge: orange pill with white text ("40% OFF up to ₹80")
- Pro/One badge: purple gradient pill on top of image
- Rating: yellow star + number bold, then pipe + ETA + cost for two
- Veg-only icon: small green leaf badge (top-right of image)
- Closed overlay: semi-transparent dark overlay with "Opens at 11 AM"

---

### 2.3 Food Item Card (Menu)

```
┌──────────┬──────────────────────────────┐
│  [Img]   │  Item Name (bold)            │
│  60×60   │  ₹149                        │
│          │  ★ 4.1  •  Must try          │
│          │  Short description (2 lines) │
└──────────┴──────────────────────────────┘
                              [ + ADD ]
```

- Veg/Non-veg indicator: small square icon (green = veg, red = non-veg)
- ADD button: orange border pill, transforms into `−  1  +` counter on tap
- "Bestseller" ribbon: orange text on light orange chip

---

### 2.4 ADD / Quantity Stepper

```css
/* Default state */
.add-btn {
  border: 1.5px solid var(--swiggy-orange);
  color: var(--swiggy-orange);
  background: white;
  border-radius: 999px;
  padding: 6px 20px;
  font-weight: 700;
  font-size: 14px;
}

/* Active (item in cart) */
.qty-stepper {
  background: var(--swiggy-orange);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 999px;
  padding: 6px 12px;
}
```

---

### 2.5 Category / Cuisine Chips

Horizontal scrollable row, no scrollbar:

```css
.chip {
  background: #F5F5F5;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.chip.active {
  background: var(--swiggy-orange-light);
  color: var(--swiggy-orange);
  border: 1px solid var(--swiggy-orange);
}
```

---

### 2.6 Rating Badge

```html
<span class="rating-badge">
  ⭐ 4.2
</span>
```

```css
.rating-badge {
  background: var(--green-veg);  /* or --yellow-rating tint */
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}
```

For 4.0+: green background. For 3.5–3.9: yellow. Below 3.5: red-orange.

---

### 2.7 Bottom Navigation Bar

5 tabs: Home · Search · Offers · Reorder · Cart

```
[🏠 Home] [🔍 Search] [🏷 Offers] [🔁 Reorder] [🛒 Cart (2)]
```

- Active tab: icon + label in `--swiggy-orange`
- Cart tab: orange dot badge with item count
- Height: 56px + iOS safe-area bottom

---

### 2.8 Offer / Discount Banner

Full-width or horizontal scroll carousel:

- Gradient background (orange → red, or brand gradients)
- Bold white offer text
- Small logo or brand illustration right-aligned
- Border radius: 12px
- Auto-scroll every 3.5s with dot indicators

---

### 2.9 Cart Drawer / Bottom Sheet

- Slides up from bottom
- White sheet, 20px top radius
- Sticky header: "Your Order from [Restaurant]"
- Item rows with qty stepper inline
- Divider section: Subtotal, Delivery fee, Taxes, Total
- Sticky bottom CTA: "Place Order — ₹349" full-width orange button

---

### 2.10 Order Tracking Screen

```
┌──────────────────────────────────┐
│  [Map with delivery path]        │
│  Driver pin + Restaurant pin     │
├──────────────────────────────────┤
│  🕐 Arriving in 12 mins          │
│  ─────●───●──────●──────●        │
│  Placed Confirmed Picked  Nearby │
├──────────────────────────────────┤
│  [Driver name + rating + call]   │
│  [OTP: 4821]                     │
└──────────────────────────────────┘
```

Progress bar: 4 steps, filled orange up to current step.

---

## 3. Screen Patterns

### 3.1 Home Screen Layout (top → bottom)

1. **Nav Bar** + location
2. **Search bar** (pill, grey)
3. **"What's on your mind?"** — horizontal icon grid: Biryani, Pizza, Dosa, Burgers, etc. (emoji + label, 4×2 grid)
4. **Top Offers** — horizontal scroll cards
5. **Featured Restaurants** — "Best Rated near you" vertical list
6. **Instamart banner** — teal gradient CTA card
7. **Popular Cuisines** chip row
8. **Restaurant listing** — vertical list with filters (Sort by, Rating, Delivery time, Price range)

---

### 3.2 Restaurant Menu Screen Layout

1. Sticky header: restaurant name + back + search icon
2. Hero image with gradient overlay
3. Restaurant info card: rating, time, cost, cuisine type
4. Horizontal sticky subcategory nav (Starters, Mains, Desserts…)
5. Item sections, each with heading + item cards
6. Floating cart summary bar (sticky bottom): "2 items · ₹349 → VIEW CART"

---

### 3.3 Search Screen

- Full-width search bar at top (auto-focused)
- **Recent searches** section with clock icon
- **Trending** section with fire icon
- **Top cuisines** grid
- Live results: restaurant cards + dish cards mixed
- Filter chips row below search bar (Sort, Rating, Veg, Cost, Distance)

---

### 3.4 Offers Screen

- Hero banner: Full-width gradient card
- Category tabs: Bank Offers · Free Delivery · 50% Off · New
- Offer cards: restaurant logo + offer text + "Apply" button

---

## 4. Micro-interactions & Animations

| Interaction             | Animation                                           |
|-------------------------|-----------------------------------------------------|
| ADD button tap          | Scale pulse (0.95 → 1.05 → 1), orange fill sweep   |
| Card tap                | Ripple + scale to 0.98                              |
| Qty stepper change      | Number slides up/down                               |
| Bottom sheet open       | Spring from bottom, backdrop fade 0→0.5             |
| Screen transition       | Slide left on push, fade on modal                   |
| Rating badge load       | Pop in with scale 0→1, 300ms ease-out              |
| Image load              | Skeleton shimmer → fade in                          |
| Cart total update       | Brief orange flash on total amount                  |
| Order placed            | Lottie confetti burst + checkmark morph             |

---

## 5. Swiggy One / Pro Membership UI

- **Purple gradient** badge: `linear-gradient(135deg, #7B61FF, #A78BFA)`
- Crown / diamond icon
- Appears on: restaurant cards (banner), profile, cart (free delivery callout)
- CTA: "Upgrade to Swiggy One" — purple filled button

---

## 6. Instamart UI Variations

When building Instamart (grocery) screens:

- Primary color: `--instamart-teal` (#00B5AD) replaces orange
- Product cards: square, 1:1 image, smaller text
- Categories: icon grid (Fruits, Snacks, Dairy, Beverages…)
- Delivery timer: prominent "Delivery in 10 mins" with clock animation
- Cart: shows grocery items, not restaurant items

---

## 7. Skeleton / Loading States

All cards should have shimmer loading placeholders:

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F0F0F0 25%,
    #E0E0E0 50%,
    #F0F0F0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 8. Implementation Notes

### React (JSX) Checklist
- Use Tailwind for layout, CSS variables for brand colors
- `overflow-x: auto; scrollbar-width: none` for horizontal scrolls
- Use `position: sticky; top: 0` for subcategory nav inside menu
- Image fallback: grey `#E8E8E8` background while loading
- Touch targets minimum 44×44px for all interactive elements
- Use `will-change: transform` on animated elements for GPU offload

### HTML/CSS Checklist
- Mobile-first, max-width 430px centered
- iOS-style: `-webkit-overflow-scrolling: touch` for smooth scroll
- Prevent zoom on input focus: `font-size: 16px` on inputs
- Simulate phone frame: 390px width, border-radius 40px, device shadow

### Accessibility
- All icons paired with `aria-label`
- Rating badges: `role="img" aria-label="Rating: 4.2 out of 5"`
- Color not sole differentiator (veg/nonveg: shape + color)

---

## 9. Content & Copy Patterns

Swiggy uses warm, casual, punchy microcopy:

| Context              | Example copy                              |
|----------------------|-------------------------------------------|
| Empty cart           | "Your cart is hungry 🍔"                  |
| No results           | "No restaurants found. Try another area!" |
| Offer banner         | "Get 40% OFF up to ₹120"                  |
| Delivery time        | "30–40 mins"                              |
| Closed restaurant    | "Opens tomorrow at 10 AM"                 |
| Order confirmed      | "Yay! Your order is confirmed 🎉"          |
| Driver assigned      | "Rohit is on his way!"                    |
| Rating prompt        | "How was your experience?"                |

---

## 10. Quick Reference: Common Screens

| Screen           | Key Components                                           |
|------------------|----------------------------------------------------------|
| Home             | Nav + Search + Food grid + Banners + Restaurant list     |
| Restaurant Menu  | Hero + Info card + Sticky tabs + Item list + Cart bar    |
| Cart             | Item rows + Price breakdown + Place order CTA            |
| Search           | Search bar + Filters + Results (restaurants + dishes)    |
| Order Tracking   | Map + Progress steps + Driver info + OTP                |
| Profile          | Avatar + Order history + Addresses + Swiggy One badge   |
| Instamart Home   | Teal header + Category grid + Product cards              |

---

*When building any Swiggy screen, first identify which screen pattern above applies, pick the relevant components, apply the token values, and add the micro-interactions. The result should feel immediately recognizable as Swiggy — warm oranges, clean cards, generous white space, and snappy interactions.*
