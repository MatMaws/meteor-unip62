import './list_crypto.html';
import './list_crypto.css';

import { Crypto } from '../../../api/crytocurrency/crytocurrency.js';
import { Wallets } from '../../../api/wallets/wallets.js';

// TODO : Insérer les souscriptions
Template.list_crypto.onCreated(function() {
    this.subscribe('crypto');
  });
// TODO : Insérer le helper
Template.list_crypto.onCreated(function() {
    this.autorun(() => {
      this.subscribe('crypto');
    });
  });

  Template.list_crypto.helpers({
    cryptos() {
      return Crypto.find();
    },
  });

  Template.list_crypto.onCreated(function() {
    this.subscribe('Wallets');
  });
  
  Template.crypto.helpers({
    inWallet() {
      return Wallets.findOne({
        $and: [{ code: this.code }, { owner: Meteor.userId() }],
      }).nbCoins;
    },
  });