import { fontTitle } from "@/libs/fonts"

export default function TestSection() {
  return (
    <section>
      <p
        className={`
          ${fontTitle.className}
        `}
      >
        Hello world
      </p>
    </section>
  )
}