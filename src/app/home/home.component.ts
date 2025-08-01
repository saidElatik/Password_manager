import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule , RouterModule , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  @ViewChild('passwordPopup')passwordPopup!:ElementRef
  @ViewChild('toastCopy')toastCopy!:ElementRef
  @ViewChild('accountSettings')accountSettings!:ElementRef

  formGroup: FormGroup;
  searchTerm: string = '';  // Added search term variable

  password = '';
  name = '' ;
  userName = '' ;
  id = 0 ;

  isNew : any


  passwordsArr = [
    {id : 1, name: 'Steam', password: '07oOMv^@Dn' , userName : 'hamun_yt' },
    {id : 2, name: 'Activision', password: 'hbMmwG3gLnh5' , userName : 'said.elatik.603@gmail.com' },
    {id : 3, name: 'Gmail 1', password: 'said elatik 603' , userName : 'said.elatik.603@gmail.com' },
    {id : 4, name: 'Gmail 1', password: 'said elatik 602' , userName : 'said.elatik.602@gmail.com' },
    {id : 6, name: 'Facebook', password: 'said.elatik.602@gmail.com' , userName : 'said elatik 602' },
    {id : 7, name: 'Discord', password: 'said.elatik.602@gmail.com' , userName : 'said elatik 602' },
    {id : 8, name: 'Microsoft', password: 'said.elatik.602@gmail.com' , userName : 'said elatik 602' },
    {id : 9, name: 'Epic games', password: 'said.elatik.602@gmail.com' , userName : 'said elatik 602' },
    {id : 9, name: 'Chess.com', password: 'said.elatik.602@gmail.com' , userName : 'said elatik 602' },
  ]

  constructor(
    private formBuilder: FormBuilder ,
    @Inject(DOCUMENT) private document: Document,
  ){
    this.formGroup = this.formBuilder.group({
      id : [this.id , Validators.required],
      name: [this.name , Validators.required],
      password: [this.password , Validators.required],
      userName : [this.userName , Validators.required],
    });
  }

  isAccountSettingsOpen = false

  toggleAccount(){
    if(this.isAccountSettingsOpen){
      this.closeAccountSettings()
    }else{
      this.openAccountSettings()
    }
  }

  togglePass(id : any){
    this.document.getElementById(id)?.classList.toggle('hidden')
    this.document.getElementById(`${id}a`)?.classList.toggle('true')
    if(this.document.getElementById(`${id}a`)?.classList.contains('true')){
      this.document.getElementById(`${id}a`)?.setAttribute('src' , 'imgs/showPass.svg')
    }else {
      this.document.getElementById(`${id}a`)?.setAttribute('src' , 'imgs/hidePass.svg')
    }
  }

  get filteredPasswordsArr() {
    return this.passwordsArr.filter(pass => 
      pass.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch() {
    console.log('Searching for:', this.searchTerm);
  }

  openAccountSettings(){
    this.isAccountSettingsOpen = true
    this.accountSettings.nativeElement.classList.remove('hidden');
    setTimeout(() => this.accountSettings.nativeElement.classList.remove('opacity-0') , 200)
  }
  closeAccountSettings(){
    this.isAccountSettingsOpen = false
    this.accountSettings.nativeElement.classList.add('opacity-0')
    setTimeout(() => this.accountSettings.nativeElement.classList.add('hidden') , 200)
  }

  onSubmit() {

  }

  create(){
    console.log(this.formGroup.value);
  }

  openPasswordPopup(isnew:boolean){
    this.isNew = isnew

    if(this.isNew){
      this.formGroup.patchValue({
        password: '',
        name: '',
        id: 0,
        userName: ''
      });
    }

    this.document.querySelector('body')?.classList.add('overflow-hidden');
    this.passwordPopup.nativeElement.classList.remove('hidden');
    setTimeout(() => this.passwordPopup.nativeElement.classList.remove('opacity-0') , 200)
  }
  closePasswordPopup(){
    this.document.querySelector('body')?.classList.remove('overflow-hidden');
    this.passwordPopup.nativeElement.classList.add('opacity-0')
    setTimeout(() => this.passwordPopup.nativeElement.classList.add('hidden') , 200)
  }
  openCopied(){
    this.toastCopy.nativeElement.classList.remove('hidden');
    setTimeout(() => this.toastCopy.nativeElement.classList.remove('opacity-0') , 200)
    setTimeout(() => this.closeCopied() , 1500)
  }
  closeCopied(){
    this.toastCopy.nativeElement.classList.add('opacity-0')
    setTimeout(() => this.toastCopy.nativeElement.classList.add('hidden') , 200)
  }





  

  editPassword(password: string, name: string, userName: string, id: number) {
    this.formGroup.patchValue({
      password: password,
      name: name,
      id: id,
      userName: userName
    });
  
    this.openPasswordPopup(false);
  }

  copyToClipboard(copy : any){
    navigator.clipboard.writeText(copy);
    this.openCopied()
  }

}
