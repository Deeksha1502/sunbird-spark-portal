import sunbirdFooterLogo from "@/assets/sunbird-footer-logo.png";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";

const Footer = () => {
  const { t } = useAppI18n();

  const productLinks = [
    { label: t("courses"), href: "/explore" },
    { label: t("footer.resources"), href: "#" },
    { label: t("footer.videos"), href: "#" },
  ];

  const companyLinks = [
    { label: t("about"), href: "#about" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <footer style={{ backgroundColor: '#1A1A1A', fontFamily: 'Rubik, sans-serif' }}>
      <div className="container mx-auto px-4 py-12 pl-[80px] pr-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Logo */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={sunbirdFooterLogo}
                alt="Sunbird"
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {/* Links - Right aligned */}
          <div className="flex gap-20 md:gap-28">
            {/* Products */}
            <div>
              <h4 className="font-semibold text-[14px] mb-4 text-white">
                {t("footer.products")}
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-[14px] mb-4 text-white">
                {t("footer.company")}
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Darker strip */}
      <div style={{ backgroundColor: '#141414' }}>
        <div className="container mx-auto px-4 py-4 pr-[100px]">
          <div className="flex flex-col md:flex-row items-center justify-end gap-6 text-[13px]">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              style={{ color: '#B94A2C' }}
            >
              {t("footer.terms")}
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              style={{ color: '#B94A2C' }}
            >
              {t("footer.privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
