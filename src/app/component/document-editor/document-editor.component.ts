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
  //   this.documentEditorContainer.documentEditor.currentUser = 'John Doe';
  // this.documentEditorContainer.documentEditor.enableTrackChanges = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadDocumentFromJson();
    }, 200);
  }

  private loadDocumentFromJson(): void {
    this.documentEditorContainer.documentEditor.open(JSON.stringify(staticData));

  }
  onTrackChange(args: TrackChangeEventArgs) {
    // Handle track change events
    console.log('Track Change Details:', {
      author: 'current user',
      // type: args.type,
      time: new Date().toLocaleString(),
      changes: args
    });
  }
  
  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertAndOpenFile(file);  
    }
  }

  public convertAndOpenFile(file: File): void {
    const formData = new FormData();
    formData.append('files', file);

    const apiUrl = 'https://api.syncfusion.com/convert/doc-to-sfdt';
    
    this.http.post(apiUrl, formData, {
      headers: {
        'Authorization': `Bearer ${environment.syncfusionLicenseKey}`,
      },
      responseType: 'text'
    }).subscribe(
      (sfdt: string) => {
        this.documentEditorContainer?.documentEditor.open(sfdt);
      },
      (error) => {
        console.error('Error during conversion:', error);
        if (error.status === 0) {
          console.error('Network error or CORS issue');
        } else {
          console.error('API error:', error.status, error.message);
        }
      }
    );
  }
}
