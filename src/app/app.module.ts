import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { DocumentEditorComponent } from './component/document-editor/document-editor.component';
import { ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DocumentEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DocumentEditorContainerAllModule,
    HttpClientModule
  ],
  providers: [ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
