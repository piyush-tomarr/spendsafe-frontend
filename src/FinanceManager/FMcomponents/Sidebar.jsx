import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { House, HandCoins, Wallet, ChartNoAxesCombined } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const btnss = [
  { name: "Home",     icon: <House size={22} />,               color: "blue"  },
  { name: "Expances", icon: <HandCoins size={22} />,           color: "red"   },
  { name: "Wallet",   icon: <Wallet size={22} />,              color: "green" },
  { name: "Stats",    icon: <ChartNoAxesCombined size={22} />, color: "blue"  },
];

const Routes = {
  Home:     "/FMmain/home",
  Expances: "/FMmain/expances",
  Wallet:   "/FMmain/wallet",
  Stats:    "/FMmain/stats",
};

const colorMap = {
  blue: {
    active:   "bg-blue-600 text-white shadow-md shadow-blue-300 border border-blue-700",
    inactive: "text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-400",
  },
  red: {
    active:   "bg-red-500 text-white shadow-md shadow-red-300 border border-red-600",
    inactive: "text-red-600 bg-white border border-red-200 hover:bg-red-50 hover:border-red-400",
  },
  green: {
    active:   "bg-green-600 text-white shadow-md shadow-green-300 border border-green-700",
    inactive: "text-green-700 bg-white border border-green-200 hover:bg-green-50 hover:border-green-400",
  },
};

const Sidebar = () => {
  const [openSidebar, setopenSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active index from current URL — survives refresh automatically
  const activeIndex = btnss.findIndex(
    (btn) => Routes[btn.name] === location.pathname
  );
  const active = activeIndex === -1 ? 0 : activeIndex;

  const handleNav = (name) => {
    navigate(Routes[name]);
  };

  const NavButtons = ({ onAfterClick }) => (
    <nav className="flex flex-col gap-3 px-4 py-5 flex-1">
      {btnss.map((btn, i) => {
        const c = colorMap[btn.color];
        const isActive = active === i;
        return (
          <button
            key={i}
            onClick={() => { handleNav(btn.name); onAfterClick?.(); }}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-base transition-all duration-200 w-full
              ${isActive ? c.active : c.inactive}`}
          >
            {btn.icon}
            {btn.name}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:flex h-screen w-[230px] flex-col bg-gray-50 border-r border-gray-200 shadow-xl">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="ml-2 font-bold text-gray-800 tracking-tight text-lg font-playwrite">SpendSafe</span>
          </div>
        </div>

        <NavButtons />

        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 font-medium">v1.0.0</p>
        </div>
      </div>

      {/* ── Mobile Toggle ── */}
      <div className="md:hidden absolute top-22 left-0 z-50">
        <button
          onClick={() => setopenSidebar(!openSidebar)}
          className="w-8 h-10 bg-white border border-gray-200 shadow-md rounded-r-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
        >
          {openSidebar ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {openSidebar && (
        <div className="md:hidden absolute top-[80px] left-0 z-40 w-[65%] h-[85vh] bg-gray-50 shadow-2xl rounded-r-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex h-1.5 w-full">
            <div className="flex-1 bg-red-500" />
            <div className="flex-1 bg-green-500" />
            <div className="flex-1 bg-blue-600" />
          </div>
          <NavButtons onAfterClick={() => setopenSidebar(false)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;