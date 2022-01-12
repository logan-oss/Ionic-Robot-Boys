import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Robot } from 'src/app/models/robot.model';
import { RobotService } from 'src/app/robot.service';

@Component({
  selector: 'app-robot-new',
  templateUrl: './robot-new.page.html',
  styleUrls: ['./robot-new.page.scss'],
})
export class RobotNewPage implements OnInit {
  robot!: Robot;
  imageGood:boolean = false;
  constructor(
    private Robot: RobotService,
    private router: Router
  ) { }

  ngOnInit() {
    this.robot = new Robot();
    this.router.navigate(["/tab/robots/new"]);
    this.setImage();
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

  async onAdd(){
    this.robot.releaseDate = new Date(this.robot.releaseDate);
    this.Robot.saveNewRobot(this.robot).subscribe(() => {
      this.robot = new Robot();
    })
    this.router.navigate(["/tab/robots"])
  }
}
