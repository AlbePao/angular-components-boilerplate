import { inject, Provider, Service } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { APP_TITLE } from '@lib/constants';

@Service()
export class AppTitleStrategy extends TitleStrategy {
  private readonly _title: Title = inject(Title);

  public updateTitle(snapshot: RouterStateSnapshot): void {
    // PageTitle is equal to the "Title" of a route if it's set
    // If its not set it will use the "title" given in index.html
    const pageTitle = this.buildTitle(snapshot) ?? this._title.getTitle();
    this._title.setTitle(`${pageTitle} | ${APP_TITLE}`);
  }
}

export const provideTitleStrategy = (): Provider => ({
  provide: TitleStrategy,
  // Will tell Angular DI to inject our CustomTitleStrategy class when TitleStrategy is requested
  useClass: AppTitleStrategy,
});
