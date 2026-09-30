import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const sans = await readFile(
    join(process.cwd(), "assets", "Inter-Medium.ttf")
  );

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
          backgroundImage:
            "linear-gradient(oklch(0.546 0.245 262.881) 0%, oklab(0.546 -0.030363 -0.243111 / 0.8) 100%)",
          color: "#FFFFFF",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 9999,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 600,
              color: "#0075DE",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 32, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1,
              letterSpacing: -3.6,
              fontWeight: 500,
              maxWidth: 900,
            }}
          >
            Jasa Pembuatan Website Profesional
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 860, lineHeight: 1.5 }}>
            Landing page, company profile, toko online, UI/UX design, dan SEO.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              padding: "12px 28px",
              borderRadius: 9999,
              background: "#0075DE",
              fontSize: 22,
            }}
          >
            Mulai dari Rp350K
          </div>
          <div style={{ fontSize: 22, opacity: 0.8 }}>
            {site.business.areaServed}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: sans, style: "normal", weight: 500 }],
    }
  );
}