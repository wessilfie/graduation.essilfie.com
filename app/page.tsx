"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  { code: "GB", config: { name: "United Kingdom", stateLabel: "County", states: null, zipLabel: "Postcode", zipPlaceholder: "SW1A 1AA", streetPlaceholder: "Street address" } },
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
  digitalOnly: boolean;
  country: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: "", email: "", digitalOnly: false,
  country: "US", street: "", street2: "", city: "", state: "", zip: "",
};

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
      {/* Columbia crown photo */}
      <image href="/crown.png" x="13" y="10" width="46" height="38"
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
  id, value, onChange, options, placeholder = "Select…",
}: {
  id: string; value: string;
  onChange: (v: string) => void;
  options: ComboOption[];
  placeholder?: string;
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
        autoComplete="off"
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
                      ? "bg-[#003DA5]/[0.07] text-[#003DA5] font-medium"
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
  "focus:ring-2 focus:ring-[#003DA5]/40 focus:border-[#003DA5]/60 transition-shadow";

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
        {required && <span className="text-[#003DA5]">*</span>}
        {hint && <span className="font-normal text-stone-400">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

function Toggle({ id, checked, onChange, label }: {
  id: string; checked: boolean; onChange: (v: boolean) => void; label: string;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none">
      <button
        id={id} role="switch" aria-checked={checked} type="button"
        onClick={() => onChange(!checked)}
        className={`relative rounded-full shrink-0 focus:outline-none focus:ring-2 focus:ring-[#003DA5]/40 focus:ring-offset-1 transition-colors ${checked ? "bg-[#003DA5]" : "bg-stone-200"}`}
        style={{ width: 40, height: 22 }}
      >
        <span className="absolute top-0.5 bg-white rounded-full shadow-sm transition-all"
          style={{ width: 18, height: 18, left: checked ? 20 : 2 }} />
      </button>
      <span className="text-sm text-stone-700">{label}</span>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Step dots
// ---------------------------------------------------------------------------

function StepDots({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {[1, 2, 3].map(n => (
        <div key={n} className="rounded-full transition-all"
          style={{
            width: n === current ? 20 : 8, height: 8,
            backgroundColor: n <= current ? "#003DA5" : "#E7E2DA",
          }} />
      ))}
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
          options={countryOptions}
          onChange={v => onChange({ ...data, country: v, state: "", zip: "" })} />
      </Field>

      <Field id="street" label="Street address">
        <input id="street" type="text" autoComplete="street-address"
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
        <Field id="state" label={cfg.stateLabel}>
          {cfg.states ? (
            <Combobox id="state" value={data.state} placeholder={cfg.stateLabel}
              options={stateOptions} onChange={v => onChange({ ...data, state: v })} />
          ) : (
            <input id="state" type="text" autoComplete="address-level1"
              placeholder={cfg.stateLabel} value={data.state} onChange={set("state")} className={inputCls} />
          )}
        </Field>
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

      <Toggle id="digital-only" checked={data.digitalOnly}
        onChange={v => onChange({ ...data, digitalOnly: v })}
        label="A digital card works for me" />

      {!data.digitalOnly && (
        <div className="space-y-3.5 pt-0.5">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-xs text-stone-400">Mailing address (optional)</span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>
          <AddressFields data={data} onChange={onChange} />
          <p className="text-xs text-stone-400 pt-0.5">
            I&rsquo;ll send a card to this address in May 2026.
          </p>
        </div>
      )}

      <button type="button" onClick={onContinue}
        className="w-full py-3 bg-[#003DA5] text-white text-sm font-semibold rounded-md hover:bg-[#002d80] active:bg-[#002570] transition-colors mt-2">
        This looks good &rarr;
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Review step
// ---------------------------------------------------------------------------

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 border-b border-stone-100 last:border-0">
      <span className="text-xs text-stone-400">{label}</span>
      <span className="text-sm text-stone-800">{value || "—"}</span>
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
        <p className="text-base font-semibold text-stone-800">Does this look right?</p>
        <p className="text-xs text-stone-400 mt-0.5">Take a quick look before I send it your way.</p>
      </div>

      <div className="bg-stone-50 rounded-md px-4 divide-y divide-stone-100">
        <ReviewRow label="Name" value={data.name} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Card" value={data.digitalOnly ? "Digital only" : "Physical + digital"} />
        {!data.digitalOnly && (
          <ReviewRow label="Address"
            value={[streetFull, cityLine, cfg.name].filter(Boolean).join(", ")} />
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="flex-1 py-3 text-sm font-semibold text-stone-500 border border-stone-200 rounded-md hover:bg-stone-50 transition-colors">
          Edit
        </button>
        <button type="button" onClick={onConfirm} disabled={submitting}
          className="flex-[2] py-3 bg-[#003DA5] text-white text-sm font-semibold rounded-md hover:bg-[#002d80] disabled:opacity-50 transition-colors">
          {submitting ? "Sending…" : "This looks good →"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Confirmation step
// ---------------------------------------------------------------------------

function ConfirmationStep() {
  return (
    <div className="form-unfold space-y-6">
      <div className="flex justify-center pt-2">
        <div className="relative">
          <div className="opacity-20"><Stamp /></div>
          <div className="absolute -top-2 -right-4 stamp-thud"><Postmark /></div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-stone-800 text-base leading-relaxed">
          Thanks for filling out your info! I can&rsquo;t wait to send you this card.
          Chat soon,
        </p>
        <p className="text-stone-800 font-semibold text-base">Will</p>
      </div>

      <div className="pt-2 border-t border-stone-100">
        <Image src="/cbs-logo.png" alt="Columbia Business School"
          width={88} height={34} className="opacity-35"
          style={{ objectFit: "contain", objectPosition: "left" }} />
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
          digitalOnly: formData.digitalOnly,
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
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div
        className={`w-full max-w-[520px] sm:max-w-[600px] lg:max-w-[680px] rounded-[3px] overflow-hidden relative ${animClass}`}
        style={{
          backgroundColor: "#FAFAF7",
          boxShadow: [
            "0 1px 2px rgba(0,0,0,0.12)",
            "0 3px 7px rgba(0,0,0,0.09)",
            "0 10px 22px rgba(0,0,0,0.09)",
            "0 30px 60px rgba(0,0,0,0.08)",
            "inset 0 0 0 1px rgba(90,72,50,0.13)",
            "inset 0 1px 2px rgba(255,255,255,0.6)",
            "inset 0 -1px 3px rgba(0,0,0,0.07)",
            "inset 3px 0 6px rgba(0,0,0,0.03)",
            "inset -3px 0 6px rgba(0,0,0,0.03)",
          ].join(", "),
        }}
      >
        {/* Paper aging overlay — always present */}
        <div className="absolute inset-0 pointer-events-none z-10 rounded-[3px]"
          style={{
            background: [
              "radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(90,70,45,0.10) 100%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.04) 100%)",
            ].join(", "),
          }} />

        {/* ── FRONT FACE ── */}
        {(flipState === "front" || flipState === "flip-out") && (
          <>
            {/* Photo strip */}
            <div className="relative w-full bg-[#D4CFC8]" style={{ aspectRatio: "16/7" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/will.jpg" alt="" className="w-full h-full object-cover object-center"
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
                <p className="text-[13px] font-semibold text-stone-800 leading-snug">
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
                <p className="text-[24px] font-bold leading-none text-stone-800">
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
            {/* Letter header — date + stamp */}
            <div className="flex items-start justify-between gap-4">
              <div className="pt-1">
                <p className="text-xs tracking-widest text-stone-400 uppercase font-medium">April 2026</p>
                <p className="text-xs text-stone-400 mt-0.5">New York, NY</p>
              </div>
              <div className="shrink-0">
                <Stamp />
              </div>
            </div>

            {/* Letter body — hidden on review + confirmation */}
            <div className={`space-y-3.5 text-[15px] text-stone-700 leading-[1.85] ${step !== "form" ? "hidden" : ""}`} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              <p>Hey there!</p>
              <p>
                I&rsquo;m graduating from Columbia in May with my MBA. As I prepare
                to wrap up this journey, I wanted to write a card reflecting on my
                life till now, these past two years, and what I&rsquo;m looking
                ahead to.
              </p>
              <p>
                I&rsquo;d love to send it to people who&rsquo;ve made an impact on
                my life &mdash; you! Fill out your details below and I&rsquo;ll send
                you a card in May.
              </p>
              <p className="pt-1">&mdash;Will</p>
            </div>

            <StepDots current={step === "form" ? 1 : step === "review" ? 2 : 3} />
            <div className="border-t border-stone-100" />

            {step === "form" && (
              <FormStep data={formData} errors={errors} onChange={setFormData}
                onContinue={() => { if (validate()) setStep("review"); }} />
            )}

            {step === "review" && (
              <ReviewStep data={formData} onBack={() => setStep("form")}
                onConfirm={handleSubmit} submitting={submitting} error={submitError} />
            )}

            {step === "confirmation" && <ConfirmationStep />}
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
