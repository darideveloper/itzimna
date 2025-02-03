// Icons
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Components
import Button from "@/components/ui/Button";

/**
 * Renders a pagination component with the current page, total pages and a function to handle page changes
 * @param {Object} props - Props object
 * @param {number} [props.currentPage=1] - Current page number
 * @param {number} [props.totalPages=10] - Total pages
 * @param {function} [props.onPageChange] - Function to run when page changes
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = null,
}) => {
  return (
    <nav
      className={`
        flex
        items-center
        justify-center
        space-x-4 mt-8
     `}
    >
      <Button disabled={currentPage === 1}>
        <HiChevronLeft
          className={`
            w-5
            h-5
        `}
        />
      </Button>

      <span
        className={`
            text-gray-700
        `}
      >
        {currentPage} / {totalPages}
      </span>

      <Button disabled={currentPage === totalPages}>
        <HiChevronRight className={`
            w-5
            h-5
        `}
        />
      </Button>
    </nav>
  );
};

export default Pagination;
