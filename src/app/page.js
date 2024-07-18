"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Overview } from "@/components/overview";
import { Footer } from "@/components/footer";
import { Content } from "@/components/content";
import { Contact } from "@/components/contact";
import { About } from "@/components/about";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // return (
  //   <Router>
  //   <div className="flex flex-col min-h-screen">
  //     <Navbar setSearchTerm={setSearchTerm} />
  //     <main className="flex-1 container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
  //     <Switch>
  //           <Route exact path="/">
  //             <Content searchTerm={searchTerm} />
  //             <div className="space-y-8">
  //               <Overview />
  //             </div>
  //           </Route>
  //           <Route path="/contact">
  //             <Contact />
  //           </Route>
  //           <Route path="/about">
  //              <About />
  //           </Route>
  //         </Switch>
  //     </main>
  //     <Footer />
  //   </div>
  //   </Router>
  // );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        <Content searchTerm={searchTerm} />
        <div className="space-y-8">
          <Overview />
        </div>
        <Contact path="/contact" />
        <About path="about"/>
      </main>
      <Footer />
    </div>
  );
}
