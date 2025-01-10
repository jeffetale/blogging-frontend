// src/components/AboutPage.jsx

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SeekBar } from "./about-components/SeekBar";
import { useEffect, useState } from "react";
import { AboutPageImage } from "./HandleImages";

const AboutPage = () => {
  const skills = [
    { name: "Frontend", level: 87 },
    { name: "Backend", level: 90 },
    { name: "Website Design", level: 78 },
    { name: "Security Testing", level: 80 },
  ];

  const services = [
    {
      title: "Full-Stack Development",
      description:
        "Building scalable web applications with modern technologies and best practices.",
    },
    {
      title: "Security Auditing",
      description:
        "Comprehensive security assessments and vulnerability testing.",
    },
    {
      title: "API Development",
      description:
        "Designing and implementing robust RESTful and GraphQL APIs.",
    },
    {
      title: "DevSecOps",
      description:
        "Integrating security practices into the development pipeline.",
    },
  ];

  const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchActiveProfileImage = async () => {
      try {
        if (!backendBaseURL) {
          console.error("Backend URL is not defined");
          return;
        }

        const response = await fetch(
          `${backendBaseURL}/api/v1/profile/images/active`
        );

        if (!response.ok) {
          if (response.status === 404) {
            return;
          }
          throw new Error("Failed to fetch active profile image");
        }

        const data = await response.json();
        setProfileImage(data);
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setError(error.message);
      }
    };

    fetchActiveProfileImage();
  }, [backendBaseURL]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-16 pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-amber-900">
                  Hi, I am
                </h2>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
                  Jeff Etale
                </h1>
                <div className="space-y-1">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
                    Software Engineer
                  </h2>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
                    &
                  </h2>
                  <h2 className="text-4xl md:text-5xl font-bold text-amber-900">
                    Ethical Hacker
                  </h2>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m a tech enthusiast who loves breaking stuff and building
                cool software solutions. When I&apos;m not crafting clean code
                or finding sneaky vulnerabilities, I&apos;m always up for a
                challenge. Besides coding, you&apos;ll probably find me geeking
                out over the latest AI trends or stalking the stock market.
              </p>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="w-72 h-72 rounded-full overflow-hidden ring-4 ring-amber-900 ring-offset-4">
                <AboutPageImage
                  imageUrl={profileImage?.image_url}
                  backendBaseURL={backendBaseURL}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <span className="text-amber-900 font-semibold">
                    {skill.level}%
                  </span>
                </div>
                <SeekBar
                  inputValue={skill.level}
                  trackColors={["#fd6f00", "#ececeb"]}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-amber-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background border-t">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Got a project in mind?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Whether you need secure software solutions or want to make sure your
            systems can withstand attacks, let&apos;s team up and build
            something rock-solid together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-lg border border-input bg-background text-foreground 
              flex-1 max-w-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 
              focus:ring-ring focus:border-input"
            />
            <button
              className="px-8 py-4 bg-amber-900 text-white rounded-lg font-semibold 
              hover:bg-amber-800 transition-colors focus:outline-none focus:ring-2 
              focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
