import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

/**
 * Base component.
 * This component is used as a base for all other components.
 * It is used to provide common functionality to all components.
 * @export
 * @class BaseComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'cv-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {

  private _subscriptions: Subscription[] = [];

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * @constructor
   * @protected
   */
  public constructor() {}

  /**
   * Subscribe to an observable.
   * @param observable Observable to subscribe to.
   * @param next Callback to be called when the observable emits a value.
   * @param error Callback to be called when the observable emits an error.
   * @param complete Callback to be called when the observable completes.
   * @returns Subscription to the observable.
   * @protected
   */
  protected _subscribe(
    observable: Observable<any>,
    next?: (value: any) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {

    const ovSubscription = {
      unsubscribe: () => {
        if (subscription != null) {
          subscription.unsubscribe();
        }
      }
    }

    const ovNext = (value: any) => {
      if (next != null) {
        next(value);
      }
    }

    const ovComplete = () => {
      if (complete != null) {
        this._subscriptions = this._subscriptions.filter((subscription) => subscription !== ovSubscription);
        complete();
      }
    }

    const subscription = observable.subscribe({
      next: ovNext,
      error,
      complete: ovComplete
    });
    this._subscriptions.push(subscription);
    return subscription;
  }
}
