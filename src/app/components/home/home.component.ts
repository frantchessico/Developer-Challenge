import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CountryInterface } from '../../model/country';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  public filterPosts = '';
  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'country',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };


  exportAsConfig: ExportAsConfig = {
    type: 'xls',
    elementIdOrContent: 'country', // the id of html/table element
  }

  public countries : CountryInterface[] = []
  constructor(
    private dataApi: ApiService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
     
    this.dataApi.getCountriesInffo().then(data => {
      data.forEach(data => {
        this.countries = data;
        console.log(data)

      });
    })
  }


  exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'country';
    }, 1000);
  }



  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'myFile').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = 'export.pdf';

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    // });
  }



  pdfCallbackFn (pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

}
