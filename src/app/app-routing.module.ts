import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentEditorComponent } from './component/document-editor/document-editor.component';

const routes: Routes = [
  {path:"", component:DocumentEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
