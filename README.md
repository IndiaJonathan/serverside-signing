## Example of serverside signing for Gala connect ##

This is an example of interacting with galachain via serverside signing and gala connect. You can modify it to use your own private key, and you can also use endpoitns from local or the stage gateway.

# Prequisite #
In order to test this locally, first follow the instructions at:
https://github.com/IndiaJonathan/galachain-baby-ops/blob/master/README.md

Once your local Galachain is running, and your Galachain baby ops is running you can follow the next steps


# Running Locally #
I use node 20, but any late version should work


1. npm i 
2. npm start


To test the server signing, try a get:
http://localhost:3000/test