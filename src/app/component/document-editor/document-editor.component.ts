import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit {
  @ViewChild('documentEditorContainer')
  public documentEditorContainer!: DocumentEditorContainerComponent;

  constructor() { }

  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  public serviceUrl: string = `${this.hostUrl}api/documenteditor/`;

  ngOnInit(): void {
  }

  public onCreate(): void {
    console.log("Document Editor Initialized");
  }

  public onLoadDefaultDoc(): void {
    fetch('./assets/sample.docx')
      .then((res) => res.blob())
      .then((blob) => {
        const fileReader = new FileReader();
        fileReader.onload = (e: any) => {
          const data = e.target.result as string;
          this.documentEditorContainer.documentEditor.open(data);
        };
        fileReader.readAsArrayBuffer(blob);
      });
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      this.documentEditorContainer.documentEditor.open(content);
    };
    reader.readAsArrayBuffer(file);
  }
}