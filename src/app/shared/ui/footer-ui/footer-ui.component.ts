import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-footer-ui',
    templateUrl: './footer-ui.component.html',
    styleUrls: ['./footer-ui.component.less'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterUiComponent {

}
