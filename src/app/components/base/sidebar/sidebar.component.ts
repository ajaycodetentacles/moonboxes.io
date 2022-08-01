import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TokenomicsService } from 'src/app/services/tokenomics.service';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { WalletConnectComponent } from '../wallet/connect/connect.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  active = false;
  data:any

  constructor(
    private tokenomicsService: TokenomicsService,
    private walletConnectService: WalletConnectService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService

  ) { }

  ngOnInit(): void {
    this.tokenomicsService.whenToggled().subscribe((state:boolean) => {
      this.toggleTokenomicsView(state);
    });
  }

  toggleTokenomicsView( active: boolean = null ) {
    this.active = active || !this.active;
  }

  openDialog(): void {

        let dialogRef = this.dialog.open(WalletConnectComponent, {
          width: 'auto',
          // data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
          // this.animal = result;
        });


    debugger

  }

 async isConnected() {
    try{
      let isValidAddress=await this.walletConnectService.isValidAddress();
      console.log(isValidAddress);
      if(isValidAddress) {
        this.walletConnectService.setWalletDisconnected();
        window.location.reload();

      }
      else{
        this.openDialog();
      }
     }
     catch(e)
     {
      this.openDialog();
       console.log(e);
     }
  }
}
