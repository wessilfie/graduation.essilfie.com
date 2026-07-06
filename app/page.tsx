"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DESTINATION_URL = "https://uswiththeworld.com";

const POSTCARD_IMAGES = Array.from({ length: 25 }, (_, i) =>
  `postcard-${String(i + 1).padStart(2, "0")}.jpg`
);

function Stamp() {
  return (
    <svg width="72" height="82" viewBox="0 0 72 82" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="68"
        height="78"
        rx="2"
        fill="#003DA5"
        stroke="#003DA5"
        strokeWidth="2.5"
        strokeDasharray="4 2.5"
      />
      <rect x="8" y="8" width="56" height="66" rx="1" fill="white" />
      <image
        href="data:image/png;base64,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FxS/IiIiUlMuLm+eV02h+BUREREL3kDxKyIiIopfUPyKiIiI4hcUvyIiIqL4BQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6vLnzf/7RURERGRWUX2h+BURERHFLyh+RURERPELil8RERFR/ILiV0RERBS/oPgVERERxS+4CEVERETxi+JXRERERPGL4ldERERE8YviV0RERETxi+JXRERERPGL4ldEREQUv6D4FREREcUvKH5FRERE8QuKXxEREVH8guJXREREFL+g+BURERHFL4pfEREREcUvil8RERERxS+KXxERERHFL4pfEREREcUvil8RERFR/ILiV0RERBS/oPgVERERxS8ofkVERETxC4pfERERUfyC4ldEREQUvyh+RURERBS/KH5FREREFL8ofkVEREQUvyh+RURERBS/KH5FRERE8QuKXxEREVH8guJXREREFL+g+BURERHFLyh+RURERPELil8RERFR/KL4dRGKiIiI4hfFr4iIiIjiF8WviIiIiOIXxa+IiIiI4hfFr4iIiIjiF8WviIiIKH5B8SsiIiKKX1D8ioiIiOIXFL8iIiKi+AXFr4iIiCh+6/H/4+cGy+y8fOQAAAAASUVORK5CYIKvyAxeQmKKRDzIhomH2zBRKMf/L15UFBcy7SIsiqnheRhF7fA8HBZbw3NR0SXm+8IM6PcrIiIi+vti3q+IiIiI/r7U6Pytez+6QEVERGTSufLVN2+otEhnfql/1QUqIiIik86024LCiVy6c+/3LlARERGx2I0mfLr13csuUBEREZlkzvX6PVUWFr2JiIhIE7G5BanZ7EJEREQmOt+3//A1FRZpxacJF6qIiIhY7A=="
        x="13"
        y="10"
        width="46"
        height="38"
        preserveAspectRatio="xMidYMid meet"
      />
      <text
        x="36"
        y="56"
        textAnchor="middle"
        fontSize="5.2"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontWeight="800"
        letterSpacing="0.6"
        fill="#003DA5"
      >
        COLUMBIA
      </text>
      <text
        x="36"
        y="63"
        textAnchor="middle"
        fontSize="4.8"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontWeight="700"
        letterSpacing="0.4"
        fill="#003DA5"
      >
        UNIVERSITY
      </text>
      <text
        x="36"
        y="70"
        textAnchor="middle"
        fontSize="4.2"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fill="#75AADB"
        letterSpacing="0.3"
      >
        NEW YORK · 2026
      </text>
    </svg>
  );
}

function CbsBackground() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [tiles, setTiles] = useState<{ src: string; key: number }[]>(() =>
    Array.from({ length: 20 }, () => ({ src: "", key: 0 }))
  );

  useEffect(() => {
    fetch("/api/cbs-photos")
      .then((response) => response.json())
      .then((data: { photos?: string[] }) => setPhotos(data.photos ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (photos.length === 0) {
      return;
    }

    setTiles(
      Array.from({ length: 20 }, (_, index) => ({
        src: photos[index % photos.length],
        key: index,
      }))
    );

    let counter = 100;
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * 20);
      const src = photos[Math.floor(Math.random() * photos.length)];
      setTiles((current) => {
        const next = [...current];
        next[index] = { src, key: counter++ };
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [photos]);

  if (photos.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
      }}
    >
      {tiles.map((tile, index) => (
        <div key={index} className="overflow-hidden">
          {tile.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={tile.key}
              src={tile.src}
              alt=""
              className="tile-img h-full w-full object-cover"
              style={{ opacity: 0.22 }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [postcardImg] = useState<string>(
    () => POSTCARD_IMAGES[Math.floor(Math.random() * POSTCARD_IMAGES.length)]
  );
  const goToDestination = () => {
    window.location.href = DESTINATION_URL;
  };

  return (
    <>
      <CbsBackground />
      <main className="relative z-10 flex min-h-[100dvh] flex-col items-center px-4 py-8 sm:py-12">
        <div className="my-auto flex w-full max-w-[520px] flex-col items-center sm:max-w-[600px] lg:max-w-[680px]">
          <div
            role="button"
            tabIndex={0}
            aria-label="Open uswiththeworld.com"
            className="font-fraunces block w-full overflow-hidden rounded-[3px]"
            style={{
              backgroundColor: "#FAFAF7",
              border: "1px solid #E0DBD4",
              boxShadow:
                "0 2px 6px rgba(0,0,0,0.07), 0 10px 24px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.06)",
              cursor: "pointer",
            }}
            onClick={goToDestination}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToDestination();
              }
            }}
          >
            <div className="relative w-full bg-[#D4CFC8]" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={postcardImg ? `/postcardpics/${postcardImg}` : undefined}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 30%" }}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div
                className="absolute inset-x-0 bottom-0 h-16"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.38), transparent)",
                }}
              />

              <div className="absolute bottom-3 left-4">
                <Image
                  src="/cbs-logo.png"
                  alt="Columbia Business School"
                  width={70}
                  height={27}
                  className="opacity-85 brightness-0 invert"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div
              className="flex items-stretch"
              style={{ borderTop: "1px solid rgba(90,72,50,0.12)" }}
            >
              <div className="flex-[5] px-5 py-4">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  From
                </p>
                <p className="text-[14px] font-semibold leading-snug text-stone-800">
                  Will Essilfie
                </p>
                <p className="mt-1 text-[11px] leading-snug text-stone-400">
                  Columbia Business School
                  <br />
                  MBA ʼ26 · New York, NY
                </p>
              </div>

              <div
                className="my-3 w-px self-stretch"
                style={{ backgroundColor: "rgba(90,72,50,0.10)" }}
              />

              <div className="flex flex-[5] flex-col justify-center px-5 py-4">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  To
                </p>
                <p className="text-[26px] leading-none text-stone-800">You!</p>
                <p className="mt-1.5 text-[10.5px] leading-snug text-stone-400">
                  Flip to add your address
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goToDestination}
            className="flip-hint mt-6 flex flex-col items-center gap-1.5 group"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{
                border: "1px solid rgba(90,72,50,0.22)",
                backgroundColor: "rgba(250,250,247,0.7)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-stone-500 group-hover:text-stone-700 transition-colors">
                <path d="M3.5 9A5.5 5.5 0 0 1 14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 3v2.5h-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.5 9A5.5 5.5 0 0 1 4 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 15v-2.5h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[11px] tracking-wide text-stone-400 group-hover:text-stone-600 transition-colors">
              Flip to open
            </span>
          </button>
        </div>

        <div className="pointer-events-none absolute right-6 top-6 hidden sm:block">
          <Stamp />
        </div>
      </main>
    </>
  );
}
