"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SelectOption = {
  value: string;
  label: string;
};

type SelectMenuProps = {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
};

export function SelectMenu({
  id,
  name,
  value,
  options,
  placeholder = "—",
  invalid,
  describedBy,
  onChange,
}: SelectMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-describedby={describedBy}
        className={cn(
          "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border bg-slate-50 px-4 text-right font-bold outline-none transition",
          open || invalid ? "border-brand bg-white ring-4 ring-brand/15" : "border-slate-200",
          invalid ? "border-red-400" : "",
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={selected ? "text-foreground" : "text-slate-400"}>
          {selected?.label ?? placeholder}
        </span>
        <span aria-hidden className="text-slate-400">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={cn(
                    "flex min-h-11 w-full items-center px-4 text-right text-sm font-bold",
                    isActive ? "bg-brand-soft text-brand" : "text-slate-800 hover:bg-slate-50",
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
