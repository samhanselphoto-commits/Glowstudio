/**
 * 24 Vietnamese prompt templates for designer & marketer in Vietnam.
 * Shuffled and picked on each "Surprise me" call.
 */

const PROMPTS: string[] = [
  "Bento UI dashboard cho app productivity, soft gradient tím, 3D clay, ánh sáng studio từ trái",
  "Editorial fashion shot, cinematic teal & amber grading, model áo dài hiện đại, ambient light",
  "Sản phẩm skincare trên marble trắng, soft shadow tự nhiên, ánh sáng cửa sổ ban mai",
  "Poster Tết 2026 với typography tiếng Việt có dấu, đỏ & vàng chủ đạo, mây trời nền",
  "Moodboard concept quán cà phê Hà Nội, vintage gạch bông, ánh sáng vàng ấm",
  "Logo + brand guideline cho studio nhỏ, vector sạch, typography sans-serif, tối giản",
  "Minh họa trẻ em đọc sách, màu nước ấm, không gian vintage, nắng chiều",
  "Mockup tai nghe bluetooth trên nền pastel, soft 3D, floating shadow",
  "Travel editorial Vịnh Hạ Long, drone shot golden hour, tone cinematic",
  "Mockup poster phim indie Việt, typography đậm chất Đông Á, ánh sáng neon",
  "Sản phẩm cà phê lon nhôm, splash effect, soft light, dark background",
  "Lookbook thời trang nữ công sở Hà Nội, tone pastel, ánh sáng tự nhiên studio",
  "Landing page hero SaaS, gradient mesh tím & hồng, UI cards floating",
  "Brochure bất động sản biệt thự Đà Lạt, fog, ánh sáng sương sớm, tone vintage",
  "Instagram story quảng bá sự kiện âm nhạc indie, neon HCM, graffiti street",
  "Packaging hộp trà sen Tây Hồ, illustration line art, tone trầm",
  "Hero banner shop thời trang online, model nữ trẻ, pastel pink & cream",
  "Menu nhà hàng fusion Việt, layout 2 cột, photography overhead",
  "Bìa sách tiểu thuyết Việt hiện đại, typography nghệ thuật, tone trầm",
  "Bài post Tết Nguyên Đán cho fanpage doanh nghiệp, đỏ & vàng gold, lời chúc tiếng Việt",
  "Sản phẩm túi xách handmade, ambient soft, nền vải linen, studio minimal",
  "Lookbook streetwear unisex Sài Gòn, graffiti background, tone tươi",
  "Bento infographic giới thiệu sản phẩm, nhiều màu, 3D clay icons",
  "Mô phỏng app fintech, dashboard dark mode, gradient violet, cards nổi",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Returns a single random prompt, optionally different from the current one. */
export function surpriseMe(current?: string): string {
  for (let i = 0; i < 8; i++) {
    const candidate = pickRandom(PROMPTS);
    if (candidate !== current) return candidate;
  }
  return pickRandom(PROMPTS);
}
