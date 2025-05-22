import React, { useState } from 'react';
import {
    VStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Checkbox,
    Heading,
} from '@chakra-ui/react';

// Composant pour le formulaire Control List
const ControlListForm = () => {
    const [formData, setFormData] = useState({
        controlName: '',
        description: '',
        riskLevel: '',
        frequency: '',
        responsible: '',
        status: false
    });

    return (
        <VStack spacing={4} align="stretch">
            <Heading size="md" color="blue.600">Control List Form</Heading>

            <FormControl>
                <FormLabel>Control Name</FormLabel>
                <Input
                    value={formData.controlName}
                    onChange={(e) => setFormData({ ...formData, controlName: e.target.value })}
                    placeholder="Enter control name"
                />
            </FormControl>

            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the control"
                    rows={4}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Risk Level</FormLabel>
                <Select
                    value={formData.riskLevel}
                    onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                    placeholder="Select risk level"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Frequency</FormLabel>
                <Select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    placeholder="Select frequency"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Responsible Person</FormLabel>
                <Input
                    value={formData.responsible}
                    onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                    placeholder="Enter responsible person"
                />
            </FormControl>

            <FormControl>
                <Checkbox
                    isChecked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                >
                    Control is Active
                </Checkbox>
            </FormControl>

            <Button colorScheme="blue" size="lg">
                Save Control
            </Button>
        </VStack>
    );
};

export default ControlListForm;