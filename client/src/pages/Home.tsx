import About from "@/components/about/About"
import Blog from "@/components/blog/Blog"
import Contact from "@/components/contact/Contact"
import Guestbook from "@/components/guestbook/Guestbook"
import Hero from "@/components/hero/Hero"
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