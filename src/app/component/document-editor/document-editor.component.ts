import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentEditorContainerComponent, TrackChangeEventArgs  } from '@syncfusion/ej2-angular-documenteditor';
import { environment } from 'src/environments/environment';
import {staticData} from '../../../../src/data-default';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit {

  @ViewChild('documentEditorContainer') documentEditorContainer!: DocumentEditorContainerComponent;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.documentEditorContainer.serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/',
    // this.documentEditorContainer.locale='en-US'
 
  }

  ngAfterViewInit(): void {
    // const documenteditor=this.documentEditorContainer.documentEditor;
    // documenteditor.contentChange=this.onContentChange.bind(this);

    
  }
 
  onContentChange(event: any) {
    console.log('content has been changed !',event)
    const content = this.documentEditorContainer.documentEditor.serialize();
    console.log('Current Document Content:', content);
  }

 
  
  // public onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.convertAndOpenFile(file);  
  //   }
  // }

  // public convertAndOpenFile(file: File): void {
  //   const formData = new FormData();
  //   formData.append('files', file);

  //  // const apiUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import/';
    
  //   this.http.post(this.documentEditorContainer.serviceUrl+'Import', formData, {
  //     headers: {
  //       'Authorization': `Bearer ${environment.syncfusionLicenseKey}`,
  //     },
  //     responseType: 'text'
  //   }).subscribe(
  //     (sfdt: string) => {
  //       this.documentEditorContainer?.documentEditor.open(sfdt);
  //     },
  //     (error) => {
  //       console.error('Error during conversion:', error);
  //       if (error.status === 0) {
  //         console.error('Network error or CORS issue');
  //       } else {
  //         console.error('API error:', error.status, error.message);
  //       }
  //     }
    // );
  // }
}
