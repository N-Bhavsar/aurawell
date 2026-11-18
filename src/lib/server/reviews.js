import "server-only";
import { prisma } from "./db.js";
import { HttpError } from "./http.js";

const PUBLIC_REVIEW_SELECT = {
  id: true,
  customerName: true,
  rating: true,
  title: true,
  comment: true,
  createdAt: true,
  product: { select: { name: true, slug: true } },
};

// Only the first name and last initial are shown publicly ("Priya Sharma" → "Priya S.").
// Descriptive or aged customer labels (e.g. "Sample customer – 25 Years") are preserved as-is.
function publicName(name) {
  if (!name) return "";
  const trimmed = name.trim();
  if (trimmed.includes("–") || trimmed.includes(" - ") || /sample/i.test(trimmed)) {
    return trimmed;
  }
  const parts = trimmed.split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts.at(-1)[0].toUpperCase()}.` : parts[0];
}

function toPublic(r) {
  return {
    id: r.id,
    name: publicName(r.customerName),
    rating: r.rating,
    title: r.title,
    quote: r.comment,
    product: r.product?.name,
    productSlug: r.product?.slug,
    createdAt: r.createdAt.toISOString(),
  };
}

export async function listApprovedReviews(productId, take = 20) {
  const rows = await prisma.review.findMany({
    where: { productId, status: "APPROVED" },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take,
    select: PUBLIC_REVIEW_SELECT,
  });
  return rows.map(toPublic);
}

/** Homepage testimonials: featured approved reviews first, topped up with recent approved ones. Deduplicated by customer and quote. */
export async function listHomepageReviews(take = 8) {
  const rows = await prisma.review.findMany({
    where: { status: "APPROVED", product: { isActive: true } },
    orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { createdAt: "desc" }],
    take: Math.max(take * 5, 50),
    select: PUBLIC_REVIEW_SELECT,
  });

  const seenQuotes = new Set();
  const seenCustomers = new Set();
  const uniqueRows = [];

  for (const row of rows) {
    const quoteKey = (row.comment || "").trim().toLowerCase();
    const customerKey = (row.customerName || "").trim().toLowerCase();

    if (quoteKey && seenQuotes.has(quoteKey)) continue;
    if (customerKey && seenCustomers.has(customerKey)) continue;

    if (quoteKey) seenQuotes.add(quoteKey);
    if (customerKey) seenCustomers.add(customerKey);
    uniqueRows.push(row);

    if (uniqueRows.length >= take) break;
  }

  return uniqueRows.map(toPublic);
}

const REPEAT_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export async function submitReview(slug, data) {
  const product = await prisma.product.findFirst({ where: { slug, isActive: true }, select: { id: true } });
  if (!product) throw new HttpError(404, "Product not found");

  const recent = await prisma.review.findFirst({
    where: { productId: product.id, customerEmail: data.customerEmail, createdAt: { gt: new Date(Date.now() - REPEAT_WINDOW_MS) } },
    select: { id: true },
  });
  if (recent) throw new HttpError(409, "You have already reviewed this product recently. Thank you!");

  await prisma.review.create({
    data: {
      productId: product.id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      rating: data.rating,
      title: data.title ?? null,
      comment: data.comment,
      status: "PENDING", // every review is moderated before it appears publicly
    },
  });
}
