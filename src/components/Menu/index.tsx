'use client'
import { useState } from "react";
import SideBar from "../SideBar";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-lg font-bold">Pedra Hub</h1>
        <button
          className="p-2 bg-white text-blue-600 rounded"
          onClick={() => setOpen(true)}
        >
          ☰ Menu
        </button>
      </header>

      <SideBar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
