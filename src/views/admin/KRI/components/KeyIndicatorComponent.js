import React from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Select,
  Stack,
  Heading,
  Divider,
  SimpleGrid,
  Button
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const KeyIndicatorComponent = ({kri, onClose}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const kriData = Array.isArray(kri) ? kri[0] : kri;

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Box p={5} fontSize="12px">
      {/* Top Section */}
      <Heading size="md" mb={4}>
        Key Indicator Details
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
          <FormControl isRequired>
            <FormLabel>Entity</FormLabel>
            <Input {...register("entity")} defaultValue={kriData.departmentFunction} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Key Indicator Library</FormLabel>
            <Input {...register("library")} defaultValue="KIL00044 New KI" />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} defaultValue={kriData.riskIndicatorDescription} />
          </FormControl> 

          <FormControl>
            <FormLabel>Key Indicator Category</FormLabel>
            <Select {...register("category")} defaultValue={kriData.category}>
              <option>Key Risk Indicator</option>
              <option>Key Performance Indicator</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Key Indicator Reference</FormLabel>
            <Input {...register("reference")} defaultValue={kriData.reference} isReadOnly />
          </FormControl>
        </SimpleGrid>

        <Divider mb={4} />

        {/* Tabs Section */}
        <Tabs variant="enclosed">
          <TabList>
            <Tab>General</Tab>
            <Tab>History</Tab>
            <Tab>Actions</Tab>
            <Tab>Linked Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel>Owner</FormLabel>
                  <Input {...register("owner")} defaultValue={kriData.ownerKeyIndicator} />
                </FormControl>

                <FormControl>
                  <FormLabel>Nominee</FormLabel>
                  <Input {...register("nominee")} defaultValue={kriData.nomineeKeyIndicator} />
                </FormControl>

                <FormControl>
                  <FormLabel>Reviewer</FormLabel>
                  <Input {...register("reviewer")} defaultValue={kriData.reviewerKeyIndicator} />
                </FormControl>

                <FormControl>
                  <FormLabel>Review Date</FormLabel>
                  <Input {...register("reviewDate")} type="date" />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <Checkbox {...register("isActive")} defaultChecked mr={2} />
                  <FormLabel mb="0">Active Key Indicator</FormLabel>
                </FormControl>

                <FormControl>
                  <FormLabel>Detailed Description</FormLabel>
                  <Textarea {...register("detailedDescription")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Type of KI</FormLabel>
                  <Input {...register("typeOfKi")} defaultValue={kriData.type} />
                </FormControl>

                <Box borderWidth="1px" borderRadius="md" p={4} mt={4}>
                  <Heading size="sm" mb={2}>Thresholds</Heading>
                  <FormControl>
                    <FormLabel>Threshold</FormLabel>
                    <Select {...register("thresholdType")} defaultValue="Target - higher value is worse">
                      <option>Target - higher value is worse</option>
                      <option>Target - lower value is worse</option>
                    </Select>
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Target</FormLabel>
                    <Input {...register("target")} defaultValue="0" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" mt={2}>
                    <Checkbox {...register("isPercentage")} mr={2} />
                    <FormLabel mb="0">Thresholds are percentages</FormLabel>
                  </FormControl>
                </Box>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <p>History content here...</p>
            </TabPanel>

            <TabPanel>
              <p>Actions content here...</p>
            </TabPanel>

            <TabPanel>
              <p>Linked Items content here...</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Stack direction="row" spacing={4} mt={6} justify="flex-end">
          <Button colorScheme="blue" type="submit">Save</Button>
          <Button onClick={onClose} colorScheme="red" type="reset">Cancel</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default KeyIndicatorComponent;
