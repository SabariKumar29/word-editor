import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent {
  @ViewChild('documentEditorContainer') documentEditorContainer!: DocumentEditorContainerComponent;

  constructor(private http: HttpClient) {}

  // Method to handle file change
  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertAndOpenFile(file);  // Call method to convert DOCX to SFDT and open it
    }
  }

  // Method to convert DOCX to SFDT and open in Document Editor
  public convertAndOpenFile(file: File): void {
    const formData = new FormData();
    formData.append('files', file);

    // Syncfusion API endpoint for DOCX to SFDT conversion
    const apiUrl = 'https://api.syncfusion.com/convert/doc-to-sfdt';
    
    // Call the API to convert the file
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
