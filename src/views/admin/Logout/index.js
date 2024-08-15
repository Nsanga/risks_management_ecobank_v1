// Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutSuccess } from 'redux/login/action';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    // Supprimer les éléments du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Dispatch de l'action logoutSuccess pour mettre à jour l'état Redux
    dispatch(logoutSuccess());
    // Redirection vers l'écran de connexion
    window.location.href = "/auth/login"
  };

  // Appeler la fonction de déconnexion dès que le composant est rendu
  React.useEffect(() => {
    handleLogout();
  }, []);

  // Ce composant ne rend rien directement, car il redirige immédiatement vers l'écran de connexion
  return null;
};

export default Logout;
