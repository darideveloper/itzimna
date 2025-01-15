import { fontTitle } from "@/libs/fonts"

export default function TestSection() {
  return (
    <section>
      <h1
        className={`
          ${fontTitle.className}
          text-5xl
        `}
      >
        Hello world
      </h1>
    </section>
  )
}