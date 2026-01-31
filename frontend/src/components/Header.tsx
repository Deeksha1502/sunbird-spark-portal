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
import translationIcon from "@/assets/translation_icon.png";
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
        if (href === "/explore") return location.pathname === "/explore";
        return location.pathname.startsWith(href) && href !== "/";
    };

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
                                    ? 'text-[#A85236] font-medium'
                                    : 'text-[#1A1A1A] font-normal hover:text-[#A85236]'
                                    }`}
                            >
                                <span className="flex items-center gap-1">
                                    {link.label}
                                    {link.href === "/explore" && <FiChevronDown className={`w-4 h-4 mt-0.5 ${isActive(link.href) ? 'text-[#A85236]' : 'text-gray-400'}`} />}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-1">
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
                                    <button className="flex items-center gap-1 p-2.5 text-[#A85236] hover:bg-gray-50 rounded-lg transition-colors">
                                        <img src={translationIcon} alt="Language" width={21} height={21} />
                                        <FiChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[150px] bg-white z-50">
                                    {languages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            className={`cursor-pointer hover:bg-gray-50 ${currentCode === lang.code ? 'font-medium text-[#A85236]' : ''
                                                }`}
                                            onClick={() => changeLanguage(lang.code)}
                                        >
                                            {lang.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Login Button */}
                        <Link
                            to="/login"
                            className="bg-[#A85236] hover:bg-[#8B442C] text-white px-6 py-2 rounded-[6px] text-sm font-medium transition-colors"
                        >
                            {t("login")}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[#A85236]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`block text-sm font-medium ${isActive(link.href) ? 'text-[#A85236]' : 'text-gray-600'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr />
                        <Link
                            to="/login"
                            className="block w-full text-center bg-[#A85236] text-white px-4 py-2 rounded-lg text-sm font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("login")}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
