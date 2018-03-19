import './navbar.html';
import './navbar.css';

import { Template } from 'meteor/templating';

// TODO: Ajouter les helpers
Template.navbar.helpers({
  dollarWallet() {
    return 9876;
  },
  currency: 'dollars',
});

Template.navbar.onCreated(function() {
    this.autorun(() => {
      this.subscribe('Wallets');
    });
  });
  
  Template.navbar.helpers({
    dollarWallet() {
      return (
        Wallets.findOne({ $and: [{ owner: Meteor.userId() }, { code: 'usdt' }] })
          .nbCoins | 0
      );
    },
  });

  Template.navbar.onCreated(function() {
    this.autorun(() => {
      this.subscribe('Wallets');
      this.subscribe('Sales.owner');
    });
  });
  
  Template.navbar.helpers({
    dollarWallet() {
      return (
        Wallets.findOne({ $and: [{ owner: Meteor.userId() }, { code: 'usdt' }] })
          .nbCoins | 0
      );
    },
    salesCount() {
      return Sales.find({ owner: Meteor.userId(), buyerId: '' }).count();
    },
  });