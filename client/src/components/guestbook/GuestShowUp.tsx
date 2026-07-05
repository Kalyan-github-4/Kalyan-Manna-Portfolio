import GuestShowUpWall, { type Speaker } from "./GuestShowUpWall";
import GradientText from "../GradientText";
const speakers: Speaker[] = [
  {
    name: "Naomi Adeyemi",
    role: "Founder · Bloom Studio",
    feedback:
      "Kalyan delivered a clean, modern website that made our business look much more professional online.",
  },
  {
    name: "Hugo Marchetti",
    role: "Owner · AutoHub Rentals",
    feedback:
      "The management system made our day-to-day work much easier. We can now track customers and bookings smoothly.",
  },
  {
    name: "Priya Nair",
    role: "Marketing Lead · Loomstack",
    feedback:
      "Very professional work. The design, animations, and responsiveness were exactly what we needed.",
  },
  {
    name: "Sebastian Cole",
    role: "Creative Director",
    feedback:
      "The portfolio design helped us showcase our services beautifully and attract better client inquiries.",
  },
  {
    name: "Mei-Ling Zhao",
    role: "Product Designer",
    feedback:
      "Great attention to detail. The UI feels premium, smooth, and easy to use across devices.",
  },
  {
    name: "Idris Calloway",
    role: "Founder · Northwind",
    feedback:
      "The website gave our brand a strong online presence and helped customers understand our services faster.",
  },
  {
    name: "Clara Boström",
    role: "VP Product · Figma",
    feedback:
      "Clean structure, elegant design, and very good communication throughout the project.",
  },
  {
    name: "Rafael Ortega",
    role: "Motion Lead",
    feedback:
      "The animations feel smooth without making the website heavy. Really liked the overall experience.",
  },
  {
    name: "Hannah Whitfield",
    role: "DX Engineer · Stripe",
    feedback:
      "The final result was fast, responsive, and polished. Exactly the kind of work we wanted.",
  },
  {
    name: "Yusuf Demir",
    role: "Business Owner",
    feedback:
      "Kalyan understood our business problem and created a practical digital solution for us.",
  },
].map((s, i) => ({
  ...s,
  src: `https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-${String(
    (i % 5) + 1,
  ).padStart(2, "0")}.jpg`,
}));

export default function GuestShowUp() {
  return (
    <GuestShowUpWall
      eyebrow="Client Feedback"
      title={
        <>
          <GradientText
            className="inline-block overflow-visible pb-4"
            colors={["#FF3BD4","#FFB5EF","#FE98E8","#FFEDA4","#FF3BD4"]}
            animationSpeed={6}
          >
            Voices
          </GradientText>{" "}
          Matters
        </>
      }
      description="Real feedback from people and businesses I’ve helped with websites, apps, dashboards, and digital systems."
      hint="scroll to read feedback"
      speakers={speakers}
      showCaptions={false}
    />
  );
}