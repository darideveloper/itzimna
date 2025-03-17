// Icons
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

// Components
import Button from "@/components/ui/Button";

/**
 * Pagination component
 *
 * @param {object} props - Props object
 * @param {number} props.currentPage - Current page
 * @param {number} props.totalPages - Total pages
 * @param {function} props.onPageChange - Page change handler
 * @param {string} props.className - Additional classes
 * @param {string} props.variant - Pagination variant. Default is "light" (light or dark)
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = null,
  className = "",
  variant="light"
}) => {
  return (
    <nav
      className={`
        pagination
        flex
        items-center
        justify-center
        space-x-4 mt-8
        ${className}
     `}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          gap-6
          py-4
          px-8
          rounded-md
          ${variant === "light" ? "bg-transparent": "bg-white"}
        `}
      >
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`
            w-10
            h-10
            flex
            items-center
            justify-center
          `}
        >
          <FaCaretLeft
            className={`
              w-5
              h-5
          `}
          />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
            className={`
              w-10
              h-10
              flex
              items-center
              justify-center
            `}
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`
            w-10
            h-10
            flex
            items-center
            justify-center
          `}
        >
          <FaCaretRight
            className={`
              w-5
              h-5
          `}
          />
        </Button>
      </div>

    </nav>
  );
};

export default Pagination;
