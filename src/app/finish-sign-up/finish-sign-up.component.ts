import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { unescapeIdentifier } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finish-sign-up',
  templateUrl: './finish-sign-up.component.html',
  styleUrls: ['./finish-sign-up.component.scss'],
})
export class FinishSignUpComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data.register != undefined && data.register == 'true') {
        this.toastService.success('Register Successfully');
      }
    });
  }
}
