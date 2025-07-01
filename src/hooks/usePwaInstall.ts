'use client';

import { useEffect, useState } from 'react';

let savedPrompt: any = null;

export default function usePwaInstall() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      savedPrompt = e;
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!savedPrompt) return;
    savedPrompt.prompt();
    const { outcome } = await savedPrompt.userChoice;
    savedPrompt = null;
    setIsInstallable(false);
  };

  return {
    isInstallable,
    install,
  };
}
