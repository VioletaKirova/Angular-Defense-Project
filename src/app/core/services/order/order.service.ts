import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../models/order.interface';
import { Course } from '../../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  create(order: Order) {
    return this.db.list('/orders/').push(order);
  }

  getOrderIdsByUserEmail(userEmail): Observable<string[]> {
    return this.db.list('/orders/', r => r.orderByChild('user').equalTo(userEmail))
      .snapshotChanges()
      .pipe(map((orders) => {
        return orders.map(o => o.key);
      }));
  }

  getCoursesByOrderId(orderId): Observable<Course[]> {
    return this.db.object<Course[]>('/orders/' + orderId + '/courses/')
      .snapshotChanges()
      .pipe(map((courses) => {
        return courses.payload.val();
      }));
  }
}
