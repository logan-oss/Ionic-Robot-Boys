import { Component, OnInit } from '@angular/core';
import { RobotService } from '../robot.service';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.page.html',
  styleUrls: ['./robot-list.page.scss'],
})
export class RobotListPage implements OnInit {
  robots!: any;

  constructor(
    private Robot: RobotService,
    private speechRecognition: SpeechRecognition
  ) { }

  ngOnInit() {
    this.Robot.getAllRobots().subscribe((data: any) => {
      this.robots = data;
    });

    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => {
      if(available) console.log("it is")
      else console.log("is not");
    });
  }

  getPerm(){
    this.speechRecognition.requestPermission()
    .then(
      () => alert('Granted'),
      () => alert('Denied')
    )
  }
  start(){
    this.speechRecognition.startListening()
    .subscribe(
      (matches: string[]) => alert(matches),
      (onerror) => console.log('error:', onerror)
    )
  }
  stop(){
    this.speechRecognition.stopListening()
  }

}
