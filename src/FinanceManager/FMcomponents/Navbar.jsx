import React, { useContext, useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../APIs/Api";
import { WalletContext } from "../Contexts/WalletContext";
import BudgetContext, { Budgetcontext } from "../Contexts/BudgetContext";

const Navbar = () => {
  const navigate = useNavigate();
  // const [Wallet, setWallet] = useState();
  // const [addWalletButton, setAddWalletButton] = useState(true);
  const [Budget, setBudget] = useState(null);
  const [AddBudgetButton, setAddBudgetButton] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const {wallet} = useContext(WalletContext)
  const {getBudget} = useContext(Budgetcontext)

 
  return (
    <div className="w-full px-3 py-2 bg-gray-100 border-b border-gray-200 shrink-0">
      <div className="bg-white shadow-md rounded-xl px-4 py-3 flex justify-end items-center   relative">
        
        <div className="flex items-center gap-3 md:gap-5">

          {/* Wallet */}
          {!wallet ? (
            <button
              onClick={() => navigate("/FMmain/wallet")}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Add Wallet
            </button>
          ) : (
            <div className="flex flex-col items-start cursor-pointer">
              <span className="text-[10px] font-bold text-white uppercase bg-green-500 px-2 py-0.5 rounded-t-sm tracking-wide">
                Wallet
              </span>
              <span className="bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 rounded-b-sm whitespace-nowrap">
                ₹ {wallet ? wallet.total_amount : "—"}
              </span>
            </div>
          )}

          {/* Budget */}
          {!getBudget ? (
            <button
              onClick={() => navigate("/FMmain/wallet")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Add Budget
            </button>
          ) : (
            <div className="flex flex-col items-start cursor-pointer">
              <span className="text-[10px] font-bold text-white uppercase bg-red-500 px-2 py-0.5 rounded-t-sm tracking-wide">
                Budget
              </span>
              <span className="bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 rounded-b-sm whitespace-nowrap">
                ₹ {getBudget ? getBudget.budget : "—"}
              </span>
            </div>
          )}

          {/* Main button — desktop */}
          <button
            onClick={() => navigate("/")}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition"
          >
            Main <LogOut size={16} />
          </button>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-[105%] right-2 w-48 bg-white shadow-xl rounded-xl z-50 p-3">
            <button
              onClick={() => { navigate("/"); setMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition"
            >
              Main <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;