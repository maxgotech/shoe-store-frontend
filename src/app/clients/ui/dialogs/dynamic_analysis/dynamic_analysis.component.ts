import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-dynamic-analysis',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dynamic_analysis.component.html',
  styleUrl: './dynamic_analysis.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicAnalysisComponent {
  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>) { 
    this.data=this.getData
  }

  showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }

  data:any

  get getData(): number {
    return this.context.data;
}

}
