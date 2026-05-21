import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import {
  Bell, Menu, ChevronDown, Search, X,
  SlidersHorizontal, Star, AlignJustify, Columns3, Grid2x2, LayoutGrid,
  RectangleHorizontal, Check, Plus, Ellipsis, Pencil, Flag, Copy,
  CornerUpRight, Trash2, ChevronRight, ArrowRight, RefreshCw, GripVertical,
} from "lucide-react";
import svgPaths from "../../imports/DesktopWorkspacesInsideAWorkspaceAssetSelected/svg-qymjkh6ysf";
import imgAsset from "../../imports/HomePage/asset-placeholder.jpg";
import imgAsset2 from "../../imports/SequentialAskForApproval-2/1f4ef3aec255aeb4e4d3be203c116b68dace0e97.png";
import imgAsset3 from "../../imports/SequentialAskForApproval-2/35b7233f134a6e353630a725a80102c39df93615.png";
import imgAsset4 from "../../imports/SequentialAskForApproval-2/3118d88c6353094407af3ed6eafa836229239399.png";
import imgAsset5 from "../../imports/SequentialAskForApproval-2/d3723f267f978c7e6e9b60b93dbe02a7b87b798c.png";
import imgAsset6 from "../../imports/SequentialAskForApproval-2/3e68748f36bf71c3390c2028f03213684f30f2a8.png";
import imgLogoDark from "../../imports/HomePage/logo-wedia-dark.svg";
import imgSmartSearchIcon from "../../imports/HomePage/smart-search-icon.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

type Scenario = "zero" | "results";
type Tab = "classic" | "smart" | "portals";

const SCENARIO_CONFIG: Record<Scenario, { classicCount: number; label: string; sublabel: string }> = {
  zero:    { classicCount: 0,  label: "0 results",  sublabel: "→ Smart Search tab" },
  results: { classicCount: 25, label: "Has results", sublabel: "→ Classic tab" },
};
const SMART_COUNT = 600;
const PURPLE = "#813de0";
const PURPLE_LIGHT = "#b48af6";

// ─── Shared primitives ────────────────────────────────────────────────────────

function SmartSearchIcon({ color = "#1E1E1E", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.125 12.95" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M10.15 1.575L10.85 0L11.55 1.575L13.125 2.275L11.55 2.975L10.85 4.55L10.15 2.975L8.575 2.275L10.15 1.575ZM3.15 5.075L4.55 1.925L5.95 5.075L9.1 6.475L5.95 7.875L4.55 11.025L3.15 7.875L0 6.475L3.15 5.075ZM10.15 8.4L10.85 9.975L12.425 10.675L10.85 11.375L10.15 12.95L9.45 11.375L7.875 10.675L9.45 9.975L10.15 8.4Z" fill={color} />
    </svg>
  );
}

function Logo() {
  return (
    <div className="h-[21.785px] relative shrink-0 w-[36.889px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.8887 21.7852">
        <path d={svgPaths.p16826000} fill="#1E1E1E" />
      </svg>
    </div>
  );
}

function Wediatransfer() {
  return (
    <div className="h-[13px] relative shrink-0 w-[125.082px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.082 13">
        <g clipPath="url(#clip0_results_nav)">
          <path d={svgPaths.p8f68780} fill="#5F34D5" />
        </g>
        <defs>
          <clipPath id="clip0_results_nav">
            <rect fill="white" height="13" width="125.082" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function NavDivider() {
  return (
    <div className="flex h-[24px] items-center justify-center shrink-0 w-0">
      <div className="flex-none rotate-90">
        <svg width="24" height="1" fill="none" viewBox="0 0 24 1">
          <line stroke="#E4E4E4" x2="24" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}

function StatusDot() {
  return <div className="bg-[#db8234] border-2 border-white rounded-full shrink-0 size-[16px]" />;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

interface NavigationProps {
  query: string;
  resultCount: number;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
}

function Navigation({ query, resultCount, onQueryChange, onSearch }: NavigationProps) {
  return (
    <div className="bg-white flex h-[72px] items-center justify-between px-[16px] sm:px-[40px] py-[12px] shrink-0 sticky top-0 w-full z-20">
      {/* Left: logo + inline search */}
      <div className="flex flex-1 gap-[16px] sm:gap-[40px] items-center min-w-0 pr-[16px] sm:pr-[40px]">
        <Link to="/" className="shrink-0"><Logo /></Link>

        <div className="flex flex-1 gap-[24px] items-center min-w-0">
          <div className="flex flex-1 gap-[12px] items-center min-w-0">
            {/* Search-in selector — hidden on mobile */}
            <button className="hidden sm:flex items-center gap-[4px] p-[12px] rounded-[4px] shrink-0 hover:bg-[#f8f8f8] transition-colors">
              <span style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700 }} className="text-[#1e1e1e] text-[14px] whitespace-nowrap">All assets</span>
              <ChevronDown size={14} color="#1e1e1e" strokeWidth={2} />
            </button>

            <div className="hidden sm:flex h-[24px] items-center justify-center w-0 shrink-0">
              <div className="flex-none rotate-90">
                <svg width="24" height="1" fill="none" viewBox="0 0 24 1">
                  <line stroke="#E4E4E4" x2="24" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>

            {/* Search input */}
            <div className="flex flex-1 items-center gap-[8px] h-[40px] px-[12px] min-w-0">
              <Search size={16} color="#646464" strokeWidth={1.5} className="shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Find assets by keywords..."
                className="flex-1 bg-transparent outline-none text-[16px] text-[#1e1e1e] min-w-0 placeholder:text-[#646464]"
                style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }}
              />
              {query && (
                <button onClick={() => onQueryChange("")} className="shrink-0 p-[8px] rounded hover:bg-[#f8f8f8]">
                  <X size={16} color="#1e1e1e" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>

          {/* Result count — hidden on mobile */}
          <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="hidden md:block text-[#646464] text-[16px] whitespace-nowrap shrink-0">
            {resultCount} results
          </span>
        </div>

        <NavDivider />
      </div>

      {/* Right */}
      <div className="flex gap-[16px] sm:gap-[24px] items-center shrink-0">
        {/* Wediatransfer + nav links — hidden on mobile/tablet */}
        <div className="hidden lg:flex gap-[24px] items-center shrink-0">
          <Wediatransfer />
          <NavDivider />
          <div className="flex gap-[24px] items-center text-[#1e1e1e] text-[16px] text-center whitespace-nowrap" style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }}>
            <p>{`Boards & Portals`}</p>
            <p>Upload assets</p>
            <Link to="/workspace" className="hover:text-[#1b55f5] transition-colors">Workspaces</Link>
          </div>
          <NavDivider />
        </div>
        <div className="flex gap-[16px] items-center">
          <Bell size={24} color="#1E1E1E" strokeWidth={1.25} />
          <Menu size={24} color="#1E1E1E" strokeWidth={1.25} />
        </div>
      </div>
    </div>
  );
}

// ─── Filter bar with tabs ─────────────────────────────────────────────────────

const FILTERS = ["Asset type:", "Collection", "Folder", "Keywords", "Languages", "People", "Rights"];

const FILTER_VALUES: Record<string, string> = {
  "Asset type:": "Image",
  "Collection": "Summer 2024",
  "Folder": "Marketing",
  "Keywords": "Nature",
  "Languages": "English",
  "People": "Team A",
  "Rights": "Royalty-free",
};

function FilterPill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-[#e4e4e4] flex gap-[8px] items-center justify-center p-[8px] rounded-[4px] shrink-0 hover:border-[#1b55f5] transition-colors"
    >
      <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] leading-[18px] whitespace-nowrap">{label}</span>
      <ChevronDown size={16} color="#646464" strokeWidth={1.5} />
    </button>
  );
}

function ActiveFilterChip({ label, value, onRemove }: { label: string; value: string; onRemove: () => void }) {
  return (
    <div className="bg-[#1b55f5] flex gap-[8px] items-center justify-center p-[8px] rounded-[4px] shrink-0">
      <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-white text-[14px] leading-[18px] whitespace-nowrap">
        {label} {value}
      </span>
      <button
        onClick={onRemove}
        className="shrink-0 flex items-center justify-center size-[16px] rounded-full bg-white/25 hover:bg-white/40 transition-colors"
      >
        <X size={10} color="white" strokeWidth={2.5} />
      </button>
    </div>
  );
}

interface FilterBarProps {
  activeFilters: { label: string; value: string }[];
  onFilterClick: (label: string) => void;
  onRemoveFilter: (label: string) => void;
  onClearFilters: () => void;
}

function FilterBar({ activeFilters, onFilterClick, onRemoveFilter, onClearFilters }: FilterBarProps) {
  return (
    <div className="flex flex-col items-start w-full shrink-0">
      {/* Filter pills row */}
      <div className="flex gap-[16px] items-center w-full pb-[16px]">
        <button className="border border-[#e4e4e4] flex gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px] shrink-0 hover:border-[#1b55f5] transition-colors">
          <SlidersHorizontal size={16} color="#1e1e1e" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">Advanced search</span>
        </button>
        <div className="flex flex-col items-start justify-center shrink-0">
          <div className="h-[20px] w-px bg-[#e4e4e4]" />
        </div>
        <div className="flex flex-1 gap-[8px] items-center overflow-hidden">
          {FILTERS.map((f) => <FilterPill key={f} label={f} onClick={() => onFilterClick(f)} />)}
        </div>
        <button className="border border-[#e4e4e4] flex gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px] shrink-0 hover:border-[#1b55f5] transition-colors">
          <Star size={16} color="#1e1e1e" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">Bookmark search</span>
        </button>
      </div>

      {/* Active filters row — visible only when filters are active */}
      {activeFilters.length > 0 && (
        <div className="flex gap-[16px] items-center w-full pb-[16px]">
          <button
            onClick={onClearFilters}
            className="border border-[#1b55f5] flex gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px] shrink-0 hover:bg-[#1b55f5]/5 transition-colors"
          >
            <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1b55f5] text-[14px] leading-[18px] whitespace-nowrap">Clear filters</span>
          </button>
          <div className="flex flex-1 gap-[8px] items-center flex-wrap">
            {activeFilters.map((f) => (
              <ActiveFilterChip key={f.label} label={f.label} value={f.value} onRemove={() => onRemoveFilter(f.label)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab row (shared between sticky + non-sticky contexts) ────────────────────

interface TabsRowProps {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  classicCount: number;
  smartCount: number;
  portalsCount: number;
}

function TabsRow({ activeTab, onTabChange, classicCount, smartCount, portalsCount }: TabsRowProps) {
  return (
    <div className="flex gap-[24px] items-end w-full border-b border-[#e4e4e4]">
      {/* Classic tab */}
      <button
        onClick={() => onTabChange("classic")}
        className="flex items-center gap-[8px] h-[48px] py-[16px] shrink-0 relative"
        style={{ borderBottom: activeTab === "classic" ? "2px solid #3377ff" : "2px solid transparent", marginBottom: -1 }}
      >
        <span
          style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700, fontSize: 14, color: activeTab === "classic" ? "#1e1e1e" : "#646464" }}
          className="leading-[18px] whitespace-nowrap transition-colors"
        >
          Classic search
        </span>
        <span
          className="h-[18px] flex items-center justify-center px-[6px] py-[4px] rounded-full text-[12px] leading-[15px]"
          style={{
            fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500,
            background: "#e4e4e4",
            color: activeTab === "classic" ? "#1e1e1e" : "#646464",
          }}
        >
          {classicCount}
        </span>
      </button>

      {/* Smart search tab */}
      <button
        onClick={() => onTabChange("smart")}
        className="flex items-center gap-[8px] h-[48px] py-[16px] shrink-0 relative"
        style={{ borderBottom: activeTab === "smart" ? "2px solid #9b63ef" : "2px solid transparent", marginBottom: -1 }}
      >
        <SmartSearchIcon color={activeTab === "smart" ? "#310c5f" : PURPLE_LIGHT} size={16} />
        <span
          style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700, fontSize: 14, color: activeTab === "smart" ? "#310c5f" : PURPLE_LIGHT }}
          className="leading-[18px] whitespace-nowrap transition-colors"
        >
          Smart search
        </span>
        <span
          className="h-[18px] flex items-center justify-center px-[6px] py-[4px] rounded-full text-[12px] leading-[15px]"
          style={{
            fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500,
            background: activeTab === "smart" ? "#d1b8fa" : "#e5d7fd",
            color: activeTab === "smart" ? "#1e1e1e" : "#9b63ef",
          }}
        >
          {smartCount}
        </span>
      </button>

      {/* Portals tab */}
      <button
        onClick={() => onTabChange("portals")}
        className="flex items-center gap-[8px] h-[48px] py-[16px] shrink-0 relative"
        style={{ borderBottom: activeTab === "portals" ? "2px solid #3377ff" : "2px solid transparent", marginBottom: -1 }}
      >
        <span
          style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700, fontSize: 14, color: activeTab === "portals" ? "#1e1e1e" : "#646464" }}
          className="leading-[18px] whitespace-nowrap transition-colors"
        >
          Portals
        </span>
        <span
          className="h-[18px] flex items-center justify-center px-[6px] py-[4px] rounded-full text-[12px] leading-[15px]"
          style={{
            fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500,
            background: "#e4e4e4",
            color: activeTab === "portals" ? "#1e1e1e" : "#646464",
          }}
        >
          {portalsCount}
        </span>
      </button>
    </div>
  );
}

// ─── Portals banner ───────────────────────────────────────────────────────────

const PORTALS = [
  { title: "MICHELIN Pilot Sport All-Season 4", count: 80 },
  { title: "Tiny houses", count: 46 },
  { title: "MICHELIN Agilis CrossClimate (Euro...", count: 10 },
];

function PortalsBanner() {
  return (
    <div className="border border-[#e4e4e4] flex flex-col gap-[20px] items-start pl-[24px] pr-px py-[20px] rounded-[8px] w-full shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between pr-[24px] w-full">
        <div className="flex gap-[12px] items-center shrink-0">
          {/* Title + counter */}
          <div className="flex gap-[8px] items-center shrink-0">
            <span style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700 }} className="text-[#1e1e1e] text-[16px] leading-[20px] whitespace-nowrap">Portals</span>
            <span className="bg-[#e4e4e4] px-[6px] py-[4px] rounded-full" style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }}>
              <span className="text-[#1e1e1e] text-[12px] leading-[15px]">8+</span>
            </span>
          </div>
          {/* See all */}
          <button className="flex gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px] hover:bg-[#f8f8f8] transition-colors shrink-0">
            <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">See all</span>
            <ChevronRight size={16} color="#1e1e1e" strokeWidth={1.5} />
          </button>
        </div>
        {/* Nav arrows */}
        <div className="flex gap-[10px] items-start shrink-0">
          <button className="border border-[#e4e4e4] flex items-center justify-center p-[8px] rounded-[4px] hover:border-[#1b55f5] transition-colors">
            <ChevronRight size={16} color="#1e1e1e" strokeWidth={1.5} className="rotate-180" />
          </button>
          <button className="border border-[#e4e4e4] flex items-center justify-center p-[8px] rounded-[4px] hover:border-[#1b55f5] transition-colors">
            <ChevronRight size={16} color="#1e1e1e" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Portal cards */}
      <div className="flex gap-[16px] items-start overflow-hidden w-full">
        {PORTALS.map((p) => (
          <div key={p.title} className="bg-white flex gap-[24px] items-center pl-[8px] pr-[24px] py-[8px] rounded-[4px] shrink-0 w-[416px] cursor-pointer hover:shadow-[0_2px_12px_rgba(30,30,30,0.1)] transition-shadow duration-150">
            {/* Thumbnail */}
            <div className="flex flex-col h-[104px] items-start justify-center shrink-0 w-[160px]">
              <img alt="" className="h-full w-full object-cover rounded-[2px]" src={imgAsset} />
            </div>
            {/* Info */}
            <div className="flex flex-col justify-between flex-1 py-[16px] min-w-0 self-stretch">
              <p style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700 }} className="text-[#1e1e1e] text-[16px] leading-normal overflow-hidden text-ellipsis">{p.title}</p>
              <p style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#949494] text-[14px] leading-normal whitespace-nowrap">{p.count} assets</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Smart search banner (scenario B) ─────────────────────────────────────────

interface SmartSearchBannerProps {
  onSeeAll: () => void;
}

const BANNER_ASSETS = [imgAsset2, imgAsset3, imgAsset4, imgAsset5, imgAsset6, imgAsset];

function SmartSearchBanner({ onSeeAll }: SmartSearchBannerProps) {
  return (
    <div
      className="w-full rounded-[8px] overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(129,61,224,0.15)]"
      style={{ background: "linear-gradient(110.53deg, rgba(252,224,254,0.6) 0.21%, rgba(219,228,253,0.6) 69.27%), white" }}
      onClick={onSeeAll}
    >
      <div className="flex items-center gap-[28px] pl-[12px] pr-[20px] py-[12px]">
        {/* Left: 6 asset thumbnails 126×126px */}
        <div className="flex gap-[8px] items-center shrink-0">
          {BANNER_ASSETS.map((src, i) => (
            <div
              key={i}
              className="rounded-[4px] overflow-hidden shrink-0 transition-transform duration-200 hover:scale-[1.03]"
              style={{ width: 126, height: 126 }}
            >
              <img alt="" src={src} className="w-full h-full object-cover block" />
            </div>
          ))}
        </div>

        {/* Right: text + button */}
        <div className="flex flex-col gap-[20px] flex-1 min-w-0">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <SmartSearchIcon color="#1e1e1e" size={16} />
              <span style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700 }} className="text-[#1e1e1e] text-[16px] leading-[20px] whitespace-nowrap">Smart search results</span>
              <div className="flex items-center gap-[8px] shrink-0">
                <span className="bg-white text-[12px] px-[6px] py-[4px] rounded-full text-[#1e1e1e] leading-[15px]" style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }}>{SMART_COUNT}</span>
                <ChevronRight size={16} color="#1e1e1e" strokeWidth={1.5} />
              </div>
            </div>
            <p style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] leading-[18px] whitespace-nowrap">
              Visual and semantic similarity based search
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSeeAll(); }}
            className="flex items-center gap-[6px] px-[8px] py-[8px] rounded-[4px] self-start transition-colors duration-150 hover:bg-[#f0f0f0]"
            style={{ border: "1px solid #e4e4e4", color: "#1e1e1e", fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }}
          >
            <span className="text-[14px] leading-[18px] whitespace-nowrap">See all results</span>
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sticky smart search card (shown when banner scrolls out of view) ────────

interface StickySmartCardProps {
  query: string;
  onTrySmartSearch: () => void;
}

function StickySmartCard({ query, onTrySmartSearch }: StickySmartCardProps) {
  return (
    <div className="fixed bottom-[24px] right-[16px] sm:right-[40px] lg:right-[80px] z-10 flex gap-[12px] items-center">
      {/* Gradient AI card */}
      <button
        onClick={onTrySmartSearch}
        className="flex flex-col items-start p-[8px] rounded-[4px] shrink-0 hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(30,30,30,0.12)]"
        style={{ backgroundImage: "linear-gradient(108.53deg, rgb(219,228,253) 0.23%, rgb(252,224,254) 100%)" }}
      >
        <div className="flex gap-[12px] items-center shrink-0 w-full">
          <div
            className="flex items-center justify-center rounded-[4px] shrink-0 size-[28px]"
            style={{ backgroundImage: "linear-gradient(92.75deg, rgba(27,85,245,0.16) 0.23%, rgba(247,62,246,0.16) 100%)" }}
          >
            <img src={imgSmartSearchIcon} alt="" className="size-[16px]" />
          </div>
          <div className="flex flex-col items-start py-[4px] shrink-0">
            <div className="flex gap-[8px] items-center">
              <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[12px] leading-[15px] whitespace-nowrap">
                248 AI search results for "{query || "your search"}"
              </span>
              <ChevronRight size={16} color="#1e1e1e" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </button>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-white flex items-center justify-center rounded-full shrink-0 size-[36px] hover:bg-[#f8f8f8] transition-colors"
        style={{ filter: "drop-shadow(-5px 10px 12.5px rgba(30,30,30,0.1))" }}
      >
        <ArrowRight size={20} color="#1e1e1e" strokeWidth={1.5} className="-rotate-90" />
      </button>
    </div>
  );
}

// ─── Asset cards ──────────────────────────────────────────────────────────────

function DigitalTemplateBadge() {
  return (
    <button className="bg-[#1b55f5] flex gap-[6px] items-center min-h-[32px] p-[8px] rounded-[4px] shrink-0">
      <Star size={16} color="white" strokeWidth={1.5} fill="white" />
      <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-white text-[14px] leading-[18px] whitespace-nowrap">Digital template</span>
    </button>
  );
}

interface AssetCardProps { selected: boolean; onToggle: () => void; }

function AssetCard({ selected, onToggle }: AssetCardProps) {
  if (selected) {
    return (
      <div className="border-[3px] border-[#3377ff] relative rounded-[4px] w-full aspect-square overflow-hidden cursor-pointer" onClick={onToggle}>
        <img alt="" className="absolute inset-0 object-cover size-full" src={imgAsset} />
        <div className="absolute inset-0 flex items-start justify-between p-[16px]">
          <div className="bg-[#1b55f5] flex items-center justify-center rounded-full shrink-0 size-[20px]">
            <Check size={12} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex gap-[8px] items-center">
            <Pencil size={16} color="white" strokeWidth={1.5} />
            <Flag size={16} color="white" strokeWidth={1.5} />
            <Copy size={16} color="white" strokeWidth={1.5} />
            <CornerUpRight size={16} color="white" strokeWidth={1.5} />
            <Trash2 size={16} color="white" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="group relative rounded-[4px] w-full aspect-square overflow-hidden cursor-pointer">
      <img alt="" className="absolute inset-0 object-cover size-full" src={imgAsset} />
      <div className="absolute inset-0 flex items-start justify-end p-[16px] group-hover:opacity-0 transition-opacity">
        <StatusDot />
      </div>
      <div className="absolute inset-0 bg-[rgba(30,30,30,0.5)] flex flex-col justify-between p-[16px] rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-[8px] items-start w-full">
          <div className="flex flex-1 gap-[8px] items-center min-w-0">
            <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="border border-white rounded-full shrink-0 size-[20px] hover:bg-white/20 transition-colors" />
            <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-white text-[14px] leading-[18px] truncate">Asset name</span>
          </div>
          <StatusDot />
        </div>
        <div className="flex gap-[8px] items-start w-full">
          <button className="bg-white flex flex-1 gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px]">
            <Plus size={16} color="#1e1e1e" strokeWidth={1.5} />
            <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">Add to</span>
          </button>
          <button className="bg-[#646464] flex items-center justify-center p-[8px] rounded-[4px] shrink-0">
            <Ellipsis size={16} color="white" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface AssetCardDigitalTemplateProps { selected: boolean; onToggle: () => void; }

function AssetCardDigitalTemplate({ selected, onToggle }: AssetCardDigitalTemplateProps) {
  if (selected) {
    return (
      <div className="border-[3px] border-[#3377ff] relative rounded-[4px] w-full aspect-square overflow-hidden cursor-pointer" onClick={onToggle}>
        <img alt="" className="absolute inset-0 object-cover size-full" src={imgAsset} />
        <div className="absolute inset-0 flex flex-col items-start justify-between p-[16px]">
          <div className="flex items-start justify-between w-full">
            <div className="bg-[#1b55f5] flex items-center justify-center rounded-full shrink-0 size-[20px]">
              <Check size={12} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex gap-[8px] items-center">
              <Pencil size={16} color="white" strokeWidth={1.5} />
              <Flag size={16} color="white" strokeWidth={1.5} />
              <Copy size={16} color="white" strokeWidth={1.5} />
              <CornerUpRight size={16} color="white" strokeWidth={1.5} />
              <Trash2 size={16} color="white" strokeWidth={1.5} />
            </div>
          </div>
          <DigitalTemplateBadge />
        </div>
      </div>
    );
  }
  return (
    <div className="group relative rounded-[4px] w-full aspect-square overflow-hidden cursor-pointer">
      <img alt="" className="absolute inset-0 object-cover size-full" src={imgAsset} />
      <div className="absolute inset-0 flex flex-col items-start justify-between p-[16px] group-hover:opacity-0 transition-opacity">
        <div className="flex w-full justify-end"><StatusDot /></div>
        <DigitalTemplateBadge />
      </div>
      <div className="absolute inset-0 bg-[rgba(30,30,30,0.5)] flex flex-col justify-between p-[16px] rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-[8px] items-start w-full">
          <div className="flex flex-1 gap-[8px] items-center min-w-0">
            <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="border border-white rounded-full shrink-0 size-[20px] hover:bg-white/20 transition-colors" />
            <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-white text-[14px] leading-[18px] truncate">Asset name</span>
          </div>
          <StatusDot />
        </div>
        <div className="flex gap-[8px] items-start w-full">
          <button className="bg-white flex flex-1 gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px]">
            <Plus size={16} color="#1e1e1e" strokeWidth={1.5} />
            <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">Add to</span>
          </button>
          <button className="bg-[#646464] flex items-center justify-center p-[8px] rounded-[4px] shrink-0">
            <Ellipsis size={16} color="white" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Floating scenario toolbar ────────────────────────────────────────────────

interface FloatingToolbarProps {
  scenario: Scenario;
  onChange: (s: Scenario) => void;
}

function FloatingScenarioToolbar({ scenario, onChange }: FloatingToolbarProps) {
  const [pos, setPos] = React.useState({ x: 24, y: 0 });
  const [ready, setReady] = React.useState(false);
  const dragging = React.useRef(false);
  const dragStart = React.useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const h = toolbarRef.current?.offsetHeight ?? 180;
    setPos({ x: 24, y: window.innerHeight - h - 24 });
    setReady(true);
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  }

  React.useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current) return;
      const w = toolbarRef.current?.offsetWidth ?? 200;
      const h = toolbarRef.current?.offsetHeight ?? 240;
      setPos({
        x: Math.min(Math.max(0, dragStart.current.px + (e.clientX - dragStart.current.mx)), window.innerWidth - w - 8),
        y: Math.min(Math.max(0, dragStart.current.py + (e.clientY - dragStart.current.my)), window.innerHeight - h - 8),
      });
    }
    function onUp() { dragging.current = false; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  if (!ready) return null;

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#e4e4e4] select-none w-[200px]"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Drag handle */}
      <div
        className="flex items-center gap-[6px] px-[12px] py-[10px] cursor-grab border-b border-[#e4e4e4] rounded-t-[10px] bg-[#f8f8f8]"
        onMouseDown={onMouseDown}
      >
        <GripVertical size={14} color="#949494" strokeWidth={1.5} />
        <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[12px]">
          Demo scenario
        </span>
      </div>

      {/* Options */}
      <div className="p-[8px] flex flex-col gap-[4px]">
        {(Object.entries(SCENARIO_CONFIG) as [Scenario, typeof SCENARIO_CONFIG[Scenario]][]).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full text-left px-[10px] py-[8px] rounded-[6px] transition-colors`}
            style={{ background: scenario === key ? "#f0f4ff" : "transparent" }}
          >
            <div className="flex items-center gap-[6px]">
              <div
                className="size-[8px] rounded-full shrink-0"
                style={{ background: scenario === key ? "#1b55f5" : "#c4c4c4" }}
              />
              <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: scenario === key ? 700 : 500, color: scenario === key ? "#1b55f5" : "#1e1e1e" }} className="text-[13px]">
                {cfg.label}
              </span>
            </div>
            <p style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#949494] text-[11px] pl-[14px] mt-[1px]">
              {cfg.sublabel}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  function Dot() { return <div className="rounded-full bg-[#646464] size-[3px] shrink-0" />; }
  return (
    <div className="flex gap-[8px] h-[99px] items-center justify-center py-[40px] w-full mt-auto">
      <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] whitespace-nowrap">Legal notice</span>
      <Dot />
      <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] whitespace-nowrap">Terms and conditions</span>
      <Dot />
      <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] whitespace-nowrap">Feedback</span>
      <Dot />
      <div className="flex gap-[8px] items-center">
        <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] whitespace-nowrap">Powered by</span>
        <img alt="Wedia" className="h-[12px] w-[64.8px]" src={imgLogoDark} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const EXTRA_CARDS = 23;
const ALL_CLASSIC_IDS = [0, 1, ...Array.from({ length: EXTRA_CARDS }, (_, i) => i + 2)];
const PORTALS_COUNT = 8;

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [scenario, setScenario] = React.useState<Scenario>("zero");
  const [activeTab, setActiveTab] = React.useState<Tab>("smart");
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());
  const [bannerVisible, setBannerVisible] = React.useState(true);
  const [activeFilters, setActiveFilters] = React.useState<{ label: string; value: string }[]>([]);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const bannerRef = React.useRef<HTMLDivElement>(null);

  // Track scroll to collapse tabs
  React.useEffect(() => {
    function onScroll() { setIsScrolled(window.scrollY > 10); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const classicCount = SCENARIO_CONFIG[scenario].classicCount;
  const hasResults = classicCount > 0;
  const displayCount = activeTab === "classic" ? classicCount : activeTab === "portals" ? PORTALS_COUNT : SMART_COUNT;

  // When scenario changes, reset tab
  React.useEffect(() => {
    setSelectedIds(new Set());
    setActiveTab(scenario === "zero" ? "smart" : "classic");
  }, [scenario]);

  // Track smart search banner visibility for sticky card
  React.useEffect(() => {
    if (!bannerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setBannerVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, [activeTab, scenario]);

  function handleSearch() {
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  function toggleCard(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function selectAll() { setSelectedIds(new Set(ALL_CLASSIC_IDS)); }
  function unselectAll() { setSelectedIds(new Set()); }

  function switchToSmartTab() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("smart");
  }

  function handleFilterClick(label: string) {
    setActiveFilters((prev) => {
      const exists = prev.find((f) => f.label === label);
      if (exists) return prev.filter((f) => f.label !== label);
      return [...prev, { label, value: FILTER_VALUES[label] ?? "Value" }];
    });
  }

  function handleRemoveFilter(label: string) {
    setActiveFilters((prev) => prev.filter((f) => f.label !== label));
  }

  function handleClearFilters() {
    setActiveFilters([]);
  }

  // Show sticky card when on classic tab with results and banner is out of view
  const showStickyCard = activeTab === "classic" && hasResults && !bannerVisible;

  return (
    <div className="bg-[#f8f8f8] flex flex-col min-h-screen">
      {/* ── Sticky navigation ── */}
      <Navigation
        query={query}
        resultCount={classicCount + SMART_COUNT}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      {/* ── Sticky section: filter bar + tabs (collapsible) + selection bar ── */}
      <div className="sticky top-[72px] z-10 bg-[#f8f8f8] w-full">
        {/* Filter pills */}
        <div className="px-[16px] sm:px-[40px] lg:px-[80px] pt-[16px]">
          <FilterBar
            activeFilters={activeFilters}
            onFilterClick={handleFilterClick}
            onRemoveFilter={handleRemoveFilter}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Tabs — slide up and disappear when scrolled */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isScrolled ? "0px" : "64px",
            transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="px-[16px] sm:px-[40px] lg:px-[80px]">
            <TabsRow
              activeTab={activeTab}
              onTabChange={setActiveTab}
              classicCount={classicCount}
              smartCount={SMART_COUNT}
              portalsCount={PORTALS_COUNT}
            />
          </div>
        </div>

        {/* Selection / sorting bar — always visible in sticky */}
        <div className="flex items-center justify-between px-[16px] sm:px-[40px] lg:px-[80px] py-[12px] w-full">
          <div className="flex gap-[8px] items-center shrink-0">
            {selectedIds.size > 0 && activeTab !== "portals" ? (
              <>
                <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">
                  {selectedIds.size} asset{selectedIds.size !== 1 ? "s" : ""} selected
                </span>
                <button onClick={unselectAll} className="flex items-center justify-center min-h-[32px] p-[8px] rounded-[4px]">
                  <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1b55f5] text-[14px] leading-[18px] whitespace-nowrap underline">Unselect all</span>
                </button>
                <button onClick={selectAll} className="flex items-center justify-center min-h-[32px] p-[8px] rounded-[4px]">
                  <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1b55f5] text-[14px] leading-[18px] whitespace-nowrap underline">Select all</span>
                </button>
              </>
            ) : (
              <>
                <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">
                  {activeTab === "portals" ? `${displayCount} Portals` : `${displayCount} assets`}
                </span>
                {activeTab !== "portals" && (
                  <button onClick={selectAll} className="flex items-center justify-center min-h-[32px] p-[8px] rounded-[4px]">
                    <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#949494] text-[14px] leading-[18px] whitespace-nowrap">Select all</span>
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex gap-[8px] items-center shrink-0">
            <div className="flex gap-[8px] items-center min-h-[32px] p-[8px] rounded-[4px]">
              <div className="bg-[#c4c4c4] flex items-center p-[2px] rounded-full w-[22px] shrink-0">
                <div className="bg-white rounded-full size-[10px]" />
              </div>
              <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">By relevance</span>
            </div>
            <button className="border border-[#e4e4e4] flex gap-[8px] items-center justify-center p-[8px] rounded-[4px] shrink-0 hover:border-[#1b55f5] transition-colors">
              <div className="flex gap-[4px] items-center">
                <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#646464] text-[14px] leading-[18px] whitespace-nowrap">Sort by:</span>
                <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px] leading-[18px] whitespace-nowrap">Most recent</span>
              </div>
              <ChevronDown size={16} color="#646464" strokeWidth={1.5} />
            </button>
            {activeTab !== "portals" && (
              <>
                <button className="hidden md:flex border border-[#1b55f5] gap-[6px] items-center justify-center min-h-[32px] p-[8px] rounded-[4px] shrink-0">
                  <RectangleHorizontal size={16} color="#1b55f5" strokeWidth={1.5} />
                  <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1b55f5] text-[14px] leading-[18px] whitespace-nowrap">Collapse assets</span>
                </button>
                <div className="hidden sm:flex border border-[#e4e4e4] items-start rounded-[4px] shrink-0">
                  {[AlignJustify, Columns3, Grid2x2, LayoutGrid].map((Icon, i) => (
                    <button key={i} className={`flex items-center justify-center p-[8px] rounded-[4px] ${i === 3 ? "bg-[#1b55f5]" : "hover:bg-[#f8f8f8]"}`}>
                      <Icon size={16} color={i === 3 ? "white" : "#1e1e1e"} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex flex-col gap-[24px] items-start px-[16px] sm:px-[40px] lg:px-[80px] pb-[40px] pt-[0px] w-full">

        {/* ── Classic tab ── */}
        {activeTab === "classic" && (
          <>
            {/* Smart Search banner */}
            <div ref={bannerRef} className="w-full shrink-0">
              <SmartSearchBanner onSeeAll={switchToSmartTab} />
            </div>

            {/* Asset grid — only when there are results */}
            {hasResults && (
              <div className="w-full" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(max(180px, calc((100% - 5 * 16px) / 6)), 1fr))", gap: 16 }}>
                <AssetCard selected={selectedIds.has(0)} onToggle={() => toggleCard(0)} />
                <AssetCardDigitalTemplate selected={selectedIds.has(1)} onToggle={() => toggleCard(1)} />
                {Array.from({ length: Math.min(classicCount - 2, EXTRA_CARDS) }).map((_, i) => (
                  <AssetCard key={i + 2} selected={selectedIds.has(i + 2)} onToggle={() => toggleCard(i + 2)} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Smart Search tab ── */}
        {activeTab === "smart" && (
          <div className="flex flex-col gap-[16px] w-full">
            <div className="w-full" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(max(180px, calc((100% - 5 * 16px) / 6)), 1fr))", gap: 16 }}>
              {Array.from({ length: 19 }).map((_, i) => (
                <AssetCard key={i} selected={false} onToggle={() => {}} />
              ))}
            </div>
            <div className="flex justify-center w-full pt-[8px]">
              <button className="flex items-center gap-[8px] px-[20px] py-[10px] border border-[#e4e4e4] rounded-[4px] hover:border-[#1b55f5] transition-colors">
                <RefreshCw size={16} color="#1e1e1e" strokeWidth={1.5} />
                <span style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#1e1e1e] text-[14px]">Scroll to show more</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Portals tab ── */}
        {activeTab === "portals" && (
          <div className="content-start flex flex-wrap gap-[16px] w-full">
            {Array.from({ length: PORTALS_COUNT }).map((_, i) => (
              <div key={i} className="bg-white flex gap-[24px] items-center pl-[8px] pr-[24px] py-[8px] rounded-[4px] shrink-0 w-[416px] cursor-pointer hover:shadow-[0_2px_12px_rgba(30,30,30,0.1)] transition-shadow duration-150">
                <div className="flex flex-col h-[104px] items-start justify-center shrink-0 w-[160px]">
                  <img alt="" className="h-full w-full object-cover rounded-[2px]" src={imgAsset} />
                </div>
                <div className="flex flex-col justify-between flex-1 py-[16px] min-w-0 self-stretch">
                  <p style={{ fontFamily: "'Satoshi-Bold', sans-serif", fontWeight: 700 }} className="text-[#1e1e1e] text-[16px] leading-normal overflow-hidden text-ellipsis">
                    {PORTALS[i % PORTALS.length].title}
                  </p>
                  <p style={{ fontFamily: "'Satoshi-Medium', sans-serif", fontWeight: 500 }} className="text-[#949494] text-[14px] leading-normal whitespace-nowrap">
                    {PORTALS[i % PORTALS.length].count} assets
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Sticky gradient card — visible once smart search banner is out of view */}
      {showStickyCard && (
        <StickySmartCard query={query} onTrySmartSearch={switchToSmartTab} />
      )}

      {/* Dev scenario switcher */}
      <FloatingScenarioToolbar scenario={scenario} onChange={setScenario} />
    </div>
  );
}
