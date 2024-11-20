import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { DocumentEditorComponent } from './component/document-editor/document-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DocumentEditorContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
