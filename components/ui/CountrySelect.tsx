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
        if (!selectedCountry) {
          setSearchQuery("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCountry]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setSearchQuery(country.name);
    onChange?.(country);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCountry(null);
    setSearchQuery("");
    onChange?.(null);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(true);
    if (value === "") {
      setSelectedCountry(null);
      onChange?.(null);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
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
      className={`relative inline-block w-full max-w-xs ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      {/* Main Input */}
      <div
        className={`relative flex items-center gap-3 ${bgColor} ${textColor} border ${borderColor} rounded-xl px-4 py-3 transition-all duration-200 ${
          isOpen ? "ring-2 ring-pink-500/50" : ""
        }`}
      >
        {selectedCountry && (
          <span className="text-2xl">{selectedCountry.flag}</span>
        )}
        {!selectedCountry && (
          <Search className="w-4 h-4 opacity-50" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none text-sm font-medium ${textColor} placeholder:${placeholderColor}`}
        />
        {selectedCountry && searchQuery && (
          <button
            onClick={handleClear}
            className={`p-1 rounded-md ${hoverBg} transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {!selectedCountry && (
          <ChevronDown
            className={`w-4 h-4 opacity-50 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filteredCountries.length > 0 && (
        <div
          className={`absolute z-50 w-full mt-2 ${dropdownBg} border ${dropdownBorder} rounded-xl shadow-2xl overflow-hidden`}
        >
          {/* Countries List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.map((country) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
