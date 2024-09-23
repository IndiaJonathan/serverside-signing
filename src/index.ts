import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import { PublicKeyApi, ServerSigningClient } from '@gala-chain/connect';
import { ethers } from 'ethers';

const local = true;

//Use this for local along with https://github.com/IndiaJonathan/galachain-baby-ops/blob/master/README.md
const localRestServer = "http://localhost:3001/asset/"

//Use this for gateway, todo: allow users to register here
const stageRestServer = "https://galachain-gateway-chain-platform-stage-chain-platform-eks.stage.galachain.com/asset/"
const app = express();

app.use(express.json());

app.get('/test', async (req: Request, res: Response) => {
    const randomWallet = ethers.Wallet.createRandom();

    try {
        const response = await fetch(`http://localhost:3001/registerself/${randomWallet.publicKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        console.log(`Data: ${JSON.stringify(data)}`)
    } catch (error) {
        res.status(500).send({ error: 'Failed to send POST request', details: error });
    }

    const connection = new ServerSigningClient(randomWallet.privateKey)

    const uri = (local ? localRestServer : stageRestServer) + 'PublicKeyContract';
    const publicKeyClient = new PublicKeyApi(uri, connection);
    const profile = await publicKeyClient.GetMyProfile();
    res.send(profile);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
