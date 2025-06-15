"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  PromptIcon,
  SettingsIcon,
  EyeIcon,
  FileIcon,
  FolderIcon,
  DocsIcon,
} from "../icons/index";
import { HomeIcon } from "./icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { 
    name: string; 
    path: string; 
    pro?: boolean; 
    new?: boolean;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  }[];
};

const WorkflowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3H18V7H6V3ZM6 17H18V21H6V17ZM2 10H22V14H2V10Z" fill="currentColor"/>
  </svg>
);

const IntegrationsIcon = () => (
  <svg width="36" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="9" r="5" fill="none"/>
      <circle cx="29" cy="9" r="5" fill="none"/>
      <path d="M12 9h7m0 0l-3-3m3 3l-3 3m7-3h4" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

const LMSIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="currentColor"/>
    <path d="M5 13.18V17.18C5 19.84 8.24 22 12 22C15.76 22 19 19.84 19 17.18V13.18L12 17L5 13.18Z" fill="currentColor"/>
  </svg>
);

const LegalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L20 8V21H4V8L12 3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M9 12H15M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FinanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const DevToolsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M21 12C21 16.97 16.97 21 12 21S3 16.97 3 12S7.03 3 12 3S21 7.03 21 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 12L10 10M16 10L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const RealEstateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M9 12H15V18H9V12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M9 12V9H15V12" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const navItems: NavItem[] = [
  {
    icon: <HomeIcon />,
    name: "Home",
    path: "/",
  },
  {
    icon: <EyeIcon />,
    name: "Deep Focus",
    path: "/focus",
  },
  {
    name: "AdoraLink",
    icon: <PlugInIcon />,
    path: "/adoralink",
  },
  {
    icon: <PromptIcon />,
    name: "Prompt",
    subItems: [
      { name: "Focused Chat", path: "/prompt/chat", pro: false },
      { name: "Synthesize", path: "/prompt/multi-chat", pro: false },
      { name: "Create Prompt", path: "/prompt/create", pro: false },
      { name: "My Prompts", path: "/prompt/list", pro: false },
      { name: "Prompt Library", path: "/prompt/library", pro: false },
    ],
  },

  {
    name: "Workflow",
    icon: <WorkflowIcon />,
    path: "/workflow",
  },
  {
    name: "Integrations",
    icon: <IntegrationsIcon />,
    path: "/integrations",
  },
  {
    icon: <GridIcon />,
    name: "Dashboard System",
    path: "/dashboard",
  },
  {
    name: "LMS",
    icon: <LMSIcon />,
    path: "/lms",
  },
  {
    icon: <UserCircleIcon />,
    name: "CRM",
    path: "/crm",
  },
  {
    name: "Living Docs",
    icon: <FolderIcon />,
    path: "/living-docs",
    subItems: [
      { name: "My Drive", path: "/living-docs/my-drive" },
      { name: "Living Docs", path: "/living-docs/living-docs" },
      { name: "DataRain", path: "/living-docs/data-rain" },
      { name: "Storytelling", path: "/living-docs/storytelling" },
      { name: "Whiteboard", path: "/living-docs/whiteboard" },
    ],
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

const dashboardExampleItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Dashboard Examples",
    subItems: [
      { name: "Projections", path: "/projections", pro: false },
      { name: "KPI's", path: "/kpi", pro: false },
      { name: "Stocks", path: "/stocks", pro: false },
      { name: "SaaS", path: "/saas", pro: false },
    ],
  },
];

const useCaseItems: NavItem[] = [
  {
    icon: <BoxCubeIcon />,
    name: "Use Cases",
    subItems: [
      { name: "Marketing", path: "/marketing", pro: false },
      { name: "Legal", path: "/legal", pro: false },
      { name: "Finance", path: "/finance", pro: false },
      { name: "Dev Tools", path: "/dev-tools", pro: false },
      { name: "Real Estate", path: "/real-estate", pro: false },
      { name: "Investor", path: "/investor", pro: false },
      { name: "Startup", path: "/startup", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <BoxCubeIcon />,
    name: "Customize",
    subItems: [
      { 
        name: "Charts", 
        path: "/charts",
        subItems: [
          { name: "Line Chart", path: "/line-chart", pro: false },
          { name: "Bar Chart", path: "/bar-chart", pro: false },
        ],
        pro: false 
      },
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
      { 
        name: "Authentication", 
        path: "/auth",
        subItems: [
          { name: "Sign In", path: "/auth/signin", pro: false },
          { name: "Sign Up", path: "/auth/signup", pro: false },
        ],
        pro: false 
      },
      { 
        name: "Forms", 
        path: "/form-elements",
        pro: false 
      },
      { 
        name: "Tables", 
        path: "/basic-tables",
        pro: false 
      },
      { 
        name: "Pages",
        path: "/pages",
        subItems: [
          { name: "Blank Page", path: "/blank", pro: false },
          { name: "404 Error", path: "/error-404", pro: false },
        ],
        pro: false 
      },
    ],
  },
];

const companyItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Company",
    subItems: [
      { name: "About Adora AI", path: "/company/about", pro: false },
      { name: "Investors", path: "/company/investors", pro: false },
      { name: "Press", path: "/company/press", pro: false },
      { name: "Knowledge Base", path: "/company/knowledge-base", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others" | "company" | "usecases" | "dashboards"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                >
                  <ChevronDownIcon />
                </span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    {subItem.subItems ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => handleSubmenuToggle(index, menuType)}
                          className={`menu-dropdown-item w-full text-left ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                          <span className="flex items-center gap-1 ml-auto">
                            {subItem.new && (
                              <span className="menu-dropdown-badge">new</span>
                            )}
                            {subItem.pro && (
                              <span className="menu-dropdown-badge">pro</span>
                            )}
                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                          </span>
                        </button>
                        {subItem.subItems && (
                          <ul className="ml-4 space-y-1">
                            {subItem.subItems.map((nestedItem) => (
                              <li key={nestedItem.name}>
                                <Link
                                  href={nestedItem.path}
                                  className={`menu-dropdown-item ${
                                    isActive(nestedItem.path)
                                      ? "menu-dropdown-item-active"
                                      : "menu-dropdown-item-inactive"
                                  }`}
                                >
                                  {nestedItem.name}
                                  <span className="flex items-center gap-1 ml-auto">
                                    {nestedItem.new && (
                                      <span className="menu-dropdown-badge">new</span>
                                    )}
                                    {nestedItem.pro && (
                                      <span className="menu-dropdown-badge">pro</span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span className="menu-dropdown-badge">new</span>
                          )}
                          {subItem.pro && (
                            <span className="menu-dropdown-badge">pro</span>
                          )}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others" | "company" | "usecases" | "dashboards";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others", "company", "usecases", "dashboards"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : menuType === "others" ? othersItems : menuType === "company" ? companyItems : menuType === "usecases" ? useCaseItems : dashboardExampleItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          // Check both direct subItems and nested subItems
          const hasMatch = nav.subItems.some(subItem => {
            if (isActive(subItem.path)) return true;
            if (subItem.subItems) {
              return subItem.subItems.some(nestedItem => isActive(nestedItem.path));
            }
            return false;
          });

          if (hasMatch) {
            setOpenSubmenu({
              type: menuType as "main" | "others" | "company" | "usecases" | "dashboards",
              index,
            });
            submenuMatched = true;
          }
        }
      });
    });

    // Only close the submenu if no match was found at any level
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others" | "company" | "usecases" | "dashboards") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-16 flex items-start mt-3 lg:mt-4 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
              <Image
                className="dark:hidden w-10 h-10 lg:w-11 lg:h-11"
                src="/images/logo/adora-ai-logo.png"
                alt="Adora AI Logo"
                width={40}
                height={40}
              />
              <Image
                className="hidden dark:block w-10 h-10 lg:w-11 lg:h-11"
                src="/images/logo/adora-ai-logo.png"
                alt="Adora AI Logo"
                width={40}
                height={40}
              />
              <Image
                className="dark:hidden h-8 w-auto"
                src="/images/logo/adora-ai-dark-grey-logo.png"
                alt="Adora AI Wordmark"
                width={160}
                height={28}
                style={{ objectFit: 'contain' }}
              />
              <Image
                className="hidden dark:block h-8 w-auto"
                src="/images/logo/adora-ai-white-logo.png"
                alt="Adora AI Wordmark"
                width={160}
                height={28}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <Image
              className="w-10 h-10 lg:w-11 lg:h-11"
              src="/images/logo/adora-ai-logo.png"
              alt="Adora AI Logo"
              width={44}
              height={44}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-[40px]">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`hidden mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Dashboard Examples"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(dashboardExampleItems, "dashboards")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Use Cases"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(useCaseItems, "usecases")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Customize"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Company"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(companyItems, "company")}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
