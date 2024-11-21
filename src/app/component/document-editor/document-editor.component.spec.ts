import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentEditorComponent } from './document-editor.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('DocumentEditorComponent', () => {
  let component: DocumentEditorComponent;
  let fixture: ComponentFixture<DocumentEditorComponent>;
  let httpTestingController: HttpTestingController;
  let mockFile: File;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentEditorComponent, DocumentEditorContainerComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentEditorComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    mockFile = new File(['dummy content'], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should make an HTTP request to convert DOCX to SFDT and open the file', () => {
    const apiUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import/';
    const mockSfdtResponse = '<SFDT>dummy</SFDT>'; 

    
    const mockSfdtBlob = new Blob([mockSfdtResponse], { type: 'application/xml' });

    const mockFile = new File([mockSfdtBlob], 'test.sfdt', { type: 'application/xml', lastModified: Date.now() });

    spyOn(component.documentEditorContainer.documentEditor, 'open'); 


    const req = httpTestingController.expectOne(req => req.method === 'POST' && req.url === apiUrl);
    expect(req).toBeTruthy();

    req.flush(mockSfdtResponse); 
    
    
    expect(component.documentEditorContainer.documentEditor.open).toHaveBeenCalledWith(mockFile);
  });

  it('should handle API error correctly when converting DOCX to SFDT', () => {
    const apiUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import/';
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    spyOn(console, 'error'); 


    const req = httpTestingController.expectOne(req => req.method === 'POST' && req.url === apiUrl);
    expect(req).toBeTruthy();

   
    req.flush('API error', mockError);

    
    expect(console.error).toHaveBeenCalledWith('API error:', mockError.status, mockError.statusText);
  });

  it('should handle network error correctly during conversion', () => {
    const apiUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import/';
    const mockError = { status: 0, statusText: 'Unknown Error' };

    spyOn(console, 'error');


    const req = httpTestingController.expectOne(req => req.method === 'POST' && req.url === apiUrl);
    expect(req).toBeTruthy();

   
    req.flush('Network error', mockError);

   
    expect(console.error).toHaveBeenCalledWith('Network error or CORS issue', mockError);
  });

  afterEach(() => {
    
    httpTestingController.verify();
  });
});
