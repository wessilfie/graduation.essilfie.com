"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import sendMessageAnimation from "../public/send-message.json";

// ---------------------------------------------------------------------------
// Country config
// ---------------------------------------------------------------------------

type CountryConfig = {
  name: string;
  stateLabel: string;
  states: { code: string; name: string }[] | null;
  zipLabel: string;
  zipPlaceholder: string;
  streetPlaceholder: string;
  hideState?: boolean;
};

const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
  { code: "DC", name: "Washington, D.C." },
];

const CA_PROVINCES = [
  { code: "AB", name: "Alberta" }, { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" }, { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" }, { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" }, { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" }, { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" }, { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

const AU_STATES = [
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NSW", name: "New South Wales" }, { code: "NT", name: "Northern Territory" },
  { code: "QLD", name: "Queensland" }, { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" }, { code: "VIC", name: "Victoria" },
  { code: "WA", name: "Western Australia" },
];

// Pinned: US, GB, GH — then alphabetical
const COUNTRY_LIST: { code: string; config: CountryConfig }[] = [
  { code: "US", config: { name: "United States", stateLabel: "State", states: US_STATES, zipLabel: "ZIP code", zipPlaceholder: "10027", streetPlaceholder: "665 W. 130th Street" } },
  { code: "GB", config: { name: "United Kingdom", stateLabel: "County", states: null, zipLabel: "Postcode", zipPlaceholder: "SW1A 1AA", streetPlaceholder: "Street address", hideState: true } },
  { code: "GH", config: { name: "Ghana", stateLabel: "Region", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "AU", config: { name: "Australia", stateLabel: "State", states: AU_STATES, zipLabel: "Postcode", zipPlaceholder: "2000", streetPlaceholder: "Street address" } },
  { code: "AT", config: { name: "Austria", stateLabel: "State", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "BE", config: { name: "Belgium", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "BR", config: { name: "Brazil", stateLabel: "State", states: null, zipLabel: "CEP", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "CA", config: { name: "Canada", stateLabel: "Province", states: CA_PROVINCES, zipLabel: "Postal code", zipPlaceholder: "M5V 2T6", streetPlaceholder: "Street address" } },
  { code: "CN", config: { name: "China", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "CI", config: { name: "Côte d'Ivoire", stateLabel: "District", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "DK", config: { name: "Denmark", stateLabel: "Region", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "EG", config: { name: "Egypt", stateLabel: "Governorate", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "ET", config: { name: "Ethiopia", stateLabel: "Region", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "FR", config: { name: "France", stateLabel: "Department", states: null, zipLabel: "Postal code", zipPlaceholder: "75001", streetPlaceholder: "Street address" } },
  { code: "DE", config: { name: "Germany", stateLabel: "State", states: null, zipLabel: "Postal code", zipPlaceholder: "10115", streetPlaceholder: "Street address" } },
  { code: "HK", config: { name: "Hong Kong", stateLabel: "District", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "IN", config: { name: "India", stateLabel: "State", states: null, zipLabel: "PIN code", zipPlaceholder: "110001", streetPlaceholder: "Street address" } },
  { code: "IE", config: { name: "Ireland", stateLabel: "County", states: null, zipLabel: "Eircode", zipPlaceholder: "D01 F5P2", streetPlaceholder: "Street address" } },
  { code: "IL", config: { name: "Israel", stateLabel: "District", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "IT", config: { name: "Italy", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "00118", streetPlaceholder: "Street address" } },
  { code: "JM", config: { name: "Jamaica", stateLabel: "Parish", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "JP", config: { name: "Japan", stateLabel: "Prefecture", states: null, zipLabel: "Postal code", zipPlaceholder: "100-0001", streetPlaceholder: "Street address" } },
  { code: "KE", config: { name: "Kenya", stateLabel: "County", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "MX", config: { name: "Mexico", stateLabel: "State", states: null, zipLabel: "Postal code", zipPlaceholder: "06600", streetPlaceholder: "Street address" } },
  { code: "NL", config: { name: "Netherlands", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "1011 AB", streetPlaceholder: "Street address" } },
  { code: "NZ", config: { name: "New Zealand", stateLabel: "Region", states: null, zipLabel: "Postcode", zipPlaceholder: "1010", streetPlaceholder: "Street address" } },
  { code: "NG", config: { name: "Nigeria", stateLabel: "State", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "NO", config: { name: "Norway", stateLabel: "County", states: null, zipLabel: "Postal code", zipPlaceholder: "0010", streetPlaceholder: "Street address" } },
  { code: "PK", config: { name: "Pakistan", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "44000", streetPlaceholder: "Street address" } },
  { code: "PT", config: { name: "Portugal", stateLabel: "District", states: null, zipLabel: "Postal code", zipPlaceholder: "1000-001", streetPlaceholder: "Street address" } },
  { code: "SG", config: { name: "Singapore", stateLabel: "District", states: null, zipLabel: "Postal code", zipPlaceholder: "018956", streetPlaceholder: "Street address" } },
  { code: "ZA", config: { name: "South Africa", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "8001", streetPlaceholder: "Street address" } },
  { code: "KR", config: { name: "South Korea", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "04524", streetPlaceholder: "Street address" } },
  { code: "ES", config: { name: "Spain", stateLabel: "Province", states: null, zipLabel: "Postal code", zipPlaceholder: "28001", streetPlaceholder: "Street address" } },
  { code: "SE", config: { name: "Sweden", stateLabel: "County", states: null, zipLabel: "Postal code", zipPlaceholder: "111 20", streetPlaceholder: "Street address" } },
  { code: "CH", config: { name: "Switzerland", stateLabel: "Canton", states: null, zipLabel: "Postal code", zipPlaceholder: "8001", streetPlaceholder: "Street address" } },
  { code: "TT", config: { name: "Trinidad & Tobago", stateLabel: "Region", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "AE", config: { name: "UAE", stateLabel: "Emirate", states: null, zipLabel: "Postal code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
  { code: "OTHER", config: { name: "Other country", stateLabel: "State / Region", states: null, zipLabel: "Postal / ZIP code", zipPlaceholder: "", streetPlaceholder: "Street address" } },
];

const COUNTRY_MAP = Object.fromEntries(
  COUNTRY_LIST.map(({ code, config }) => [code, config])
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step = "form" | "review" | "confirmation";
type FlipState = "front" | "flip-out" | "flip-in" | "back";

interface FormData {
  name: string;
  email: string;
  country: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: "", email: "",
  country: "US", street: "", street2: "", city: "", state: "", zip: "",
};

// ---------------------------------------------------------------------------
// Postcard photo pool
// ---------------------------------------------------------------------------

const POSTCARD_IMAGES = Array.from({ length: 21 }, (_, i) =>
  `postcard-${String(i + 1).padStart(2, "0")}.jpg`
);

// ---------------------------------------------------------------------------
// Stamp SVG — uses crown.png
// ---------------------------------------------------------------------------

function Stamp() {
  return (
    <svg width="72" height="82" viewBox="0 0 72 82" aria-hidden="true">
      {/* Perforated outer rect */}
      <rect x="2" y="2" width="68" height="78" rx="2"
        fill="#003DA5" stroke="#003DA5" strokeWidth="2.5" strokeDasharray="4 2.5" />
      {/* White inner frame */}
      <rect x="8" y="8" width="56" height="66" rx="1" fill="white" />
      {/* Columbia crown photo — embedded as data URI to ensure it loads on iOS Safari */}
      <image href="data:image/png;base64,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FxS/IiIiUlMuLm+eV02h+BUREREL3kDxKyIiIopfUPyKiIiI4hcUvyIiIqL4BQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6vLnzf/7RURERGRWUX2h+BURERHFLyh+RURERPELil8RERFR/ILiV0RERBS/oPgVERERxS+4CEVERETxi+JXRERERPGL4ldERERE8YviV0RERETxi+JXRERERPGL4ldEREQUv6D4FREREcUvKH5FRERE8QuKXxEREVH8guJXREREFL+g+BURERHFL4pfEREREcUvil8RERERxS+KXxERERHFL4pfEREREcUvil8RERFR/ILiV0RERBS/oPgVERERxS8ofkVERETxC4pfERERUfyC4ldEREQUvyh+RURERBS/KH5FREREFL8ofkVEREQUvyh+RURERBS/KH5FRERE8QuKXxEREVH8guJXREREFL+g+BURERHFLyh+RURERPELil8RERFR/KL4dRGKiIiI4hfFr4iIiIjiF8WviIiIiOIXxa+IiIiI4hfFr4iIiIjiF8WviIiIKH5B8SsiIiKKX1D8ioiIiOIXFL8iIiKi+AXFr4iIiCh+6/H/4+cGy+y8fOQAAAAASUVORK5CYIKvyAxeQmKKRDzIhomH2zBRKMf/L15UFBcy7SIsiqnheRhF7fA8HBZbw3NR0SXm+8IM6PcrIiIi+vti3q+IiIiI/r7U6Pytez+6QEVERGTSufLVN2+otEhnfql/1QUqIiIik86024LCiVy6c+/3LlARERGx2I0mfLr13csuUBEREZlkzvX6PVUWFr2JiIhIE7G5BanZ7EJEREQmOt+3//A1FRZpxacJF6qIiIhY7A==" x="13" y="10" width="46" height="38"
        preserveAspectRatio="xMidYMid meet" />
      {/* "COLUMBIA UNIVERSITY" */}
      <text x="36" y="56" textAnchor="middle" fontSize="5.2"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontWeight="800" letterSpacing="0.6" fill="#003DA5">
        COLUMBIA
      </text>
      <text x="36" y="63" textAnchor="middle" fontSize="4.8"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontWeight="700" letterSpacing="0.4" fill="#003DA5">
        UNIVERSITY
      </text>
      <text x="36" y="70" textAnchor="middle" fontSize="4.2"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fill="#75AADB" letterSpacing="0.3">
        NEW YORK · 2026
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CBS rotating background tiles
// ---------------------------------------------------------------------------

function CbsBackground() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [tiles, setTiles] = useState<{ src: string; key: number }[]>(() =>
    Array.from({ length: 20 }, () => ({ src: "", key: 0 }))
  );

  useEffect(() => {
    fetch("/api/cbs-photos")
      .then(r => r.json())
      .then((d: { photos?: string[] }) => setPhotos(d.photos ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    // Initialize all tiles with random photos
    setTiles(Array.from({ length: 20 }, (_, i) => ({
      src: photos[i % photos.length],
      key: i,
    })));
    let counter = 100;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * 20);
      const src = photos[Math.floor(Math.random() * photos.length)];
      setTiles(prev => {
        const next = [...prev];
        next[idx] = { src, key: counter++ };
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(4, 1fr)" }}
    >
      {tiles.map((tile, i) => (
        <div key={i} className="overflow-hidden">
          {tile.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={tile.key}
              src={tile.src}
              alt=""
              className="tile-img w-full h-full object-cover"
              style={{ opacity: 0.22 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Postmark SVG
// ---------------------------------------------------------------------------

function Postmark() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="33" fill="none" stroke="rgba(28,25,23,0.52)" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="25" fill="none" stroke="rgba(28,25,23,0.35)" strokeWidth="1" />
      <path id="arc-top" d="M 8 36 A 28 28 0 0 1 64 36" fill="none" />
      <text fontSize="7.5" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontWeight="700" fill="rgba(28,25,23,0.62)" letterSpacing="1.2">
        <textPath href="#arc-top" startOffset="8%">NEW YORK, NY</textPath>
      </text>
      <text x="36" y="36" textAnchor="middle" fontSize="6.5"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fill="rgba(28,25,23,0.55)">MAY 2026</text>
      {/* Wavy cancel lines */}
      {[40, 45, 50].map(y => (
        <path key={y}
          d={`M 12 ${y} Q 19 ${y - 3} 26 ${y} Q 33 ${y + 3} 40 ${y} Q 47 ${y - 3} 54 ${y} Q 61 ${y + 3} 60 ${y}`}
          fill="none" stroke="rgba(28,25,23,0.45)" strokeWidth="1.1" />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Custom searchable combobox
// ---------------------------------------------------------------------------

type ComboOption = { value: string; label: string };

function Combobox({
  id, value, onChange, options, placeholder = "Select…", autoComplete = "off",
}: {
  id: string; value: string;
  onChange: (v: string) => void;
  options: ComboOption[];
  placeholder?: string;
  autoComplete?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  const filtered = query.trim()
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  function handleBlur(e: React.FocusEvent) {
    if (listRef.current?.contains(e.relatedTarget as Node)) return;
    setOpen(false);
    // Auto-select if typed/autofilled value matches an option
    const q = query.trim().toLowerCase();
    if (q) {
      const match = options.find(
        o => o.label.toLowerCase() === q || o.value.toLowerCase() === q
      );
      if (match) onChange(match.value);
    }
    setQuery("");
  }

  function select(opt: ComboOption) {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="relative">
      <input
        id={id}
        ref={inputRef}
        type="text"
        autoComplete={autoComplete}
        spellCheck={false}
        value={open ? query : (selected?.label ?? "")}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => { setOpen(true); setQuery(""); }}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={inputCls + " pr-8 cursor-pointer"}
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div
          ref={listRef}
          tabIndex={-1}
          className="absolute z-50 left-0 right-0 mt-1 bg-white border border-stone-200 rounded-md shadow-xl overflow-hidden"
        >
          {filtered.length > 0 ? (
            <div className="overflow-y-auto" style={{ maxHeight: 216 }}>
              {filtered.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onMouseDown={() => select(opt)}
                  className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors ${
                    opt.value === value
                      ? "bg-[#75B2DD]/[0.07] text-[#75B2DD] font-medium"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3.5 py-3 text-sm text-stone-400">No results</div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Input styles
// ---------------------------------------------------------------------------

const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-white border border-stone-200 rounded-md " +
  "text-stone-900 placeholder:text-stone-400 focus:outline-none " +
  "focus:ring-2 focus:ring-[#75B2DD]/40 focus:border-[#75B2DD]/60 transition-shadow";

// ---------------------------------------------------------------------------
// Field wrapper
// ---------------------------------------------------------------------------

function Field({
  id, label, required, hint, error, children,
}: {
  id: string; label: string; required?: boolean;
  hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-baseline gap-1.5 text-xs font-medium text-stone-500">
        {label}
        {required && <span className="text-[#75B2DD]">*</span>}
        {hint && <span className="font-normal text-stone-400">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Address fields
// ---------------------------------------------------------------------------

function AddressFields({ data, onChange }: { data: FormData; onChange: (d: FormData) => void }) {
  const cfg = COUNTRY_MAP[data.country] ?? COUNTRY_MAP["OTHER"]!;

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, [key]: e.target.value });

  const countryOptions = COUNTRY_LIST.map(({ code, config }) => ({ value: code, label: config.name }));
  const stateOptions = cfg.states?.map(s => ({ value: s.code, label: s.name })) ?? [];

  return (
    <div className="space-y-3.5">
      <Field id="country" label="Country">
        <Combobox id="country" value={data.country} placeholder="Select country"
          autoComplete="country-name"
          options={countryOptions}
          onChange={v => onChange({ ...data, country: v, state: "", zip: "" })} />
      </Field>

      <Field id="street" label="Street address">
        <input id="street" type="text" autoComplete="address-line1"
          placeholder={cfg.streetPlaceholder} value={data.street} onChange={set("street")}
          className={inputCls} />
      </Field>

      <Field id="street2" label="Address line 2" hint="(apt, suite, floor, etc.)">
        <input id="street2" type="text" autoComplete="address-line2"
          placeholder="Apt, suite, floor, etc." value={data.street2} onChange={set("street2")}
          className={inputCls} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field id="city" label="City">
          <input id="city" type="text" autoComplete="address-level2"
            placeholder="City" value={data.city} onChange={set("city")} className={inputCls} />
        </Field>
        {!cfg.hideState && (
          <Field id="state" label={cfg.stateLabel}>
            {cfg.states ? (
              <Combobox id="state" value={data.state} placeholder={cfg.stateLabel}
                autoComplete="address-level1"
                options={stateOptions} onChange={v => onChange({ ...data, state: v })} />
            ) : (
              <input id="state" type="text" autoComplete="address-level1"
                placeholder={cfg.stateLabel} value={data.state} onChange={set("state")} className={inputCls} />
            )}
          </Field>
        )}
      </div>

      <Field id="zip" label={cfg.zipLabel}>
        <input id="zip" type="text" autoComplete="postal-code"
          placeholder={cfg.zipPlaceholder || cfg.zipLabel}
          value={data.zip} onChange={set("zip")} className={inputCls} />
      </Field>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Form step (back of card)
// ---------------------------------------------------------------------------

function FormStep({ data, errors, onChange, onContinue }: {
  data: FormData; errors: FieldErrors;
  onChange: (d: FormData) => void; onContinue: () => void;
}) {
  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="form-unfold space-y-4">
      <Field id="name" label="Full name" required error={errors.name}>
        <input id="name" type="text" autoComplete="name" placeholder="Your name"
          value={data.name} onChange={set("name")} className={inputCls} />
      </Field>

      <Field id="email" label="Email address" required error={errors.email}>
        <input id="email" type="email" autoComplete="email" placeholder="your@email.com"
          value={data.email} onChange={set("email")} className={inputCls} />
      </Field>

      <div className="border-t border-stone-100 pt-0.5" />

      <div className="space-y-3.5 pt-0.5">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-stone-100" />
          <span className="text-xs text-stone-400">Mailing address (optional)</span>
          <div className="flex-1 h-px bg-stone-100" />
        </div>
        <AddressFields data={data} onChange={onChange} />
        <p className="text-xs text-stone-400 pt-0.5">
          I&rsquo;ll send a card to this address in May 2026. Leave blank for digital only.
        </p>
      </div>

      <button type="button" onClick={onContinue}
        className="w-full py-3 bg-[#75B2DD] text-white text-sm font-semibold rounded-md hover:bg-[#5A9CC9] active:bg-[#4A8DB8] transition-colors mt-2">
        Review &amp; submit &rarr;
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Review step
// ---------------------------------------------------------------------------

function ReviewRow({ label, value }: { label: string; value: string | string[] }) {
  const lines = Array.isArray(value) ? value.filter(Boolean) : [value];
  return (
    <div className="flex flex-col gap-0.5 py-2.5 border-b border-stone-100 last:border-0">
      <span className="text-xs text-stone-400">{label}</span>
      <span className="text-sm text-stone-800">
        {lines.length ? lines.map((line, i) => <span key={i} className="block">{line}</span>) : "—"}
      </span>
    </div>
  );
}

function ReviewStep({ data, onBack, onConfirm, submitting, error }: {
  data: FormData; onBack: () => void; onConfirm: () => void;
  submitting: boolean; error: string | null;
}) {
  const cfg = COUNTRY_MAP[data.country] ?? COUNTRY_MAP["OTHER"]!;
  const streetFull = [data.street, data.street2].filter(Boolean).join(", ");
  const cityLine = [data.city, data.state].filter(Boolean).join(", ") + (data.zip ? ` ${data.zip}` : "");

  return (
    <div className="form-unfold space-y-5">
      <div>
        <p className="font-fraunces text-[26px] leading-tight text-stone-800">Does this look right?</p>
        <p className="text-xs text-stone-400 mt-0.5">Take a quick look before I send it your way.</p>
      </div>

      <div className="bg-stone-50 rounded-md px-4 divide-y divide-stone-100">
        <ReviewRow label="Name" value={data.name} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Mailing address"
          value={[data.street, data.street2, cityLine, cfg.name].filter(Boolean)} />
      </div>
      {!streetFull && (
        <p className="text-xs text-stone-400 -mt-2">
          No address entered — I&rsquo;ll send you a digital card instead.
        </p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="flex-1 py-3 text-sm font-semibold text-stone-500 border border-stone-200 rounded-md hover:bg-stone-50 transition-colors">
          Edit
        </button>
        <button type="button" onClick={onConfirm} disabled={submitting}
          className="flex-[2] py-3 bg-[#75B2DD] text-white text-sm font-semibold rounded-md hover:bg-[#5A9CC9] disabled:opacity-50 transition-colors">
          {submitting ? "Sending…" : "Confirm & send →"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Confirmation step
// ---------------------------------------------------------------------------

function ConfirmationStep({ data }: { data: FormData }) {
  const [done, setDone] = useState(false);
  const [nameVisible, setNameVisible] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setNameVisible(false), 500);
    return () => clearTimeout(t);
  }, []);

  function handleComplete() {
    if (completedRef.current) return;
    completedRef.current = true;
    setDone(true);
  }

  return (
    // Fixed-height stage — both layers live here and crossfade
    <div className="form-unfold" style={{ position: "relative", minHeight: 280 }}>

      {/* ── Lottie layer ─────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "opacity 0.55s ease-out",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
      }}>
        <div style={{ position: "relative" }}>
          <Lottie
            animationData={sendMessageAnimation}
            loop={false}
            onComplete={handleComplete}
            style={{ width: 220, height: 220 }}
          />
          {/* Name overlay — centered on the envelope card shape */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -54%)",
            textAlign: "center",
            pointerEvents: "none",
            transition: "opacity 0.35s ease-out",
            opacity: nameVisible ? 1 : 0,
          }}>
            <p style={{
              fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.92)",
              maxWidth: 64, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {data.name.split(" ")[0] || ""}
            </p>
            {data.city && (
              <p style={{
                fontSize: 8, color: "rgba(255,255,255,0.7)", marginTop: 2,
                maxWidth: 64, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {data.city}{data.state ? `, ${data.state}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Thank-you layer ───────────────────────── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        transition: "opacity 0.55s ease-out",
        opacity: done ? 1 : 0,
        pointerEvents: done ? "auto" : "none",
      }}>
        <p className="font-fraunces text-[42px] leading-tight text-stone-800 mb-3">Thanks!</p>
        <p className="text-[15px] text-stone-600 leading-relaxed" style={{ maxWidth: 260 }}>
          Can&rsquo;t wait to graduate and send you a card soon!
        </p>

        <p className="text-[15px] text-stone-700 mt-2">&mdash;Will</p>
      </div>

      {/* CBS logo — always at the bottom, fades in with done */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        transition: "opacity 0.55s ease-out",
        opacity: done ? 1 : 0,
        pointerEvents: "none",
      }}>
        <div className="pt-2 border-t border-stone-100">
          <Image src="/cbs-logo.png" alt="Columbia Business School"
            width={88} height={34} className="opacity-35"
            style={{ objectFit: "contain", objectPosition: "left" }} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root page
// ---------------------------------------------------------------------------

export default function Page() {
  const [flipState, setFlipState] = useState<FlipState>("front");
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [postcardImg, setPostcardImg] = useState<string | null>(null);

  useEffect(() => {
    setPostcardImg(POSTCARD_IMAGES[Math.floor(Math.random() * POSTCARD_IMAGES.length)]);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "confirmation") {
      setFlipState("back");
      setStep("confirmation");
    }
  }, []);

  function flip() {
    if (flipState !== "front") return;
    setFlipState("flip-out");
    setTimeout(() => {
      setFlipState("flip-in");
    }, 320);
    setTimeout(() => {
      setFlipState("back");
    }, 660);
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const streetFull = [formData.street, formData.street2].filter(Boolean).join(", ");
      const cfg = COUNTRY_MAP[formData.country] ?? COUNTRY_MAP["OTHER"]!;
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, email: formData.email,
          digitalOnly: !streetFull,
          street: streetFull || null,
          city: formData.city || null, state: formData.state || null,
          zip: formData.zip || null, country: cfg.name,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Unexpected error");
      }
      setStep("confirmation");
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Flip animation class for the card div
  const animClass =
    flipState === "flip-out" ? "flip-out" :
    flipState === "flip-in"  ? "flip-in"  :
    flipState === "front"    ? "card-arrive" :
    "";

  return (
    <>
      <CbsBackground />
      <main className="relative z-10 flex flex-col items-center px-4 py-8 sm:py-12" style={{ minHeight: "100dvh" }}>
      <div
        className={`my-auto font-fraunces w-full max-w-[520px] sm:max-w-[600px] lg:max-w-[680px] rounded-[3px] overflow-hidden relative ${animClass}`}
        style={{
          backgroundColor: "#FAFAF7",
          border: "1px solid #E0DBD4",
          boxShadow: "0 2px 6px rgba(0,0,0,0.07), 0 10px 24px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.06)",
        }}
      >

        {/* ── FRONT FACE ── */}
        {(flipState === "front" || flipState === "flip-out") && (
          <>
            {/* Photo strip */}
            <div className="relative w-full bg-[#D4CFC8]" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={postcardImg ? `/postcardpics/${postcardImg}` : undefined} alt="" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />

              {/* Gradient scrim at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-16"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.38), transparent)" }} />

              {/* CBS logo — bottom left */}
              <div className="absolute bottom-3 left-4">
                <Image src="/cbs-logo.png" alt="Columbia Business School"
                  width={70} height={27} className="brightness-0 invert opacity-85"
                  style={{ objectFit: "contain" }} />
              </div>
            </div>

            {/* Postcard front — From / To section */}
            <div className="flex items-stretch" style={{ borderTop: "1px solid rgba(90,72,50,0.12)" }}>
              {/* From */}
              <div className="flex-[5] px-5 py-4">
                <p className="text-[9px] tracking-[0.14em] text-stone-400 uppercase font-semibold mb-2">From</p>
                <p className="font-semibold text-[14px] text-stone-800 leading-snug">
                  Will Essilfie
                </p>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Columbia Business School<br />MBA ʼ26 · New York, NY
                </p>
              </div>

              {/* Divider */}
              <div className="w-px self-stretch my-3" style={{ backgroundColor: "rgba(90,72,50,0.10)" }} />

              {/* To — "You!" */}
              <div className="flex-[5] px-5 py-4 flex flex-col justify-center">
                <p className="text-[9px] tracking-[0.14em] text-stone-400 uppercase font-semibold mb-2">To</p>
                <p className="font-semibold text-[26px] leading-none text-stone-800">
                  You!
                </p>
                <p className="text-[10.5px] text-stone-400 mt-1.5 leading-snug">
                  flip to add your address
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── BACK FACE ── */}
        {(flipState === "flip-in" || flipState === "back") && (
          <div className="px-6 pt-6 pb-7 space-y-5">
            {/* Letter header — stamp always, date only on form */}
            {(step === "form" || step === "review") && (
              <div className="flex items-start justify-between gap-4">
                {step === "form" ? (
                  <div className="pt-1">
                    <p className="text-xs tracking-widest text-stone-400 uppercase font-medium">April 2026</p>
                    <p className="text-xs text-stone-400 mt-0.5">New York, NY</p>
                  </div>
                ) : <div />}
                <div className="shrink-0">
                  <Stamp />
                </div>
              </div>
            )}

            {/* Letter body — hidden on review + confirmation */}
            <div className={`space-y-3.5 text-[15.5px] text-stone-700 leading-[1.85] ${step !== "form" ? "hidden" : ""}`}>
              <p>Hey there!</p>
              <p>
                I&rsquo;m graduating from Columbia in May with my MBA. As I prepare
                to wrap up this journey, I wanted to write a card reflecting on my
                life till now, these past two years, and what I&rsquo;m looking
                ahead to.
              </p>
              <p>
                I&rsquo;d love to send it to people who&rsquo;ve made an impact on
                my life &mdash; including you! Fill out your details below and I&rsquo;ll send
                you a card in May.
              </p>
              <p className="pt-1">&mdash;Will</p>
            </div>

            {step === "form" && <div className="border-t border-stone-100" />}

            {step === "form" && (
              <FormStep data={formData} errors={errors} onChange={setFormData}
                onContinue={() => { if (validate()) setStep("review"); }} />
            )}

            {step === "review" && (
              <ReviewStep data={formData} onBack={() => setStep("form")}
                onConfirm={handleSubmit} submitting={submitting} error={submitError} />
            )}

            {step === "confirmation" && <ConfirmationStep data={formData} />}
          </div>
        )}
      </div>

      {/* Flip hint — below the card, only while showing front */}
      {(flipState === "front") && (
        <button
          type="button"
          onClick={flip}
          className="flip-hint mt-6 flex flex-col items-center gap-1.5 group"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(90,72,50,0.22)", backgroundColor: "rgba(250,250,247,0.7)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-stone-500 group-hover:text-stone-700 transition-colors">
              {/* Flip/rotate icon — two curved arrows */}
              <path d="M3.5 9A5.5 5.5 0 0 1 14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 3v2.5h-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.5 9A5.5 5.5 0 0 1 4 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 15v-2.5h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[11px] tracking-wide text-stone-400 group-hover:text-stone-600 transition-colors">
            flip to open
          </span>
        </button>
      )}
      </main>
    </>
  );
}
