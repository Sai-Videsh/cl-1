import { useState } from "react";
import { GlassNavbar } from "./components/GlassNavbar";
import { GlassMenuSystem } from "./components/GlassMenuSystem";
import { HeroSection } from "./components/HeroSection";
import { SignatureExperienceSection } from "./components/SignatureExperienceSection";
import { SocialProofWall } from "./components/SocialProofWall";
import { BranchNetworkSection } from "./components/BranchNetworkSection";
import { TimeOffersCrowdSection } from "./components/TimeOffersCrowdSection";
import { TrustUtilityFooter } from "./components/TrustUtilityFooter";
import { VibesFlowSection } from "./components/VibesFlowSection";

function App() {
  const [activeItem, setActiveItem] = useState("entry");

  return (
    <div className="min-h-screen bg-[#120803] text-[#ffe9d5]">
      <GlassNavbar activeItem={activeItem} onItemSelect={setActiveItem} />

      <div id="entry">
        <HeroSection />
      </div>

      <main className="site-atmosphere relative flex flex-col gap-20 overflow-hidden px-5 pb-[10px] pt-12 sm:px-10 lg:px-14">
        <TimeOffersCrowdSection />

        <SignatureExperienceSection />

        <GlassMenuSystem />

        <VibesFlowSection />

        <SocialProofWall />

        <BranchNetworkSection />

        <TrustUtilityFooter />
      </main>
    </div>
  );
}

export default App;