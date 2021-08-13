import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdMenu } from "react-icons/md";
import MobileNavMenu from "./mobile-nav-menu";
import ButtonLink from "./button-link";
import NextImage from "./image";
import CustomLink from "./custom-link";
import LocaleSwitch from "../locale-switch";
import { getButtonAppearance } from "utils/button";

interface typesNavbar {
    navbar :{
        logo: string;
        links: (string | number)[];
        button: {
            id: number;
            url: string;
            text: string;
            newTab: boolean;
            type: string;
        };
    };
    pageContext: {
        localizedPaths: string;
    };
}

const Navbar : React.FC<typesNavbar> = ({ navbar, pageContext }) => {
    const router = useRouter();
    const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

    return (
        <>
            {/* The actual navbar */}
            <nav className="py-6 border-b-2 border-gray-200 sm:py-2">
                <div className="container flex flex-row items-center justify-between">
                    {/* Content aligned to the left */}
                    <div className="flex flex-row items-center">
                        <Link href="/">
                            <a className="w-32 h-8">
                                <NextImage
                                    width="120"
                                    height="33"
                                    media={navbar.logo}
                                />
                            </a>
                        </Link>
                        {/* List of links on desktop */}
                        <ul className="flex-row items-baseline hidden gap-4 ml-10 list-none md:flex">
                            {navbar.links.map((navLink : any) => (
                                <li key={navLink.id}>
                                    <CustomLink
                                        link={navLink}
                                        // locale={router.locale}
                                    >
                                        <div className="px-2 py-1 hover:text-gray-900">
                                            {navLink.text}
                                        </div>
                                    </CustomLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex">
                        {/* Locale Switch Mobile */}
                        {pageContext.localizedPaths && (
                            <div className="md:hidden">
                                <LocaleSwitch pageContext={pageContext} />
                            </div>
                        )}
                        {/* Hamburger menu on mobile */}
                        <button
                            onClick={() => setMobileMenuIsShown(true)}
                            className="block p-1 md:hidden"
                        >
                            <MdMenu className="w-auto h-8" />
                        </button>
                        {/* CTA button on desktop */}
                        {navbar.button && (
                            <div className="hidden md:block">
                                <ButtonLink
                                    button={navbar.button}
                                    appearance={getButtonAppearance(
                                        navbar.button.type,
                                        "light",
                                    )}
                                    compact
                                />
                            </div>
                        )}
                        {/* Locale Switch Desktop */}
                        {pageContext.localizedPaths && (
                            <div className="hidden md:block">
                                <LocaleSwitch pageContext={pageContext} />
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile navigation menu panel */}
            {mobileMenuIsShown && (
                <MobileNavMenu
                    navbar={navbar}
                    closeSelf={() => setMobileMenuIsShown(false)}
                />
            )}
        </>
    );
};

export default Navbar;