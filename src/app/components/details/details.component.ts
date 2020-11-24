import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    private api: ApiService
    ) { }

  ngOnInit(): void {
     this.aRouter.params.forEach(param => {
       this.api.getCountriesInffo().then(countries => {
        countries.forEach(docs => {
          const name = param.name;
         const country = docs.find(country => country.name === name)
         console.log(country)

        })
       })
     })


  }

}
