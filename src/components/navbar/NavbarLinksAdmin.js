// Chakra Imports
import {
	Avatar,
	Box,
	Button,
	Flex,
	Icon,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
// Assets
import navImage from 'assets/img/layout/Navbar.png';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import routes from 'routes.js';
import { ThemeEditor } from './ThemeEditor';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from 'redux/login/action';
export default function HeaderLinks(props) {
	const { secondary } = props;

	const adminName = localStorage.getItem('username')
	const dispatch = useDispatch();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		dispatch(logoutSuccess());
		window.location.href = "/auth/login"
	};

	const getInitials = (name) => {
		const words = name.split(' ');
		if (words.length === 1) {
			return name.slice(0, 2).toUpperCase();
		} else if (words.length >= 2) {
			const firstWord = words[0].slice(0, 1).toUpperCase();
			const secondWord = words[1].slice(0, 1).toUpperCase();
			return `${firstWord}${secondWord}`;
		} else {
			return '';
		}
	};
	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');
	const ethColor = useColorModeValue('gray.700', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const ethBox = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px" />
			<SidebarResponsive routes={routes} />

			<Menu>
			<MenuButton p="0px">
					<Box
						_hover={{ cursor: 'pointer' }}
						bg="blue.500"
						size="sm"
						w="40px"
						h="40px"
						display="flex"
						justifyContent="center"
						alignItems="center"
						borderRadius="50%"
						color="white"
					>
						<Text fontSize="md" fontWeight="bold">
						{adminName && getInitials(adminName)}
						</Text>
					</Box>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Salut, {adminName}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem
							onClick={handleLogout}
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px">
							<Text fontSize="sm">Déconnexion</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
