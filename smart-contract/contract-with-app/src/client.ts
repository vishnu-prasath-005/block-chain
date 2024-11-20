import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_THIRD_WEB_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});
