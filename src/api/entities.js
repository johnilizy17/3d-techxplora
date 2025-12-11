// src/api/entities.js
// Local stub replacing Base44 entities so app runs without errors.

export const Product = {
  /**
   * Mock product list generator to keep app functional offline.
   */
  async list(sort = "-created_date", limit = 20) {
    const mockProducts = [
      {
        id: "1",
        name: "Dream Bear",
        description: "A soft collectible plush from the Dreamland series.",
        price: 49.99,
        image: "/placeholders/dreambear.png",
        created_at: "2025-09-15",
      },
      {
        id: "2",
        name: "Cosmic Bunny",
        description: "A glowing bunny that brings dream energy.",
        price: 59.99,
        image: "/placeholders/cosmicbunny.png",
        created_at: "2025-09-20",
      },
      {
        id: "3",
        name: "Star Whale",
        description: "Collector’s edition plush inspired by cosmic dreams.",
        price: 69.99,
        image: "/placeholders/starwhale.png",
        created_at: "2025-09-25",
      },
    ];

    // Sort newest-first if a minus sign is present
    const sorted = sort?.startsWith("-")
      ? [...mockProducts].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      : mockProducts;

    return sorted.slice(0, limit);
  },
};