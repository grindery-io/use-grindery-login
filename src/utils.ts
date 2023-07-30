declare global {
  interface Window {
    _hsq?: any[];
    LOQ?: any[];
  }
}

export const identifyUserInHubspot = (userId: string, email: string) => {
  let _hsq = (window._hsq = window._hsq || []);
  _hsq.push([
    'identify',
    {
      email: email,
      id: userId,
    },
  ]);
};

export const identifyUserInLuckyOrange = (userId: string, email: string) => {
  window.LOQ = window.LOQ || [];
  window.LOQ.push([
    'ready',
    async (LO: any) => {
      await LO.$internal.ready('visitor');
      LO.visitor.identify(userId, { email: email });
    },
  ]);
};
