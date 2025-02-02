import React, { useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "redux/events/action";
import toast from "react-hot-toast";

export function SearchBar(props) {
  const { variant, background, children, borderRadius, ...rest } = props;
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const [value, setValue] = React.useState('1');
  const [inputValue, setInputValue] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('RSK');
  const history = useHistory();
  const dispatch = useDispatch();

  const events = useSelector(state => state.EventReducer.events);
  const loading = useSelector(state => state.EventReducer.loading);

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  const handleSearch = async () => {
    if (value === '3') {
      // Si l'option sélectionnée est "Event"
      try {
        // Filtrer l'événement correspondant au numéro de référence saisi
        const event = events.find(event => event.num_ref === inputValue);
        if (event) {
          // Rediriger vers la vue de l'événement avec les données récupérées
          history.push({
            pathname: '/admin/event',
            state: { event, loading }
          });
        } else {
          toast.error('Aucun événement trouvé avec ce numéro de référence.');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    } else {
      // Logique de recherche pour les autres options si nécessaire
      console.log('Recherche pour les autres options non implémentée');
    }
  };

  const handleRadioChange = (nextValue) => {
    setValue(nextValue);
    const placeholders = {
      '1': 'RSK',
      '2': 'CTL',
      '3': 'EVT',
      '4': 'ENT',
      '5': 'ACT',
      '6': 'KRI',
    };
    setPlaceholder(placeholders[nextValue]);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
      setInputValue(input);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 15, marginRight: 15 }}>
      <RadioGroup onChange={handleRadioChange} value={value}>
        <Stack direction='row'>
          <Radio value='1'><span style={{ fontSize:12}}>Risk</span></Radio>
          <Radio value='2'><span style={{ fontSize:12}}>Control</span></Radio>
          <Radio value='3'><span style={{ fontSize:12}}>Event</span></Radio>
          <Radio value='4'><span style={{ fontSize:12}}>Entity</span></Radio>
          <Radio value='5'><span style={{ fontSize:12}}>Action</span></Radio>
          <Radio value='6'><span style={{ fontSize:12}}>Key Indicator</span></Radio>
        </Stack>
      </RadioGroup>
      <Box style={{ width: 180 }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Box fontSize={12}>{placeholder}</Box>
          </InputLeftElement> 
          <Input
          fontSize={12}
            placeholder='ref number'
            value={inputValue}
            onChange={handleInputChange}
            // pl={placeholder.length * 8} // Adjust the padding to fit the prefix length
          />
          <IconButton
          ml={4}
            aria-label='Search database'
            icon={<SearchIcon />}
            variant='solid'
            size="md"
            onClick={handleSearch}
          />
        </InputGroup> 
      </Box>
    </div>
    
  );
}
