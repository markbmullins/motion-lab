import React from 'react';
import { createRoot } from 'react-dom/client';
import { SettingsProvider } from './player/settings';
import App from './App';
import './styles/base.css';
import './styles/studies.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><SettingsProvider><App /></SettingsProvider></React.StrictMode>);
