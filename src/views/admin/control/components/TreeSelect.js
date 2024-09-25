import React, { useState } from 'react';
import { Box, Checkbox, Text } from '@chakra-ui/react';

const options = [
  {
    label: 'Business Continuity',
    value: 'business_continuity',
    children: [
      { value: 'group_documentation', label: 'Group Documentation' },
      { value: 'information_security', label: 'Information Security' },
      { value: 'staffing_and_organisation', label: 'Staffing and Organisation' },
      { value: 'mandatory_training', label: 'Mandatory Training and Awareness' },
      { value: 'business', label: 'Business' },
    ],
  },
];

const TreeSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (value) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((opt) => opt !== value); // Unselect
      } else {
        return [...prevSelected, value]; // Select
      }
    });
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <Box key={option.value} mb={2}>
        <Checkbox
          isChecked={selectedOptions.includes(option.value)}
          onChange={() => handleSelect(option.value)}
        >
          {option.label}
        </Checkbox>
        {option.children && option.children.length > 0 && (
          <Box pl={4}>{renderOptions(option.children)}</Box>
        )}
      </Box>
    ));
  };

  return (
    <>
      <Text fontWeight="bold">Select Options:</Text>
      <Box>{renderOptions(options)}</Box>
      {selectedOptions.length > 0 && (
        <Box mt={3}>
          <Text fontWeight="bold">Selected Options:</Text>
          {selectedOptions.map((value) => (
            <Text key={value}>{value}</Text>
          ))}
        </Box>
      )}
    </>
  );
};

export default TreeSelect;
