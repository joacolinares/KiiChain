import { createThirdwebClient } from "thirdweb";

const CLIENT_ID = "1bce034388838ebf8d373e3487f2459d";

export const client = createThirdwebClient({
  clientId: CLIENT_ID as string,
});


import { polygon } from "thirdweb/chains";

export const myChain = polygon;

