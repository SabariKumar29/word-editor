import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit {

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
          (document.querySelector('ejs-documenteditorcontainer') as any).documentEditor.open(data);
        };
        fileReader.readAsText(blob);
      });
  }

}
