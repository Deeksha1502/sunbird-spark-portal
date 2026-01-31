import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import sunbirdLogo from "@/assets/sunbird-logo.png";
import { Link, useLocation } from "react-router-dom";
import { useAppI18n, type LanguageCode } from "@/hooks/useAppI18n";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { t, languages, currentCode, changeLanguage } = useAppI18n();

    const navLinks = [
        { label: t("nav.home"), href: "/" },
        { label: t("nav.explore"), href: "/explore" },
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.contact"), href: "#contact" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return location.pathname === "/";
        return false;
    };

    // Language icon - Translation icon matching the design
    const LanguageIcon = () => (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#222222]">
            <path d="M5 8L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 8C6 10 7.5 12.5 10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 8C10 10 8.5 12.5 6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 17L16 12L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5 16H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    // Filled Bell Icon with notification dot
    const BellFilledIcon = () => (
        <div className="relative">
            <svg width="21" height="21.34" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.97 2 6.5 4.47 6.5 7.5V11.5L5.17 13.4C4.78 13.96 5.18 14.75 5.88 14.75H18.12C18.82 14.75 19.22 13.96 18.83 13.4L17.5 11.5V7.5C17.5 4.47 15.03 2 12 2Z" />
                <path d="M12 22C13.38 22 14.5 20.88 14.5 19.5H9.5C9.5 20.88 10.62 22 12 22Z" />
            </svg>
            {/* Green notification dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-white"></span>
        </div>
    );

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={sunbirdLogo}
                            alt="Sunbird"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`text-[15px] transition-colors ${isActive(link.href)
                                    ? 'text-[#B94A2C] font-medium'
                                    : 'text-[#1A1A1A] font-normal hover:text-[#B94A2C]'
                                    }`}
                            >
                                <span className="flex items-center gap-1">
                                    {link.label}
                                    {link.href === "/explore" && <FiChevronDown className="w-4 h-4 mt-0.5 text-[#A85236]" />}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-1">
                        {/* Search */}
                        <button className="p-2.5 text-[#A85236] hover:bg-gray-50 rounded-lg transition-colors">
                            <FiSearch className="w-[18px] h-[18px]" style={{ strokeWidth: 2 }} />
                        </button>

                        {/* Notifications - Filled Bell */}
                        <button className="p-2.5 text-[#A85236] hover:bg-gray-50 rounded-lg transition-colors">
                            <BellFilledIcon />
                        </button>

                        {/* Language Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-0.5 p-2.5 text-[#A85236] hover:bg-gray-50 rounded-lg transition-colors">
                                    <LanguageIcon />
                                    <FiChevronDown className="w-3.5 h-3.5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg z-50">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code as LanguageCode)}
                                        className={`hover:bg-gray-50 cursor-pointer ${currentCode === lang.code ? 'bg-gray-50' : ''}`}
                                    >
                                        <span>{lang.label}</span>
                                        <span className="text-gray-400 text-xs ml-2">({lang.code.toUpperCase()})</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Login Button */}
                        <Link to="/auth" className="ml-2">
                            <Button
                                size="sm"
                                className="text-white font-medium rounded-md bg-[#A85236] hover:bg-[#8f462e] p-0 flex items-center justify-center text-[10px]"
                                style={{ width: '44px', height: '16px' }}
                            >
                                {t("button.login")}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button className="p-2 text-[#A85236]">
                            <FiSearch className="w-5 h-5" />
                        </button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[#1A1A1A]"
                        >
                            {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden pb-4 animate-fade-in border-t border-gray-100">
                        <div className="flex flex-col gap-1 pt-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`px-4 py-3 rounded-lg text-[15px] transition-colors ${isActive(link.href)
                                        ? 'text-[#A85236] font-medium bg-orange-50'
                                        : 'text-[#1A1A1A] font-normal hover:text-[#A85236] hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-4 px-4">
                                <Link to="/auth" className="block">
                                    <Button
                                        className="w-full rounded-full bg-[#A85236] hover:bg-[#8f462e]"
                                    >
                                        {t("button.login")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
