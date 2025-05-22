import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Heading,
} from '@chakra-ui/react';

// Composant pour le formulaire Key Indicator Analysis
const KeyIndicatorAnalysisForm = () => {
  const [formData, setFormData] = useState({
    indicatorName: '',
    targetValue: '',
    currentValue: '',
    unit: '',
    trend: '',
    analysisDate: '',
    comments: ''
  });

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" color="green.600">Key Indicator Analysis Form</Heading>
      
      <FormControl>
        <FormLabel>Indicator Name</FormLabel>
        <Input 
          value={formData.indicatorName}
          onChange={(e) => setFormData({...formData, indicatorName: e.target.value})}
          placeholder="Enter indicator name"
        />
      </FormControl>

      <HStack spacing={4}>
        <FormControl>
          <FormLabel>Target Value</FormLabel>
          <NumberInput>
            <NumberInputField 
              value={formData.targetValue}
              onChange={(e) => setFormData({...formData, targetValue: e.target.value})}
              placeholder="Target"
            />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Current Value</FormLabel>
          <NumberInput>
            <NumberInputField 
              value={formData.currentValue}
              onChange={(e) => setFormData({...formData, currentValue: e.target.value})}
              placeholder="Current"
            />
          </NumberInput>
        </FormControl>
      </HStack>

      <FormControl>
        <FormLabel>Unit of Measurement</FormLabel>
        <Input 
          value={formData.unit}
          onChange={(e) => setFormData({...formData, unit: e.target.value})}
          placeholder="e.g., %, $, units"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Trend</FormLabel>
        <Select 
          value={formData.trend}
          onChange={(e) => setFormData({...formData, trend: e.target.value})}
          placeholder="Select trend"
        >
          <option value="improving">Improving</option>
          <option value="stable">Stable</option>
          <option value="declining">Declining</option>
          <option value="volatile">Volatile</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Analysis Date</FormLabel>
        <Input 
          type="date"
          value={formData.analysisDate}
          onChange={(e) => setFormData({...formData, analysisDate: e.target.value})}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Analysis Comments</FormLabel>
        <Textarea 
          value={formData.comments}
          onChange={(e) => setFormData({...formData, comments: e.target.value})}
          placeholder="Enter your analysis and recommendations"
          rows={4}
        />
      </FormControl>

      <Button colorScheme="green" size="lg">
        Save Analysis
      </Button>
    </VStack>
  );
};

export default KeyIndicatorAnalysisForm;