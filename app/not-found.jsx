// Libs
import { fontTitle } from "@/libs/fonts"

// Components
import Link from 'next/link'
import Title from "@/components/ui/Title"


export default function NotFound() {

  return (
    <html lang="es">
      <body
        className={`
          ${fontTitle.className}
          bg-green-dark
          text-grey
        `}
      >
        <main>
          <section
            className={`
              not-found
              h-screen
              flex
              flex-col
              justify-center
              items-center
            `}
          >
            <Link
              className={`
                go-back-btn
                p-6
                rounded-full
                bg-blue
                w-60
                h-60
                overflow-hidden
                flex
                justify-center
                items-center
                group
                relative
              `}
              href="/"
            >
              <img
                src="/images/logo.webp"
                alt="itzimna logo"
                title="itzimna logo"
                className={`
                  w-10/12
                  duration-300
                  group-hover:opacity-40
                `}
              />

              <svg
                viewBox="0 0 24 24"
                className={`
                  w-full
                  h-auto
                  absolute
                  fill-white
                  opacity-0 group-hover:opacity-100
                  top-0
                  left-0
                  bg-blue
                  duration-300
                  p-6
                `}
              >
                <path
                  d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
                  fillRule="nonzero"
                />
              </svg>

            </Link>
            <Title
              className={`
                text-6xl
                font-bold
                mt-6
              `}
              isH1
            >
              404
            </Title>
            <Title
              className={`
                text-2xl
                font-bold
                mt-2
              `}
            >
              Página no encontrada
            </Title>
          </section>
        </main>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }) {
  return {
    title: "404 | C4 Empresarial y Residencial",
    description: "Página no encontrada",
  }
}