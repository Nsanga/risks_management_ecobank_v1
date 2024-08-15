import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
// import { Logo } from './logo'
import { PasswordField } from "./PasswordField";
import { connect, useDispatch } from "react-redux";
import { useState } from "react";
import logo from "assets/img/logoMakeda.png";
import { loginRequest } from "redux/login/action";

const CameroonFlag = () => (
  // Ajoutez ici le composant d'icône du drapeau du Cameroun
  <Image
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/langfr-225px-Flag_of_Cameroon.svg.png"
    alt="Drapeau du Cameroun"
    w={8}
    h={6}
    borderRadius={3}
  />
);

const SignIn = ({ error }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    // Vérifiez les champs manquants et mettez à jour les messages d'erreur
    if (!email) {
      setEmailError("Veuillez entrer une adresse mail valide.");
    }

    if (!password) {
      setPasswordError("Veuillez entrer un mot de passe valide.");
    }

    // Si des champs sont manquants, arrêtez la procédure de connexion
    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      dispatch(loginRequest(email, password));
      // Simulez une attente (remplacez cela par votre logique de connexion réelle)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Une fois la connexion réussie ou échouée, arrêtez le chargement
      setIsLoading(false);
    } catch (error) {
      // Gérer les erreurs ici
      setIsLoading(false);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email" isRequired>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </FormControl>
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <Box />
          <Stack spacing={6}>
              <Button
                bg="blue.300"
                color="white"
                isLoading={isLoading}
                disabled={!email || !password}
                loadingText="Connexion"
                spinnerPlacement="end"
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={handleLogin}
              >
                Connexion
              </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://www.easyproject.com/EasyProject/media/site-images/news/5-mistakes-risk-management.png?width=1920&height=0&rmode=min&quality=80&token=ZzQQBwMD7TwgChHP0D%2F62UiPyHq2aq90tcqewnAgWpI%3D"
          }
        />
      </Flex>
    </Stack>
  );
};

const mapStateToProps = ({ LoginReducer }) => ({
  token: LoginReducer.token,
  loading: LoginReducer.loading,
  error: LoginReducer.error,
});

export default connect(mapStateToProps)(SignIn);
