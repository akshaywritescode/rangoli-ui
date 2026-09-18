"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface CountrySelectProps {
  value?: Country | null;
  onChange?: (country: Country | null) => void;
  placeholder?: string;
  theme?: "light" | "dark";
  className?: string;
  scale?: number;
}

const countries: Country[] = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Norway", code: "NO", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", flag: "🇩🇰" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Poland", code: "PL", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },
  { name: "Greece", code: "GR", flag: "🇬🇷" },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", flag: "🇦🇷" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Turkey", code: "TR", flag: "🇹🇷" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
];

export default function CountrySelect({
  value,
  onChange,
  placeholder = "Select a country",
  theme = "dark",
  className = "",
  scale = 1,
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(value || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    onChange?.(country);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCountry(null);
    onChange?.(null);
    setSearchQuery("");
  };

  // Theme-based colors
  const bgColor = theme === "light" ? "bg-white" : "bg-zinc-900";
  const textColor = theme === "light" ? "text-zinc-900" : "text-white";
  const borderColor = theme === "light" ? "border-zinc-300" : "border-white/20";
  const hoverBg = theme === "light" ? "hover:bg-zinc-50" : "hover:bg-white/5";
  const selectedBg = theme === "light" ? "bg-zinc-100" : "bg-white/10";
  const placeholderColor = theme === "light" ? "text-zinc-400" : "text-zinc-500";
  const dropdownBg = theme === "light" ? "bg-white" : "bg-zinc-900";
  const dropdownBorder = theme === "light" ? "border-zinc-200" : "border-white/10";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full max-w-sm ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      {/* Main Input */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center gap-3 ${bgColor} ${textColor} border ${borderColor} rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${
          isOpen ? "ring-2 ring-pink-500/50" : ""
        }`}
      >
        {selectedCountry ? (
          <>
            <span className="text-2xl">{selectedCountry.flag}</span>
            <span className="flex-1 text-sm font-medium">{selectedCountry.name}</span>
            <button
              onClick={handleClear}
              className={`p-1 rounded-md ${hoverBg} transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <Search className="w-4 h-4 opacity-50" />
            <span className={`flex-1 text-sm ${placeholderColor}`}>{placeholder}</span>
            <ChevronDown
              className={`w-4 h-4 opacity-50 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-2 ${dropdownBg} border ${dropdownBorder} rounded-xl shadow-2xl overflow-hidden`}
        >
          {/* Search Input */}
          <div className={`p-3 border-b ${dropdownBorder}`}>
            <div className={`relative flex items-center gap-2 ${bgColor} border ${borderColor} rounded-lg px-3 py-2`}>
              <Search className="w-4 h-4 opacity-50" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className={`flex-1 bg-transparent outline-none text-sm ${textColor} placeholder:${placeholderColor}`}
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedCountry?.code === country.code ? selectedBg : hoverBg
                  }`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${textColor}`}>{country.name}</div>
                    <div className={`text-xs ${placeholderColor}`}>{country.code}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className={`px-4 py-8 text-center ${placeholderColor} text-sm`}>
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
