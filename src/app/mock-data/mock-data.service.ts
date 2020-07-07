import { Injectable } from '@angular/core';
import { company, finance, internet, random } from 'faker';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Item {
  id: string;
  platform: string;
  company: string;
  leads: number;
  revenue: number;
  rpl: number;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private readonly targetPlatformsLength = 20;
  private readonly targetDataLength = 50;
  private readonly simulatedDelay = 1000;

  getData(): Observable<Item[]> {
    return of(this.generateData()).pipe(delay(this.simulatedDelay));
  }

  private generateData(): Item[] {
    const platforms = this.generatePlatforms();

    return new Array(this.targetDataLength).fill(undefined).map<Item>(() => {
      const platformIndex = random.number(platforms.length - 1);
      const leads = random.number(50);
      const revenue = +finance.amount(0, 500, 2);

      return {
        id: random.uuid(),
        platform: platforms[platformIndex],
        company: company.companyName(),
        leads,
        revenue,
        rpl: revenue / leads,
      };
    });
  }

  private generatePlatforms(): Array<Item['platform']> {
    return new Array(this.targetPlatformsLength)
      .fill(undefined)
      .map(() => this.capitalize(internet.domainWord()));
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
