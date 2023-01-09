import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject, Observable} from 'rxjs';
import {SvgIconInterface} from '../svg-icon/svg-icon.interface';

@Injectable({
  providedIn: 'root'
})
export class SvgSpriteService {

  /**
   * Icon list loaded to the SVG Sprite
   */
  public icons: SvgIconInterface[] = [];

  /**
   * Icons List as BehaviorSubject
   */
  private _icons = new BehaviorSubject(this.icons);

  /**
   * Icons List as Observable
   */
  public icons$ = this._icons.asObservable();

  /**
   * @constructor
   * @param _httpClient HTTP Client
   * @param _sanitizer DOM Sanitizer
   */
  public constructor(
    private readonly _httpClient: HttpClient,
    private readonly _sanitizer: DomSanitizer
  ) { }

  /**
   * @method Load icon to the SVG Sprite
   * @param iconName
   */
  public load(iconName: string): Observable<SvgIconInterface> {

    return new Observable<SvgIconInterface>((observer) => {
      const svgIcon = this.icons.find((i) => i.name === iconName);
      let returnIcon: SvgIconInterface;
      if (svgIcon != null) {
        returnIcon = svgIcon;
        observer.next(returnIcon);
        observer.complete();
      } else {
        this._addIcon(iconName).subscribe((icon) => {
          returnIcon = icon;
          if (!icon.hasGradient) {
            this._iconPush(icon);
          }
          observer.next(returnIcon);
          observer.complete();
        });

      }
    });
  }

  private _addIcon(icon: string): Observable<SvgIconInterface> {
    return new Observable<SvgIconInterface>((observer) => {
      this._httpClient.get(`assets/svg-icon/${icon}.svg`, {
        responseType: 'text'
      }).subscribe((content) => {
        if (content != null) {
          const svgIcon = this._getSvgContent(icon, content);
          observer.next(svgIcon);
          observer.complete();
        }
      });
    });

  }

  private _iconPush(icon: SvgIconInterface) {
    if (this._icons.value.find((i) => i.name === icon.name) == null) {
      this.icons.push(icon);
      this._icons.next(this.icons);
    }
  }

  /**
   * Transforms the SVG content : Remove the svg tag
   * @param icon Icon name
   * @param content SVG content
   */
  private _getSvgContent(icon:string, content: string): SvgIconInterface {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    const gradient = doc.querySelector('linearGradient');
    if (svg == null) {
      throw new Error('Invalid SVG content: ' + content + ' for icon: ' + icon);
    }
    svg.removeAttribute('xmlns');
    svg.removeAttribute('xmlns:xlink');
    return {
      name: icon,
      content: this._sanitizer.bypassSecurityTrustHtml(svg.innerHTML),
      viewBox: svg.getAttribute('viewBox') ?? '0 0 24 24',
      hasGradient: gradient != null
    };
  }
}
