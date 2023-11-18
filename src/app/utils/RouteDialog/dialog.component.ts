import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(tuiDialogService: TuiDialogService, private route: ActivatedRoute, private router: Router) {
    tuiDialogService.open(
      new PolymorpheusComponent(
        route.snapshot.data['dialog']
      )
    ).subscribe({
      // при завершении потока возвращаемся
      complete: () => this.navigateToParent(),
    });
  }
  private navigateToParent(): void {
    this.router.navigate([this.route.snapshot.data['backUrl']], {
      relativeTo: this.route
    });
  }
}
