import { test, expect } from "@playwright/test";

/* ═══════════════════════════════════════════════
   SWE MIT-WPU Website — Smoke Test Suite
   ═══════════════════════════════════════════════ */

const BASE = "http://localhost:3000";

/** All static routes the site exposes */
const routes = [
  { path: "/", title: "SWE MIT-WPU" },
  { path: "/events", title: "Events" },
  { path: "/team", title: "Team" },
  { path: "/impact", title: "Impact" },
  { path: "/gallery", title: "Gallery" },
  { path: "/contact", title: "Contact" },
];

/* ─── 1. Route reachability ─── */

test.describe("Route Reachability", () => {
  for (const { path, title } of routes) {
    test(`${path} loads without errors`, async ({ page }) => {
      const response = await page.goto(`${BASE}${path}`, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(new RegExp(title, "i"));
    });
  }
});

/* ─── 2. Dynamic event detail page ─── */

test("Event detail page /events/technovate-hackathon-2026 loads", async ({
  page,
}) => {
  const res = await page.goto(
    `${BASE}/events/technovate-hackathon-2026`,
    { waitUntil: "domcontentloaded" }
  );
  expect(res?.status()).toBeLessThan(400);
  await expect(page.locator("h1")).toContainText(/technovate/i);
});

/* ─── 3. SEO: meta description present ─── */

test.describe("SEO Meta", () => {
  test("Homepage has meta description", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute("content", /.{30,}/);
  });

  test("Homepage has Open Graph title", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    const og = page.locator('meta[property="og:title"]');
    await expect(og).toHaveAttribute("content", /SWE/i);
  });
});

/* ─── 4. Accessibility: skip link ─── */

test("Skip-to-content link targets #main", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const skipLink = page.locator('a[href="#main"]');
  await expect(skipLink).toHaveCount(1);
  await expect(page.locator("main#main")).toHaveCount(1);
});

/* ─── 5. Accessibility: heading hierarchy ─── */

test("Each page has exactly one h1", async ({ page }) => {
  for (const { path } of routes) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    const h1Count = await page.locator("h1").count();
    expect(h1Count, `${path} should have 1 h1, found ${h1Count}`).toBe(1);
  }
});

/* ─── 6. Navbar links render ─── */

test("Navbar renders navigation links", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const nav = page.locator("nav");
  await expect(nav).toBeVisible();
  const links = nav.locator("a");
  expect(await links.count()).toBeGreaterThanOrEqual(4);
});

/* ─── 7. Footer social links — no more placeholders ─── */

test("Social links contain no __PLACEHOLDER__", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const html = await page.content();
  expect(html).not.toContain("__PLACEHOLDER__");
});

/* ─── 8. Contact form validation ─── */

test("Contact form rejects empty submission", async ({ page }) => {
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  const submitBtn = page.locator('button[type="submit"]');
  if ((await submitBtn.count()) > 0) {
    await submitBtn.click();
    const invalidInputs = page.locator("input:invalid, textarea:invalid");
    expect(await invalidInputs.count()).toBeGreaterThan(0);
  }
});

/* ─── 9. Responsive: mobile viewport ─── */

test("Site is responsive at 375px width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(376);
});

/* ─── 10. API: contact endpoint rejects bad payload ─── */

test("POST /api/contact rejects empty body", async ({ request }) => {
  const res = await request.post(`${BASE}/api/contact`, {
    data: {},
    headers: { "Content-Type": "application/json" },
  });
  expect(res.status()).toBe(400);
});

/* ─── 11. No console errors on homepage ─── */

test("Homepage has no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto(BASE, { waitUntil: "load", timeout: 15000 });
  const realErrors = errors.filter(
    (e) => !e.includes("favicon") && !e.includes("third-party")
  );
  expect(
    realErrors,
    `Console errors found: ${realErrors.join("\n")}`
  ).toHaveLength(0);
});

