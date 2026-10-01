import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Palette mirrors `app/globals.css`:
 *   brand #6060f0 (4.74:1 vs white), brand-deep #4848b4 (7.34:1),
 *   lavender #bdb2ff, cream #fffbd6.
 *
 * The old card used a blue gradient (#0075DE / oklch 262) that appeared nowhere
 * on the site — it was a leftover brand colour, so the social card looked like
 * a different product. White sits at 4.74:1 on brand, so the headline passes AA
 * on the fills below.
 */
const BRAND = "#6060f0";
const BRAND_DEEP = "#4848b4";
const LAVENDER = "#bdb2ff";
const CREAM = "#fffbd6";

/**
 * Dot grid as one pre-tiled SVG, drawn as an `<img>`.
 *
 * SVG data URIs render fine here; what satori will not do is tile a CSS
 * `backgroundImage` or honour `maskImage`. So the repeat and the edge fade both
 * live inside the SVG — a `<pattern>` does the tiling, a `<mask>` over a radial
 * gradient does the fade — and it is painted as a single image.
 *
 * Cell is 34px against the site's 26px field, so the card reads as the same
 * pattern rather than a different texture.
 */
const dots =
  typeof btoa === "function"
    ? btoa(
        `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
           <defs>
             <pattern id="d" width="34" height="34" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="2" fill="#ffffff" fill-opacity="0.14"/>
             </pattern>
             <radialGradient id="f" cx="50%" cy="45%" r="72%">
               <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
               <stop offset="50%" stop-color="#fff" stop-opacity="0.5"/>
               <stop offset="82%" stop-color="#fff" stop-opacity="0"/>
             </radialGradient>
             <mask id="m"><rect width="1200" height="630" fill="url(#f)"/></mask>
           </defs>
           <rect width="1200" height="630" fill="url(#d)" mask="url(#m)"/>
         </svg>`.replace(/\s+/g, " "),
      )
    : "";

const DOT_FIELD = `data:image/svg+xml;base64,${dots}`;

export default async function OpengraphImage() {
  const sans = await readFile(
    join(process.cwd(), "assets", "Inter-Medium.ttf")
  );

  /**
   * The site's real logo, same file the Navbar, Footer and ContactForm use.
   *
   * It is a 2048x2048 opaque PNG that is 88% brand purple with a white mark and
   * no alpha channel, so it needs no plate — the white mark inside carries the
   * contrast. The tile's own edge only sits ~5% off the gradient at the top-left,
   * which reads as intentional rather than as a missing background.
   */
  const logo = await readFile(
    join(process.cwd(), "public", "logo-sabalong.png")
  );
  const LOGO = `data:image/png;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DEEP} 100%)`,
          color: "#FFFFFF",
          fontFamily: "Inter",
        }}
      >
        {/* Dot field behind everything; the fade is baked into the SVG so the
            pattern never draws a hard rectangle around the card. */}
        <img
          src={DOT_FIELD}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            // Sits above the dot layer.
            position: "relative",
          }}
        >
          {/* No plate: the logo carries its own white mark, so it needs no frame. */}
          <img src={LOGO} alt="" width={56} height={56} />
          <div style={{ fontSize: 32, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 68,
              lineHeight: 1,
              letterSpacing: -3.6,
              fontWeight: 500,
              maxWidth: 900,
            }}
          >
            Jasa Pembuatan Website Murah, Mulai dari Rp350 Ribu.
          </div>
          {/* No maxWidth: at 860 the service list wraps to three lines and leaves
              a two-word orphan. The full 1056 content box holds it in two. */}
          <div style={{ fontSize: 28, opacity: 0.85, lineHeight: 1.5 }}>
            Landing page, company profile, toko online, UI/UX design, dan SEO.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 28px",
              borderRadius: 6,
              background: "#FFFFFF",
              color: BRAND_DEEP,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Mulai dari Rp350 rb
          </div>
          <div style={{ fontSize: 22, color: LAVENDER }}>Website untuk bisnis Anda</div>
        </div>

        {/* Corner square from `small-square` in globals.css — the 8px grid-joint
            mark, used here as the card's one brand detail. */}
        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 72,
            display: "flex",
            gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, background: CREAM }} />
          <div style={{ width: 8, height: 8, background: LAVENDER }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: sans, style: "normal", weight: 500 }],
    }
  );
}
