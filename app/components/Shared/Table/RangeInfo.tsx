import { FC } from 'react';
import { Text } from '@chakra-ui/react';

interface RangeInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const RangeInfo: FC<RangeInfoProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
}) => {
  // Calculate the starting item index
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  // Calculate the ending item index
  let endIndex = currentPage * itemsPerPage;
  // Make sure the ending index does not exceed the total number of items
  endIndex = endIndex > totalItems ? totalItems : endIndex;

  return (
    <Text
      fontFamily="Inter"
      fontSize="0.875rem"
      fontWeight={500}
      lineHeight={1.42857}
      color="#667085"
    >
      Showing {startIndex}-{endIndex} from {totalItems}
    </Text>
  );
};

export default RangeInfo;
