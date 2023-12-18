import React, { useState } from 'react';
import i18n from  'i18next';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Estado inicial del idioma

  // Manejar el cambio de idioma
  const handleChangeLanguage = (event :any) => {
    const newLanguage = event.target.value;
    console.log('Cambio de idioma: ',newLanguage)
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage)

  };

  return (
    <div>
      <select id="language" value={selectedLanguage} onChange={handleChangeLanguage}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelector;