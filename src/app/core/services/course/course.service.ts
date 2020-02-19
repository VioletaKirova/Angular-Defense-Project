import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private db: AngularFireDatabase,
    private router: Router
    ) { }

  getAll(): Observable<Course[]> {
    return this.db.list<Course>('courses')
      .snapshotChanges()
      .pipe(
        map((data) => data.map(x => ({
          key: x.payload.key, ...(x as any).payload.val()
      }))));
  }

  getById(id: string) {
    return this.db.object('/courses/' + id)
      .snapshotChanges()
      .pipe(map((c) => {
        const value: any = c.payload.val();
        const course: Course = {
          id: c.key,
          title: value.title,
          description: value.description,
          price: value.price,
          imageUrl: value.imageUrl,
          category: value.category
        };
        return course;
      }));
  }

  create(title, description, imageUrl, price, category) {
    this.db.list('/courses/').push({
      title,
      description,
      imageUrl,
      price,
      category
    });

    this.router.navigate(['/admin/courses']);
  }

  update(id, title, description, imageUrl, price, category) {
    this.db.object('/courses/' + id).update({
      title,
      description,
      imageUrl,
      price,
      category
    });

    this.router.navigate(['/admin/courses']);
  }

  delete(id) {
    this.db.object('/courses/' + id).remove();
  }
}
