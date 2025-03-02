import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Courses", path: "/courses" },
        { name: "Podcast", path: "/podcast" },
        { name: "AI Chatbot", path: "/chatbot" },
        { name: "Games", path: "/games" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" },
      ],
    },
    {
      title: "Team",
      links: [
        { name: "Rahul Reddy", path: "/terms" },
        { name: "Sandeep Kalyan", path: "/privacy" },
        { name: "Yaswanth Varada", path: "/cookies" },
        { name: "Gnana Sagar", path: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Fingenius
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering you with financial knowledge and tools to make smarter
              investment decisions and enhance your financial literacy.
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Fingenius. All rights reserved.
            </p>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
