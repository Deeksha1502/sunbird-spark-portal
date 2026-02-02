import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiChevronDown, FiBell } from "react-icons/fi";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import sunbirdLogo from "@/assets/sunbird-logo.png";
import translationIcon from "@/assets/translation_icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppI18n, type LanguageCode } from "@/hooks/useAppI18n";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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



  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 pr-[56px] pl-[13px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[72px] pl-[60px]">
          {/* Logo */}
          <Link to="/" className="flex items-center md:pl-[30px]">
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
                  {link.href === "/explore" && <FiChevronDown className={`w-4 h-4 pl-[5px] mt-[3px] ${isActive(link.href) ? 'text-[#A85236]' : 'text-gray-400'}`} />}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {/* Search */}
              <button className="p-2.5 text-[#A85236] hover:bg-gray-50 rounded-lg transition-colors" onClick={() => { navigate("/search") }}>
                <FiSearch className="w-[18px] h-[18px]" style={{ strokeWidth: 2 }} />
              </button>

              {/* Notifications - Filled Bell */}
              <button className="p-2.5 text-[#A85236] hover:bg-gray-50 rounded-lg transition-colors">
                <FiBell className="w-[21px] h-[21px]" fill="#A85236" />
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
            <Button
              onClick={() => window.location.href = "/home"}
              className="block w-full text-center bg-[#A85236] text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {t("login")}
            </Button>
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
            <Button
              onClick={() => window.location.href = "/home"}
              className="block w-full text-center bg-[#A85236] text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {t("login")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
