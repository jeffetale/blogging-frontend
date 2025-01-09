// src/components/ui/AnimatedHero.jsx

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnimatedHero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);

  useEffect(() => {
    // Start video transition after initial animation
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
      setShowVideo(true);
    }, 3000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  const handleStartReading = () => {
    const featuredPost = document.querySelector("#featured-post");
    if (featuredPost) {
      featuredPost.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      {/* Initial Welcome Animation */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 bg-black transition-opacity duration-1000 ${
          showInitialAnimation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
          Welcome to My Blog
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Discover amazing stories and insights that inspire and inform
        </p>
        <Button
          variant="outline"
          size="lg"
          className="animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
          onClick={handleStartReading}
        >
          Start Reading
        </Button>
      </div>

      {/* Video Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content over video */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
            Discover amazing stories and insights that inspire and inform
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
            onClick={handleStartReading}
          >
            <Play className="mr-2 h-4 w-4" /> Start Reading
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;
