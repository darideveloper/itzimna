// Icons
import { FaCalendarAlt, FaUser } from "react-icons/fa"

//libs
import Image from "next/image"
import { useTranslations } from "next-intl"

// UI Components
import Button from "@/components/ui/Button"
import TransitionLink from "@/components/utils/TransitionLink"

/**
 * Blog card component
 *
 * @param {object} props - Props object
 * @param {string} props.title - Blog post title
 * @param {string} props.description - Blog post description
 * @param {string} props.coverImage - Blog post cover image URL
 * @param {string} props.date - Blog post publication date
 * @param {string} props.author - Blog post author name
 * @param {Array} props.tags - Blog post tags (array of strings)
 * @param {string} props.href - URL to route to
 * @param {string} props.className - Additional classes
 * @returns {JSX.Element} Blog card component
 */
export default function Post({
  title,
  description,
  coverImage,
  date,
  author,
  tags = [],
  slug,
  className,
}) {

  const t = useTranslations("Blog.Post")

  return (
    <div data-aos="zoom-in">
    <TransitionLink href={`/blog/${slug}`}>
      <div
        className={`
          blog-card
          rounded-2xl
          shadow-sm hover:shadow-lg
          hover:shadow-green
          hover:scale-105
          duration-300
          bg-grey
          overflow-hidden
          border-white hover:border-green
          text-green
          cursor-pointer
          ${className}
        `}
      >
        <div
          className={`
          relative
          w-full
          h-64
          overflow-hidden
          group
        `}
        >
          <Image
            src={coverImage || "/images/test.svg"}
            alt={title}
            fill
            className={`
              object-cover
              transition-transform duration-500
              group-hover:scale-110
            `}
            priority
            sizes="100%"
          />

          {/* Tags badges */}
          <div
            className={`
              tags
              absolute
              top-4
              right-4
              flex
              flex-wrap
              items-end
              justify-end
              w-11/12
              gap-1
            `}
          >
            
          </div>
          {/* Description overlay */}
          <div
            className={`
            absolute
            inset-0
            bg-green/70
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            flex
            items-center
            justify-center
            p-4
        `}
          >
            <p
              className={`
                text-white
                text-sm
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
                delay-100
              `}
            >
              {description}
            </p>
          </div>
        </div>
        <div className={`p-5`}>
          <h2
            className={`
              text-xl
              font-semibold
              text-green
              mb-2
              transition-colors
              duration-200
              hover:text-yellow
              capitalize
          `}
          >
            {title}
          </h2>
          <div
            className={`
              flex
              items-center
              justify-between
              text-gray-800
              mb-4
            `}
          >
            <div
              className={`
                flex
                items-center
              `}
            >
              <FaCalendarAlt
                className={`
                  w-4
                  h-4
                  mr-1
                  text-green
              `}
              />
              <span className={`text-sm`}>{date}</span>
            </div>
            <div
              className={`
                flex
                items-center
              `}
            >
              <FaUser
                className={`
                  w-4
                  h-4
                  mr-1
                  text-green
              `}
              />
              <span className={`text-sm`}>{author}</span>
            </div>
          </div>
        </div>
        <div
          className={`
            flex
            items-center
            justify-center
            p-5
            pt-0
        `}
        >
          <Button
            className={`
              w-full
              mt-2
            `}
          >
            {t("readMore")}
          </Button>
        </div>
      </div>
    </TransitionLink>
    </div>
  )
}
