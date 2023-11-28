import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiTableModule } from '@taiga-ui/addon-table';
@Component({
  selector: 'app-abc-analysis',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule
  ],
  templateUrl: './abc_analysis.component.html',
  styleUrl: './abc_analysis.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbcAnalysisComponent {
  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>) { 
    this.data=this.getData
    console.log(this.data[0])
  }

  showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }

  data:any

  get getData(): number {
    return this.context.data;
  }

  readonly columns = ['prod','abc','part','sum_part']

}
