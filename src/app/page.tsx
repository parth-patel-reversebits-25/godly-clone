"use client";

import "./walter.css";
import { Nav } from "@/components/Nav";
import { AnimatedSvg } from "@/components/AnimatedSvg";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Mail, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="ws" id="what">
      <SmoothScroll />
      <Nav />

      <div id="main">
        {/* ===== wrapper 1: hero through step 4, with big winding background line ===== */}
        <div className="wrapper">
          <div className="ilustration-holder">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="ilustration">
                    <AnimatedSvg name="trigger1" scrub />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="hero-section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="text-block">
                    <h1>No Fee Direct Sourcing</h1>
                  </div>
                  <div className="the-image small-media">
                    <AnimatedSvg name="first-img" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-1">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="text-block">
                    <h5>WHAT WE DO</h5>
                    <h2>We Source Products</h2>
                  </div>
                  <div className="the-image small-media">
                    <AnimatedSvg name="second-img" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-2">
            <div className="container">
              <Place col="col-lg-4" block="l-block block-1" tag="FROM" title="New York" svg="third-img" />
              <Place col="col-lg-4 offset-lg-4" block="c-block block-2" tag="TO" title="Cape Town" svg="fourth-img" />
              <Place col="col-lg-4 offset-lg-8" block="r-block block-3" tag="TO" title="Israel" svg="fifth-img" />
              <Place col="col-lg-4 offset-lg-4" block="c-block block-4" tag="TO" title="New Zealand" svg="sixth-img" />
              <Place col="col-lg-4" block="l-block block-5" tag="TO" title="Shanghai" svg="seventh-img" />
            </div>
          </section>

          <section className="section-3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="text-block">
                    <h5>WE GOT YOU COVERED</h5>
                    <h2>We&apos;re with you every step of the way</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Step
            section="section-4"
            id="how"
            col="col-lg-6"
            step="STEP 1"
            title="It Starts with Discovery"
            body="We partner with you to determine your sourcing needs and get your vision charted — down to the details."
            svg="eighth-img"
          />
          <Step
            section="section-5"
            col="col-lg-6 offset-lg-6"
            step="STEP 2"
            title="Next We Explore"
            body="Let us find the best partner for you, with the highest quality products and services, at the most competitive prices."
            svg="nineth-img"
          />
          <Step
            section="section-6"
            col="col-lg-6"
            step="STEP 3"
            title="Presentation"
            body="We facilitate the conversation and information sharing to ensure both parties understand the objectives and deliverables."
            svg="tenth-img"
          />
          <Step
            section="section-7"
            col="col-lg-6 offset-lg-6"
            step="STEP 4"
            title="Distribution"
            body="Navigating the complex world of logistics and customs to ensure timely delivery of your goods."
            svg="eleventh-img"
          />
        </div>

        {/* ===== wrapper 2: why us, contact, form ===== */}
        <div className="wrapper">
          <section className="section-8" id="why">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="text-block">
                    <h5>WHY US</h5>
                    <h2>&ldquo;We&rsquo;re a Match if You&rsquo;re Looking for...&rdquo;</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-9">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="columns">
                    <Why id="expert" svg="first-waypoint" title="Expert Sourcing">
                      <p>
                        Sourcing is a constantly evolving field. As the market and regulations change, sourcing the
                        right products becomes increasingly more difficult. Our analytical approach to worldwide,
                        sustainable sourcing alleviates lack-of-availability and regulatory concerns.
                      </p>
                      <p>
                        We know that providing supply chain services ultimately creates a more efficient workflow for
                        you and your customers. Our positive socio-environmental impacts benefits everyone involved in
                        the lifecycle of the products we source.
                      </p>
                    </Why>
                    <Why id="analytics" svg="second-waypoint" title="Dedicated Analytics">
                      <p>
                        Understanding that our clients are experts in their fields, we offer our research team to
                        provide in-depth financial and data services as an extension to their existing organizations.
                      </p>
                      <p>
                        Whether you are entering a new market, determining price points, or simply needing an outside
                        perspective to bounce an idea off of, our resources are at your disposal.
                      </p>
                    </Why>
                    <Why id="relationships" svg="third-waypoint" title="Worldwide Relationships">
                      <p>
                        Traveling is fun, but meeting people isn&rsquo;t easy! Our clients are able to work within our
                        network of trusted partners in nearly every corner of the world.
                      </p>
                      <p>
                        There is no reason to limit product sourcing; our global perspective allows clients to
                        collaborate with regional, domestic, or international manufacturers.
                      </p>
                    </Why>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="columns">
                    <Why id="team" svg="fourth-waypoint" title="Dedicated Design Team" first>
                      <p>
                        All products tell a story — what is yours saying? Product design is much more than simple
                        regulatory compliance. Ensure your message is delivered by collaborating with our design team to
                        develop a high quality, expertly crafted product image.
                      </p>
                      <p>
                        In-house design allows our clients to quickly adapt their product packaging and imagery without
                        the need of spending additional resources on external professional services. We are as involved
                        as you need — from simple concept Q and A&rsquo;s to turn-key product designs.
                      </p>
                    </Why>

                    <Why id="service" svg="fifth-waypoint" title="Personalized Service">
                      <p>
                        Business is personal. We take the time to learn about each of our clients&rsquo; businesses,
                        their values, and their goals. Partnering with the right manufacturer is vital when creating or
                        sourcing a new product.
                      </p>
                      <p>
                        We don&rsquo;t want any friction between our clients and their partners; this is a core value of
                        our firm. We don&rsquo;t hire account executives &mdash; and we never will.
                      </p>
                    </Why>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-11" id="contact">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="info-block">
                    <div className="svg-holder">
                      <AnimatedSvg name="sixth-waypoint" />
                    </div>
                    <h3>Let&apos;s Talk</h3>
                    <p>
                      Want to learn more?
                      <br />
                      Or maybe you just need someone to talk to.
                      <br />
                      Either way we are here, and on your terms.
                    </p>
                    <p>Call us, text us, or send us a good old fashioned email.</p>
                    <p>
                      <a href="mailto:hello@waltersophia.com">hello@waltersophia.com</a>
                      <span className="info-icon" aria-hidden>
                        <Mail size={20} strokeWidth={2.5} fill="currentColor" />
                      </span>
                    </p>
                    <p>
                      <a href="tel:+17025539399">(702) 553-9399</a>
                      <span className="info-icon" aria-hidden>
                        <Phone size={20} strokeWidth={2.5} fill="currentColor" />
                      </span>
                    </p>
                    <p className="btn-row">
                      <a className="c-btn" href="sms:+17025539399">
                        Text Us
                      </a>
                      <a className="c-btn" href="tel:+17025539399">
                        Call Us
                      </a>
                      <a className="c-btn" href="mailto:hello@waltersophia.com">
                        Email Us
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-10">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="form-block">
                    <h3>Looking for the easy way out?</h3>
                    <p>
                      You can use this form and we will get back to you faster
                      <br />
                      then you can say cowabunga
                    </p>
                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                      <div className="form-holder">
                        <div className="input-holder half">
                          <label>First Name</label>
                          <input type="text" name="first-name" required />
                        </div>
                        <div className="input-holder half">
                          <label>Last Name</label>
                          <input type="text" name="last-name" required />
                        </div>
                        <div className="input-holder half">
                          <label>Phone</label>
                          <input type="tel" name="phone" />
                        </div>
                        <div className="input-holder half">
                          <label>Email</label>
                          <input type="email" name="the-email" required />
                        </div>
                        <div className="input-holder">
                          <label>Message</label>
                          <textarea name="the-message" required />
                        </div>
                        <div className="input-holder">
                          <input type="submit" value="submit" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="logo-holder">
                  <a href="#what">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-0.svg" alt="Walter Sophia" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Place({ col, block, tag, title, svg }: { col: string; block: string; tag: string; title: string; svg: string }) {
  return (
    <div className="row">
      <div className={col}>
        <div className={`text-block ${block}`}>
          <h5>{tag}</h5>
          <h2>{title}</h2>
        </div>
        <div className="the-image small-media">
          <AnimatedSvg name={svg} />
        </div>
      </div>
    </div>
  );
}

function Step({
  section,
  id,
  col,
  step,
  title,
  body,
  svg,
}: {
  section: string;
  id?: string;
  col: string;
  step: string;
  title: string;
  body: string;
  svg: string;
}) {
  return (
    <section className={section} id={id}>
      <div className="container">
        <div className="row">
          <div className={col}>
            <div className="text-block">
              <h5>{step}</h5>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
            <div className="the-image small-media">
              <AnimatedSvg name={svg} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why({
  id,
  svg,
  title,
  first,
  children,
}: {
  id: string;
  svg: string;
  title: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`column-block${first ? " first-block" : ""}`} id={id}>
      <div className="svg-holder">
        <AnimatedSvg name={svg} />
      </div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
