// Icons
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// Components
import Button from "@/components/ui/Button";

/**
 * Pagination component
 *
 * @param {object} props - Props object
 * @param {number} [props.currentPage=1] - Current page
 * @param {number} [props.totalPages=10] - Total pages
 * @param {function} [props.onPageChange=null] - Page change handler
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = null,
  className = "",
}) => {
  return (
    <nav
      className={`
        flex
        items-center
        justify-center
        space-x-4 mt-8
        ${className}
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
        <HiChevronLeft
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
        <HiChevronRight
          className={`
            w-5
            h-5
        `}
        />
      </Button>
    </nav>
  );
};

export default Pagination;
