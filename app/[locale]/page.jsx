// Sections
import TestSection from "@/components/layouts/TestSection"
import Button from "@/components/ui/Button"
import Subtitle from "@/components/ui/Subtitle"
import Title from "@/components/ui/Title"

import TestClientSection from "@/components/layouts/TestClientSection"


export default function HomePage() {

  return (
    <>
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
        href="https://www.google.com"
        target="_blank"
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
      >
        This is an h1
      </Title>
      <Title>
        This is an h2
      </Title>
      <Subtitle>
        This is an h3
      </Subtitle>
    </>
  )
}