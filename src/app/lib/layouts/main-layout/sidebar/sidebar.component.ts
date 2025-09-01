import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { debounceSignal } from '@lib/utils/debounceSignal';
import { TranslatePipe } from '@ngx-translate/core';
import { SHOWCASE_ITEMS } from './sidebar-items';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe, RouterLink, RouterLinkActive, ButtonModule, IconComponent, ToggleThemeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly sidebarItems = SHOWCASE_ITEMS;

  readonly isOpen = signal(true);
  readonly isOpened = debounceSignal(this.isOpen, 300, this.isOpen());
  readonly shouldShowLabels = computed(() => this.isOpen() && this.isOpened());

  toggleSidebar(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
