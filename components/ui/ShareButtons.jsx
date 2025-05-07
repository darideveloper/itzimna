"use client"

import { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share'

import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaEnvelope,
} from 'react-icons/fa'

const buttons = [
  {
    Component: FacebookShareButton,
    icon: FaFacebookF,
    props: (url, title) => ({ url, quote: title }),
  },
  {
    Component: TwitterShareButton,
    icon: FaTwitter,
    props: (url, title) => ({ url, title }),
  },
  {
    Component: WhatsappShareButton,
    icon: FaWhatsapp,
    props: (url, title) => ({ url, title }),
  },
  {
    Component: LinkedinShareButton,
    icon: FaLinkedinIn,
    props: (url, title) => ({ url, title }),
  },
  {
    Component: EmailShareButton,
    icon: FaEnvelope,
    props: (url, title) => ({
      url,
      subject: title,
      body: `Check this out: ${url}`,
    }),
  },
]

const ShareButtons = ({ title }) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  if (!url) return null // or show loading spinner

  return (
    <div className="flex justify-center items-center my-6 space-x-4 text-white text-xl">
      {buttons.map(({ Component, icon: Icon, props }, idx) => (
        <Component key={idx} {...props(url, title)}>
          <div className="bg-green-dark p-3 rounded-full duration-300 hover:opacity-80">
            <Icon />
          </div>
        </Component>
      ))}
    </div>
  )
}

export default ShareButtons
