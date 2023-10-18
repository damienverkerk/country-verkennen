import React from 'react';
import { useUserPreferences } from '../../../contexts/UserPreferencesContext';

const PreferencesForm = () => {
  const { preferences, setPreferences } = useUserPreferences();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setPreferences((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  return (
    <div>
      <h2>Gebruikersvoorkeuren</h2>
      <label>
        kustgebieden:
        <input
          type="checkbox"
          name="prefersCoastal"
          checked={preferences.prefersCoastal}
          onChange={handleChange}
        />
      </label>
      <label>
        berggebieden:
        <input
          type="checkbox"
          name="prefersMountains"
          checked={preferences.prefersMountains}
          onChange={handleChange}
        />
      </label>
      <label>
        Klimaat:
        <select name="climate" value={preferences.climate} onChange={handleChange}>
          <option value="cold">Koud</option>
          <option value="temperate">Gematigd</option>
          <option value="warm">Warm</option>
        </select>
      </label>
    </div>
  );
};

export default PreferencesForm;
