// Components
import Button from "@/components/ui/Button"
import Subtitle from "@/components/ui/Subtitle"
import Title from "@/components/ui/Title"

// Sections
import TestSection from "@/components/layouts/TestSection"
import TestClientSection from "@/components/layouts/TestClientSection"
import TestCardsSection from "@/components/layouts/TestCardsSection"


export default function HomePage() {

  return (
    <>
      <hr />
      <p>Aos</p>
      <hr />
      <p
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Aos text 1
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Aos text 2
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Aos text 3
      </p>
      <br />
      <br />
      <br />

      <hr />
      <p>Test section</p>
      <hr />
      <TestSection />
      <br />
      <br />
      <br />

      <hr />
      <p>Server link</p>
      <hr />
      <p>Button (href)</p>
      <Button
        href="/page-1"
      >
        This is a button link
      </Button>
      <br />
      <br />
      <br />

      <p>Button (href disabled)</p>
      <Button
        href="https://www.google.com"
        target="_blank"
        disabled={true}
      >
        This is a button link
      </Button>
      <br />
      <br />
      <br />

      <TestClientSection />
      <br />
      <br />
      <br />

      <hr />
      <p>Headings</p>
      <hr />
      <Title
        isH1={true}
        className={`
          debug
        `}
      >
        This is an h1
      </Title>
      <Title>
        This is an h2
      </Title>
      <Subtitle>
        This is an h3
      </Subtitle>
      <br />
      <br />
      <br />

      <TestCardsSection/>
      <br />
      <br />
      <br />
    </>
  )
}