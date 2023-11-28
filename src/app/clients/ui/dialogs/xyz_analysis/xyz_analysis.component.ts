import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiTableModule } from '@taiga-ui/addon-table';
@Component({
  selector: 'app-xyz-analysis',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule
  ],
  templateUrl: './xyz_analysis.component.html',
  styleUrl: './xyz_analysis.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XyzAnalysisComponent {
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

  readonly columns = ['prod','xyz','coef_var']

}
