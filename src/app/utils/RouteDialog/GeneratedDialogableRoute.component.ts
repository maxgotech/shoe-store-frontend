import { Route } from "@angular/router";
import { DialogComponent } from "./dialog.component";

export function GenerateDialogableRoute(component: any, path: string): Route {
	return {
		path,
		component: DialogComponent,
		data: {
			dialog: component,
			// вычисляет обратный путь заменой сегментов пути на две точки
			backUrl: path.split('/').map(() => '..').join('/')
		}
	}
}