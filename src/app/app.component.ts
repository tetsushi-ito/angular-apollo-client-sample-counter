import { Component, OnInit } from '@angular/core';
import ApolloClient from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { resolvers, defaults } from '../graphql/resolvers';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  client;
  counter = 0;

  ngOnInit() {
    const cache = new InMemoryCache();

    const stateLink = withClientState({ cache, resolvers, defaults });

    const link = ApolloLink.from([stateLink]);

    this.client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    this.client.watchQuery({
      query: queries.getCurrentCounter,
    }).subscribe(({ data: { counter: { current } } }) => {
      this.counter = current;
    });
  }

  onIncrementClick() {
    this.client.mutate({
      mutation: mutations.increment,
    });
  }

  onDecrementClick() {
    this.client.mutate({
      mutation: mutations.decrement,
    });
  }
}
