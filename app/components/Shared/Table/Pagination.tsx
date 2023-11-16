import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { COLORS } from '@/app/constant/UserDashboard';
import { FC } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxButtons = 5; // Total buttons to display at a time, including the '...'

  let startPage: number, endPage: number;
  let hasLeftSpill: boolean, hasRightSpill: boolean;

  const spillOffset = 1; // How many total items (pages or '...') to show besides the current page

  if (totalPages <= maxButtons) {
    // Less than maxButtons so show all
    startPage = 1;
    endPage = totalPages;
    hasLeftSpill = hasRightSpill = false;
  } else {
    // More than maxButtons so calculate start and end pages
    let pagesBeforeCurrentPage = Math.floor((maxButtons - spillOffset) / 2);
    let pagesAfterCurrentPage = Math.ceil((maxButtons - spillOffset) / 2) - 1;
    startPage = currentPage - pagesBeforeCurrentPage;
    endPage = currentPage + pagesAfterCurrentPage;

    hasLeftSpill = startPage > 1;
    hasRightSpill = endPage < totalPages;

    // Handle cases where spill offsets cause an overlap
    if (startPage < 1) {
      startPage = 1;
      endPage = maxButtons - spillOffset;
      hasLeftSpill = false;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - (maxButtons - spillOffset);
      hasRightSpill = false;
    }
  }

  const onPageSelect = (page: number) => {
    onPageChange(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <Box display="flex" justifyContent="center">
      <ButtonGroup size="sm">
        <Button
          aria-label="previous page"
          onClick={() => onPageSelect(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          <MdChevronLeft />
        </Button>

        {/* Left Spill */}
        {hasLeftSpill && (
          <>
            <Button isDisabled size="sm">
              ...
            </Button>
          </>
        )}

        {/* Page Number Buttons */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map(page => (
          <Button
            key={page}
            transition="0s"
            onClick={() => onPageSelect(page)}
            bg={
              page === currentPage
                ? COLORS._primaryColor
                : COLORS._primaryColor100
            }
            color={page === currentPage ? 'white' : COLORS._primaryColor}
            size="sm"
            _hover={{
              bg: page === currentPage ? '#4543AE' : '#BEBDF6',
              color: page === currentPage ? '#FFFFFF' : '#4543AE',
            }}
            _active={{
              bg: page === currentPage ? '#4543AE' : '#BEBDF6',
              color: page === currentPage ? '#FFFFFF' : '#4543AE',
            }}
          >
            {page}
          </Button>
        ))}

        {/* Right Spill */}
        {hasRightSpill && (
          <>
            <Button isDisabled size="sm">
              ...
            </Button>
          </>
        )}

        <Button
          aria-label="next page"
          onClick={() => onPageSelect(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          <MdChevronRight />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
