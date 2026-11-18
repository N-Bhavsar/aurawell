// Adds sample APPROVED reviews for design/demo purposes.
//   npm run db:seed:reviews          → add sample reviews (skips if already added)
//   npm run db:seed:reviews -- --remove  → delete every sample review
//
// ⚠ These are placeholder reviews, not real customer feedback. Remove them before launch —
// publishing invented reviews on a live store misleads customers and can breach consumer law.
// Every sample review uses an @sample.aurawell.invalid email so they are easy to find and delete.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SAMPLE_DOMAIN = "@sample.aurawell.invalid";

const sharedReviews = [
  ["Priya Sharma – 25 Years", 5, "Finally, something that fits into my daily wellness routine ❤️", "I wanted something simple that I could easily add to my everyday routine. The gummies are convenient, taste pleasant, and make my wellness routine feel a little more enjoyable.", true],
  ["Ananya Iyer – 28 Years", 5, "Taking care of myself, one day at a time", "I have started paying more attention to my monthly cycle and overall wellness. I love how easy these gummies are to include in my daily routine.", false],
  ["Sneha Patel – 23 Years", 5, "Love the taste and the convenience!", "Most supplements feel like another task on my to-do list. These gummies are different. They are easy to take, taste good, and fit perfectly into my morning routine.", false],
  ["Kavya Reddy – 30 Years", 5, "A little self-care goes a long way 💗", "I wanted to become more consistent with my wellness habits. Having these gummies as part of my routine feels like a small reminder to prioritize myself.", true],
  ["Meera Joshi – 26 Years", 5, "I actually look forward to taking my supplements!", "The taste is enjoyable, the packaging looks lovely, and I appreciate having a supplement that feels convenient rather than complicated.", false],
  ["Riya Desai – 27 Years", 5, "Wellness made simple", "I was looking for an easy way to incorporate ingredients associated with women's wellness into my daily routine. Aaurawell makes it simple and convenient.", false],
  ["Tanvi Agarwal – 24 Years", 5, "My new everyday wellness habit", "Consistency has always been difficult for me with traditional supplements. Gummies make my routine easier and more enjoyable.", false],
  ["Pooja Mehta – 31 Years", 5, "A thoughtful addition to my self-care routine", "I love products that make everyday wellness feel less complicated. These gummies are convenient, easy to incorporate, and a lovely addition to my routine.", false],
];

const reviews = {
  "pms-care-gummy": sharedReviews,
  "gut-comfort-gummy": sharedReviews,
  "daily-nutra-gummy": sharedReviews,
  "iron-glow-gummy": sharedReviews,
};

async function main() {
  if (process.argv.includes("--remove")) {
    const { count } = await prisma.review.deleteMany({ where: { customerEmail: { endsWith: SAMPLE_DOMAIN } } });
    console.log(`✓ Removed ${count} sample reviews`);
    return;
  }

  const existing = await prisma.review.count({ where: { customerEmail: { endsWith: SAMPLE_DOMAIN } } });
  if (existing > 0) {
    console.log(`• ${existing} sample reviews already exist — skipped (use --remove first to re-seed)`);
    return;
  }

  let total = 0;
  for (const [slug, rows] of Object.entries(reviews)) {
    const product = await prisma.product.findUnique({ where: { slug }, select: { id: true } });
    if (!product) {
      console.log(`• Product ${slug} not found — run npm run db:seed first`);
      continue;
    }
    await prisma.review.createMany({
      data: rows.map(([customerName, rating, title, comment, isFeatured], i) => ({
        productId: product.id,
        customerName,
        customerEmail: `${slug}.${customerName.toLowerCase().replace(/[^a-z0-9]+/g, ".")}${SAMPLE_DOMAIN}`,
        rating,
        title,
        comment,
        status: "APPROVED",
        isFeatured,
        createdAt: new Date(Date.now() - (i * 5 + Math.floor(Math.random() * 4) + 2) * 24 * 60 * 60 * 1000),
      })),
    });
    total += rows.length;
  }
  console.log(`✓ Added ${total} sample reviews (remove before launch: npm run db:seed:reviews -- --remove)`);
}

main()
  .catch((err) => {
    console.error("Review seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
