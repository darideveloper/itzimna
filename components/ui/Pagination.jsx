// Icons
import { FaCaretLeft, FaCaretRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

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

  // Helper function to get visible page numbers
  const getVisiblePages = () => {
    const delta = 2; // Show 2 pages on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end of the visible range
    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);

    // Adjust range if we're near the beginning or end
    if (currentPage - delta <= 2) {
      end = Math.min(totalPages - 1, 5);
    }
    if (currentPage + delta >= totalPages - 1) {
      start = Math.max(2, totalPages - 4);
    }

    // Build the range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page
    if (start > 2) {
      rangeWithDots.push(1);
      if (start > 3) {
        rangeWithDots.push('...');
      }
    } else if (totalPages > 1) {
      rangeWithDots.push(1);
    }

    // Add the range
    rangeWithDots.push(...range);

    // Add last page
    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    } else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`
        pagination
        flex
        items-center
        justify-center
        space-x-2
        !mt-8
        ${className}
     `}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          gap-2
          py-4
          px-2
          rounded-md
          flex-wrap
          w-full          
          ${variant === "light" ? "bg-transparent": "bg-white"}
        `}
      >
        {/* First page button */}
        {totalPages > 1 && currentPage > 1 && (
          <Button
            onClick={() => onPageChange(1)}
            className={`
              w-10
              h-10
              flex
              items-center
              justify-center
              text-xs
            `}
            title="First page"
          >
            <FaAnglesLeft
              className={`
                w-4
                h-4
              `}
            />
          </Button>
        )}

        {/* Previous page button */}
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
          title="Previous page"
        >
          <FaCaretLeft
            className={`
              w-5
              h-5
          `}
          />
        </Button>

        {/* Page numbers */}
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  font-medium
                `}
              >
                ...
              </span>
            );
          }

          return (
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
          );
        })}

        {/* Next page button */}
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
          title="Next page"
        >
          <FaCaretRight
            className={`
              w-5
              h-5
          `}
          />
        </Button>

        {/* Last page button */}
        {totalPages > 1 && currentPage < totalPages && (
          <Button
            onClick={() => onPageChange(totalPages)}
            className={`
              w-10
              h-10
              flex
              items-center
              justify-center
              text-xs
            `}
            title="Last page"
          >
            <FaAnglesRight
              className={`
                w-4
                h-4
              `}
            />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
