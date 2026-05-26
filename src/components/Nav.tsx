"use client";

import { useState } from "react";

const SUB = [
  { href: "#expert", label: "Expert Sourcing" },
  { href: "#team", label: "Dedicated Design Team" },
  { href: "#analytics", label: "Dedicated Analytics" },
  { href: "#service", label: "Personalized Service" },
  { href: "#relationships", label: "Worldwide Relationships" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div id="Sidenav" className={`sidenav${open ? " open" : ""}`}>
        <button className="closebtn" onClick={close} aria-label="Close menu">
          ×
        </button>
        <div className="logo-holder">
          <a href="#what" onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-0.svg" alt="Walter Sophia" />
          </a>
        </div>
        <ul className="side-menu">
          <li>
            <a href="#what" onClick={close}>
              What we do
            </a>
          </li>
          <li>
            <a href="#how" onClick={close}>
              How it works
            </a>
          </li>
          <li>
            <a href="#why" onClick={close}>
              Why us
            </a>
            <ul className="sub-menu">
              {SUB.map((s) => (
                <li key={s.href}>
                  <a href={s.href} onClick={close}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="#contact" onClick={close}>
              Contact us
            </a>
          </li>
        </ul>
      </div>

      <header>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="nav-holder">
                <div className="logo-holder">
                  <a href="#what">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-0.svg" alt="Walter Sophia" />
                  </a>
                </div>
                <button className="phone-menu" onClick={() => setOpen(true)} aria-label="Open menu">
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
