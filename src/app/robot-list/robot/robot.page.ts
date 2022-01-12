import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RobotService } from 'src/app/robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.page.html',
  styleUrls: ['./robot.page.scss'],
})
export class RobotPage implements OnInit {
  modif: boolean = false;
  change:boolean = false;
  imageGood:boolean = false;
  robot: any = null;

  constructor(
    private Robot : RobotService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
     
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(["/tab/robots/"+id])
    this.Robot.get(id).subscribe((value: any) => {
      this.robot = value;
      this.setDOMDate();
      this.setImage();
    });
  }

  setDOMDate() : void{
    let date: Date;
    if(this.robot.releaseDate.seconds)
      // quand la date est importée de la base, seul les secondes figurent
      date = new Date(this.robot.releaseDate.seconds * 1000); 
    else
      // quand la date est modifiée , elle est déjà formattée
      date = this.robot.releaseDate;

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    this.robot.releaseDate = year +'-'+month+'-'+day;
  }

  async modification() {
    const alert = await this.alertCtrl.create({
      header: 'Êtes-vous sûr de vouloir modifier ce robot ?',
      buttons : [
        {
          text: "Annuler",
          role: "Cancel"
        },
        {
          text:"Confirmer",
          handler: () => {
            this.robot.releaseDate = new Date(this.robot.releaseDate);
            this.Robot.update(this.robot).subscribe(() => {
              this.change = true;
              console.log(this.robot.releaseDate);
              setTimeout(() => {
                this.change = false;
              }, 3000);
            });
            this.router.navigate(["/tab/robots"])
          }
        }
      ]
    });
    await alert.present();
  }

  setImage(){
    if ( (this.imageExists(this.robot.image)) && (this.robot.image !== "") ){
      this.imageGood = true;
    }
    else{
      this.imageGood = false;
    }
  }

  imageExists(image_url : string){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

  }

  async setModif(){
    if(!this.modif){
      const alert = await this.alertCtrl.create({
        header: 'Etes-vous sûr de vouloir rebdre ce robot modifiable ?',
        buttons : [
          {
            text: "Annuler",
            role: "Cancel"
          },
          {
            text:"Confirmer",
            handler: () => {
              this.modif = !this.modif;
            }
          }
        ]
      });
      await alert.present();
    }
    else
      this.modif = !this.modif;
    
  }

  async suppr(){
    const alert = await this.alertCtrl.create({
      header: 'Etes-vous sûr de vouloir supprimer ce robot ?',
      buttons : [
        {
          text: "Annuler",
          role: "Cancel"
        },
        {
          text:"Confirmer",
          handler: () => {
            this.Robot.delete(this.robot.id)
            this.router.navigate(["/tab/robots"])
          }
        }
      ]
    });
    await alert.present();
  }

}
