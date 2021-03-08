/*import asnycWhile from "async-while";
export default class syncCue<dataScheme> {
  cue: dataScheme[];
  working: boolean;
  func: (data: dataScheme) => void;
  constructor(func: (dataScheme) => void) {
    this.working = false;
    this.func = func;
  }
  async add(data: dataScheme) {
    this.cue.push(data);
    if (!this.working) {
      this.process();
    }
  }
  private async process(data: dataScheme) {
    async;
    while (this.cue.length > 0) {
      if (!this.working) {
        this.working = true;
        await this.func(data);
      }
    }
  }
}
*/
