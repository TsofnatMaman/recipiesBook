import { Component, Input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-timer',
  imports:[MatIconModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  @Input() time: any=0;
  private tempTime:number=0
  isRunning: boolean = false;
  private intervalId: any;
  private interval2:any;
  private interval3:any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    this.time=this.tempTime=changes['time'].currentValue
  }

  startTimer() {
    this.resetTimer()
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.time!--;
        if (this.time == 0) {
          this.end()
        }
      }, 1000);
    }
  }

  end() {
    clearInterval(this.intervalId)
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
    const playTone = (frequency: number, duration: number) => {
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'square'; // סוג הצליל, אפשר גם triangle או sine
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // התדר של הצליל
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      setTimeout(() => oscillator.stop(), duration);
    }
  
    // צפצופים בסגנון של טיימר/שעון מעורר
    const frequency = 400; // תדר נמוך יותר לצפצוף כמו של טיימר
    const duration = 300; // כל צפצוף יימשך 300ms
    const interval = 600; // הפסקה של 600ms בין כל צפצוף
  
    let j=0
    this.interval2 = setInterval(() => {
      this.time=(this.time==''?'stop':'')
      j++;
      if(j == 11){
        clearInterval(this.interval2)
      }
    }, 1000);

    // יצירת רצף של צפצופים קצרים
    playTone(frequency, duration);
    let i=0
    this.interval3=setInterval(()=>{
      i++
      setTimeout(() => playTone(frequency, duration),i* interval);
      if(i == 10){
        clearInterval(this.interval3)
      }
    },0)
      
  }    

  resetTimer() {
    this.time=this.tempTime
    clearInterval(this.intervalId);
    clearInterval(this.interval2)
    clearInterval(this.interval3)
    this.isRunning = false;
  }
}
