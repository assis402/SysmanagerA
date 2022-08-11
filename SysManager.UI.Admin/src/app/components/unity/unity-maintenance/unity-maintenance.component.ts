import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { UnityView } from '../models/unity-view';
import { UnityPost } from '../models/unity-post';
import { UnityPut } from '../models/unity-put';
import { UnityService } from '../../../services/unity-service';
import { Utils } from 'src/app/utils/utils';

@Component({
selector:'app-unity-maintenance',
templateUrl:'./unity-maintenance.component.html'
})

export class UnityMaintenanceComponent implements OnInit {


  returnUrl: string ='/unity/unity';
    @Input() modalTitle = ''
    @Input() modalBodyDetail = ''
    public setModalVisible = false;

    action = 'Inserir';
    @Input() id: any = '';
    idDefault = Guid.EMPTY;


    unity = new UnityView();
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private activedRouter: ActivatedRoute,
                private spinner: NgxSpinnerService,
                private unityService: UnityService,
                private utils: Utils
                ) {}

    formUnity = new FormGroup({
                                id: this.formBuilder.control(this.unity.id),
                                name: this.formBuilder.control(this.unity.name),
                                active: this.formBuilder.control(this.unity.active)
                              });
                
    ngOnInit(){
        this.id = this.activedRouter.snapshot.params['id'];
        if (this.id != undefined && this.id != this.idDefault && this.id != null) {
          this.action = 'Alterar';
          this.getById(this.id);
        } else {
          this.action = 'Inserir';
          this.unity = new UnityView();
          this.formUnity.patchValue(this.unity);
        }
    }

    getById(id: string) {
        this.spinner.show();
        this.unityService.getByID(id).subscribe(view => {
          this.unity = view;
          this.updateForm(this.unity);
          this.spinner.hide();
        }, error  => {
          this.utils.showErrorMessage(error,this.action)
          this.spinner.hide();
        });
    }

    updateForm(category: UnityView){
        this.formUnity = new FormGroup({
          id: this.formBuilder.control(category.id),
          name: this.formBuilder.control(category.name),
          active: this.formBuilder.control(category.active),});  
    }

    confirmdelete(){
      if (this.unity.id !== undefined && this.unity.id != '')
      {
         this.spinner.show();
         this.unityService.delete(this.unity.id).subscribe((response: any) => {
              this.spinner.hide();
              this.utils.showSuccessMessage(response.message,'sucesso');
          }, error => {
              this.spinner.hide();
              this.utils.showErrorMessage(error,this.action);
          });
          this.setModalVisible = false;
          this.router.navigateByUrl(this.returnUrl);
      }
    }

    canceldelete(){
        this.setModalVisible = false;
    }

    prepareDelete(){
      this.modalTitle = 'Exclusão de unidade de medida';
      this.modalBodyDetail = 'Deseja realmente excluir o registro ('+this.unity.name+') ?';
    }
    saveChanges(category:any){
     if(this.unity.id === undefined || this.unity.id ==='') {
       this.insertCategory(category);
     } else {
       this.updateCategory(category);
     }
    }

    insertCategory(unity: UnityView){
      const unityPost = new UnityPost(unity);
      this.spinner.show();
      this.unityService.insert(unityPost).subscribe((response: any) => {
           this.spinner.hide();
           this.utils.showSuccessMessage(response.message,'sucesso');
       }, error => {
           this.spinner.hide();
           this.utils.showErrorMessage(error,this.action);
       });
    }
    
    updateCategory(unity: UnityView){
      const unityPut = new UnityPut(unity);
      this.spinner.show();
      this.unityService.update(unityPut).subscribe((response: any) => {
           this.spinner.hide();
           this.utils.showSuccessMessage(response.message,'sucesso');
       }, error => {
           this.spinner.hide();
           this.utils.showErrorMessage(error,this.action);
       });
    }    
}