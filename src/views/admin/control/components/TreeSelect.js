import React, { useState, useCallback } from 'react';
import { Box, Checkbox, Text, Select } from '@chakra-ui/react';

// Fake data for dropdown lists under each option
const dropdownData = {
  business_continuity: ['Business Plan A', 'Business Plan B', 'Risk Assessment'],
  group_documentation: ['Doc A', 'Doc B', 'Doc C'],
  information_security: ['Firewall Rules', 'Antivirus Setup', 'Data Encryption'],
  staffing_and_organisation: ['HR Policy', 'Hiring Strategy', 'Org Chart'],
  mandatory_training: ['Safety Training', 'IT Security Training', 'Awareness Program'],
  business: ['Business Strategy', 'Revenue Model', 'Market Analysis'],
};

// Main options (all are parent options now)
const options = [
  { value: 'business_continuity', label: 'Business Continuity' },
  { value: 'group_documentation', label: 'Group Documentation' },
  { value: 'information_security', label: 'Information Security' },
  { value: 'staffing_and_organisation', label: 'Staffing and Organisation' },
  { value: 'mandatory_training', label: 'Mandatory Training and Awareness' },
  { value: 'business', label: 'Business' },
];

// Main TreeSelect Component
const TreeSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownSelections, setDropdownSelections] = useState({});

  // Function to handle checkbox selection/deselection
  const handleSelect = useCallback(
    (value) => {
      const isSelected = selectedOptions.includes(value);
      let newSelectedOptions;

      // If selecting, select or deselect based on current state
      newSelectedOptions = isSelected
        ? selectedOptions.filter((opt) => opt !== value) // Deselect
        : [...selectedOptions, value]; // Select

      setSelectedOptions(newSelectedOptions);
    },
    [selectedOptions]
  );

  // Function to handle dropdown selection
  const handleDropdownChange = (category, value) => {
    setDropdownSelections((prevSelections) => ({
      ...prevSelections,
      [category]: value,
    }));
  };

  // Function to render checkboxes and dropdowns
  const renderOptions = (options) => {
    return options.map((option) => (
      <Box key={option.value} mb={4}>
        <Checkbox
          isChecked={selectedOptions.includes(option.value)}
          onChange={() => handleSelect(option.value)}
          fontSize="12px"
        >
          {option.label}
        </Checkbox>

        {/* Render dropdown if there are items for this option */}
        {dropdownData[option.value] && (
          <Select
            mt={2}
            placeholder={`Select option for ${option.label}`}
            onChange={(e) => handleDropdownChange(option.value, e.target.value)}
            value={dropdownSelections[option.value] || ''}
            isDisabled={!selectedOptions.includes(option.value)} // Disable if not selected
            fontSize="12px"
          >
            {dropdownData[option.value].map((item) => (
              <option key={item} value={item} fontSize="12px">
                {item}
              </option>
            ))}
          </Select>
        )}
      </Box>
    ));
  };

  return (
    <Box bg="white" p={6} rounded="md" shadow="md" maxW="500px" mx="auto" mt={8}>
      <Text fontWeight="bold" mb={4} fontSize="12px">Select Options:</Text>
      <Box>{renderOptions(options)}</Box>

      {/* Show selected options */}
      {selectedOptions.length > 0 && (
        <Box mt={3}>
          <Text fontWeight="bold" fontSize="12px">Selected Options:</Text>
          {selectedOptions.map((value) => (
            <Text key={value} fontSize="12px">
              {value}: {dropdownSelections[value] || 'No selection'}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TreeSelect;
