import { ConferencesList } from '@/app/models/spreadsheet-model';

class Conferences {
  private static instance: Conferences;
  static update_amount_hours: number = 2;
  private conferences: ConferencesList = [];
  private lastUpdate: number | undefined;

  public static getInstance() {
    if (!Conferences.instance) {
      Conferences.instance = new Conferences();
    }

    return Conferences.instance;
  }

  public getLastUpdate() {
    return this.lastUpdate;
  }

  public getConferences() {
    return this.conferences;
  }

  public setConferences(newConferences: ConferencesList) {
    this.updateLastUpdate();
    this.conferences = newConferences;
  }

  public updateLastUpdate() {
    this.lastUpdate = Date.now();
  }
}

export default Conferences;
