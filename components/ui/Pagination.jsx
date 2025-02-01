import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import Button from "@/components/ui/Button"

const Pagination = ({ currentPage=1, totalPages=10, onPageChange=null }) => {
  return (
    <nav className="flex items-center justify-center space-x-4 mt-8">
        <Button
            disabled={currentPage === 1}
        >
            <HiChevronLeft className="w-5 h-5" />
        </Button>
      <span className="text-gray-700">
        {currentPage} / {totalPages}
      </span>

        <Button
            disabled={currentPage === totalPages}
        >
            <HiChevronRight className="w-5 h-5" />
        </Button>


    </nav>
  )
}

export default Pagination