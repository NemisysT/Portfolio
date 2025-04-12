import { AnimatedTestimonials } from "./animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const achievements = [
    {
      quote:
        "Participated in PBCTF: A Capture the Flag Contest based on CyberSecurity.",
      name: "CyberSecurity Enthusiast",
      designation: "Capture The Flag Participant",
      src: "/images/ctf.jpg", 
    },
    {
      quote:
        "Rated 1321 on the Competitive Coding Platform CodeChef.",
      name: "Competitive Programmer",
      designation: "CodeChef Rating",
      src: "/images/CodeChefBadge.jpg",
    },
    {
      quote:
        "Represented Netherlands in CamMUN 2019.",
      name: "Delegate",
      designation: "CamMUN 2019",
      src: "/images/Mun.jpg",
    },
    {
      quote:
        "Placed 2nd in The Commit and Conquer Event hosted by ByteXync.",
      name: "Hackathon Enthusiast",
      designation: "Runner Up",
      src: "/images/Coc.jpg",
    },
    {
      quote:
        "Placed 14th in Cipher Chase: A Capture the Flag Contest based on CyberSecurity by IIITB.",
      name: "CTF Participant",
      designation: "Cipher Chase 14th Place",
      src: "/images/cipher.png",
    },
    {
      quote:
        "Placed 3rd in The Botcraft Hackathon hosted by ByteXync.",
      name: "Hackathon Enthusiast",
      designation: "Botcraft Hackathon 3rd Place",
      src: "/images/disbot.jpg",
    },
    {
      quote:
        "Placed top 20 in The Cepheus Hackathon hosted by CodeClub.",
      name: "Hackathon Enthusiast",
      designation: "Cepheus Hackathon top 20",
      src: "/images/cepheus.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={achievements} />;
}
