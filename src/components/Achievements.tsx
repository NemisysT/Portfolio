import { AnimatedTestimonials } from "./animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const achievements = [
    {
      quote:
        "Participated in PBCTF: A Capture the Flag Contest based on CyberSecurity.",
      name: "CyberSecurity Enthusiast",
      designation: "Capture The Flag Participant",
      src: "/images/ctf.jpg", // Replace with relevant local image
    },
    {
      quote:
        "Rated 1321 on the Competitive Coding Platform CodeChef.",
      name: "Competitive Programmer",
      designation: "CodeChef Rating",
      src: "/images/CodeChefBadge.jpg", // Replace with relevant local image
    },
    {
      quote:
        "Represented Netherlands in CamMUN 2019.",
      name: "Delegate",
      designation: "CamMUN 2019",
      src: "/images/Mun.jpg", // Replace with relevant local image
    },
    {
      quote:
        "Placed 14th in Cipher Chase: A Capture the Flag Contest based on CyberSecurity by IIITB.",
      name: "CTF Participant",
      designation: "Cipher Chase 14th Place",
      src: "/images/cipher.png", // Replace with relevant local image
    },
    {
      quote:
        "Placed 3rd in The Botcraft Hackathon hosted by ByteXync.",
      name: "Hackathon Enthusiast",
      designation: "Botcraft Hackathon 3rd Place",
      src: "/images/disbot.jpg", // Replace with relevant local image
    },
  ];

  return <AnimatedTestimonials testimonials={achievements} />;
}
