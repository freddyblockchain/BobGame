# BobGame

The project is not audited, and should never be used in a production setting

Alice finds Bob is a game about finding Bob, without going into bombs.

## Project Core Idea:

The project is about letting people vote on certain decisions through a common interface. In the game webpage, players should be able to vote for 4 different things: Going up, Going Right, Going Down, going Left. The action that gets the most votes are the direction that Alice goes. A vote results in an asset called TestChoiceCoin, that is sent from a source wallet to a wallet corresponding to a direction. 

There is no blockchain logic on the frontend. When pressing left for example, the backend sends a transaction from the wallet holding all the test choice coin, to a wallet corresponding to that direction. After 10 seconds, the balance of TestChoiceCoin is counted in each direction wallet, and the wallet with the most TestChoiceCoin wins. Afterwards Alice moves to that direction, and all the TestChoiceCoin in the direction wallets, are sent back to the source wallet. 

With this system, you could vote forever with the same number of coins, provided the direction wallets and source wallet has enough algo to pay the transaction fees. 

## Setup Guide:

Make sure the server for the game is running.
The server is found here: https://github.com/freddyblockchain/dao-project.git

git clone https://github.com/freddyblockchain/BobGame.git

npm install

yarn dev