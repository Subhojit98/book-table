"use client"
import { useContext } from "react";
import Confirmation from "./components/Confirmation";
import ReservationCard from "./components/ReservationCard";
import SlotPicker from "./components/SlotPicker";
import { AppContext } from "./context/ContextProvider";

export default function Home() {

  const context = useContext(AppContext)

  if (!context) {
    throw new Error('AppContext is not provided.')
  }
  const { currentPage } = context

  return (
    <main className="w-full h-screen flex justify-center items-center bg-resturantBg bg-cover bg-center">
      <div className="w-[95vw] h-[70vh] sm:w-[60vw] xl:w-[30vw] lg:h-[75vh] bg-neutral-600 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 relative">
        <span className="text-xl text-white absolute top-4 right-10 font-semibold">{currentPage}/3</span>

        <div className="w-16 h-16 rounded-full border-4 border-white p-2 bg-yellow-400 m-auto mt-2">
          <svg viewBox="0 0 72 72" id="emoji" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="line-supplement"> <line x1="45.6863" x2="53.668" y1="20.0657" y2="20.0657" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line> <line x1="18.0445" x2="37.0861" y1="20.0657" y2="20.0657" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line> </g> <g id="color"> <polygon fill="#B1CC33" points="17.0606,19 23.5,27.4999 36,43.9999 48.5,27.4999 54.9394,19"></polygon> <polygon fill="#5C9E31" points="44.9394,19 38.5,27.4999 31,37.4 36,43.9999 48.5,27.4999 54.9394,19"></polygon> </g> <g id="hair"></g> <g id="skin"></g> <g id="skin-shadow"></g> <g id="line"> <line x1="36" x2="36" y1="44" y2="67" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line> <line x1="20" x2="52" y1="67" y2="67" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line> <polyline fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" points="61,11 48.5,27.5 36,44 23.5,27.5 11.2385,11.3149"></polyline> <line x1="11.2385" x2="11" y1="11.3149" y2="11" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line> <line x1="39" x2="55" y1="23" y2="4" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line> <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M52.451,4"></path> </g> </g></svg>
        </div>
        {currentPage == 1 && <ReservationCard />}
        {currentPage == 2 && <SlotPicker />}
        {currentPage == 3 && <Confirmation />}
      </div>
    </main>
  )
}
