import Blog from "@/components/blog/Blog"
import Contact from "@/components/contact/Contact"
import Guestbook from "@/components/guestbook/Guestbook"
import HeroAbout from "@/components/home/HeroAbout"
import Hero from "@/components/hero/Hero"
import About from "@/components/about/About"
import Projects from "@/components/projects/Projects"
import Skills from "@/components/skills/Skills"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Guestbook />
      <Contact />
    </>
  )
}