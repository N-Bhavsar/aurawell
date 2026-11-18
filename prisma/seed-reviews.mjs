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

const reviews = {
  "pms-care-gummy": [
    ["Priya Sharma – 25 Years", 5, "Finally, something that fits into my monthly wellness routine ❤️", "I used to dread the week before my period. These gummies are gentle, taste great with the mix berry flavor, and have become a steady part of my monthly cycle care.", true],
    ["Ananya Iyer – 28 Years", 5, "Gentle menstrual cycle support", "I love how easy these gummies are to take compared to large capsules. The Chasteberry and Vitamin B6 blend feels so thoughtful.", false],
    ["Sneha Patel – 23 Years", 5, "My go-to during that time of the month", "The mix berry flavor is lovely, and having magnesium and botanicals in a daily chewable makes cycle care so much more convenient.", false],
    ["Kavya Reddy – 30 Years", 5, "A thoughtful addition to women's health", "Really appreciate a formulation that targets PMS without artificial nasties. Has become an essential in my self-care drawer.", true],
    ["Meera Joshi – 26 Years", 5, "Tastes great and easy on the stomach", "Most period supplements smell medicinal, but Aaurawell got the berry taste just right. Very happy with my purchase.", false],
    ["Riya Desai – 27 Years", 5, "Helps me stay consistent", "Consistency with supplements was always hard for me. Being in a gummy format makes me never forget my daily cycle support.", false],
    ["Tanvi Agarwal – 24 Years", 5, "No more pill fatigue", "Dong quai and chasteberry in delicious gummies! Love the clean ingredient profile and transparent labeling.", false],
    ["Pooja Mehta – 31 Years", 5, "Noticeably calmer cycle routine", "Started taking these on recommendation and they've been wonderful. Great taste and super convenient.", false],
  ],
  "gut-comfort-gummy": [
    ["Natasha Kapoor – 29 Years", 5, "Light, comfortable gut feeling every day", "Bloating after meals was a daily struggle for me. The probiotic and prebiotic blend with ginger and fennel has made a noticeable difference.", true],
    ["Shreya Kulkarni – 27 Years", 5, "Green apple taste is so refreshing!", "I was skeptical about probiotic gummies, but the taste is crisp and tart without being too sweet. Great digestive companion.", false],
    ["Deepa Nair – 33 Years", 5, "Gentle daily digestion support", "The combination of 3.2 Billion CFU with amla and peppermint feels very soothing. Easy to digest and no weird aftertaste.", false],
    ["Neha Singhal – 26 Years", 5, "Finally, gut care that doesn't feel like medicine", "I travel often for work and my digestion takes a hit. Keeping these gummies handy has been a game-changer for my routine.", true],
    ["Aditi Verma – 31 Years", 5, "Great for post-meal bloating", "Love having this after lunch. The herbal extracts like fennel and ginger make it feel holistic yet modern.", false],
    ["Kriti Sen – 24 Years", 5, "Pleasantly surprised by the results", "Gentle on the stomach and keeps me feeling balanced throughout the day. Definitely restocking once my bottle finishes.", false],
    ["Simran Kaur – 28 Years", 5, "Better than hard-to-swallow capsules", "Probiotics used to feel like a chore. These chewable green apple gummies make digestive wellness something I actually look forward to.", false],
    ["Bhavna Dave – 35 Years", 5, "Whole family friendly routine", "High quality formulation with prebiotic FOS. My stomach feels so much lighter and happy throughout the day.", false],
  ],
  "daily-nutra-gummy": [
    ["Radhika Menon – 27 Years", 5, "All 16 essential vitamins in one tasty orange gummy", "No more juggling multiple vitamin bottles in the morning. This multivitamin covers everything from Vitamin D3 to B12 in a single chew.", true],
    ["Ishita Banerji – 25 Years", 5, "Steady daily energy without the slump", "I needed a clean multivitamin for busy workdays. Since starting Daily Nutra, I feel much more active and refreshed throughout the day.", false],
    ["Divya Pillai – 32 Years", 5, "Biotin, Zinc and B-Complex made simple", "My hair and nails have been thanking me! The tangy orange flavor is delicious and gelatin-free.", false],
    ["Shruti Saxena – 29 Years", 5, "The only multivitamin I never forget", "I usually abandon supplement bottles halfway through. These taste so good that taking my morning vitamin is now a habit I love.", true],
    ["Pallavi Chopra – 26 Years", 5, "Perfect daily nutritional safety net", "With my erratic work meals, having comprehensive vitamins A, C, E, and minerals gives me complete peace of mind.", false],
    ["Mansi Shah – 24 Years", 5, "No metallic aftertaste at all", "Most multivitamins leave a lingering unpleasant taste, but Aaurawell nailed the natural citrus flavor. 10/10!", false],
    ["Niharika Roy – 30 Years", 5, "Clean ingredients and zero junk", "Appreciate that it's vegan, gelatin-free and formulated with transparent dosages. A staple in my morning routine.", false],
    ["Ayesha Khan – 28 Years", 5, "Keeps my immunity and focus supported", "Easy to chew, gentle on an empty stomach, and packed with 16 essential nutrients. Highly recommend for working professionals.", false],
  ],
  "iron-glow-gummy": [
    ["Tara Sundaram – 26 Years", 5, "Zero metallic taste, 100% enjoyable", "Traditional iron tablets used to upset my stomach and taste awful. These strawberry iron gummies are gentle, sugar-free, and delicious.", true],
    ["Shalini Rao – 29 Years", 5, "Gentle iron that doesn't cause nausea", "Anyone who has taken iron knows the struggle. This formulation with Vitamin C and B12 is so gentle and easy to digest.", false],
    ["Priyanka Guha – 24 Years", 5, "Loving the sugar-free formulation", "It's rare to find gummies that are completely sugar-free yet taste naturally sweet. Perfect for daily haemoglobin support.", false],
    ["Meghna Bhat – 31 Years", 5, "Goodbye midday fatigue", "Felt a noticeable difference in my everyday energy levels within a few weeks. The addition of zinc and folic acid is brilliant.", true],
    ["Swati Trivedi – 27 Years", 5, "Finally an iron supplement I actually take", "Delicious berry taste with none of the usual iron side effects. My energy and vitality have improved steadily.", false],
    ["Lavanya Mohan – 25 Years", 5, "Great for active women", "I workout regularly and needed iron and folate support. These gummies make it effortless to maintain healthy levels.", false],
    ["Garima Varma – 33 Years", 5, "Sugar free and tooth friendly", "No guilt about sugar content and no harsh aftertaste. A truly modern nutraceutical product done right.", false],
    ["Ruchi Bhattacharya – 28 Years", 5, "Noticeable boost in everyday vitality", "My doctor suggested supplementing iron and this has been by far the most pleasant experience. Highly recommend!", false],
  ],
};

async function main() {
  if (process.argv.includes("--remove")) {
    const { count } = await prisma.review.deleteMany({ where: { customerEmail: { endsWith: SAMPLE_DOMAIN } } });
    console.log(`✓ Removed ${count} sample reviews`);
    return;
  }

  const existing = await prisma.review.count({ where: { customerEmail: { endsWith: SAMPLE_DOMAIN } } });
  if (existing > 0) {
    console.log(`• ${existing} sample reviews already exist — removing and re-seeding unique reviews`);
    await prisma.review.deleteMany({ where: { customerEmail: { endsWith: SAMPLE_DOMAIN } } });
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
  console.log(`✓ Added ${total} unique sample reviews (remove before launch: npm run db:seed:reviews -- --remove)`);
}

main()
  .catch((err) => {
    console.error("Review seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
