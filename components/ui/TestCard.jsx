import Image from 'next/image'

export default function TestCard({ text, description, imageSrc }) {
  return (
    <div
      className={`
        bg-white
        shadow-md
        p-4
        rounded-md
        m-6
        text-black
      `}
    >
      <h1>{text}</h1>
      <p>{description}</p>
      <Image
        src={imageSrc}
        width={200}
        height={200}
      />
    </div>
  )
}