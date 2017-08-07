import { Component } from '@angular/core';

import { RankingPage } from '../ranking/ranking';
import { GamesPage } from '../games/games';
import { RulesPage } from '../rules/rules';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = RankingPage;
  tab2Root: any = GamesPage;
  tab3Root: any = RulesPage;

  constructor() {

  }
}
