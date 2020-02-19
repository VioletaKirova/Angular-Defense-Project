import { Course } from './course.interface';

export class Order {
  user: string;
  courses: Course[];
  amount: number;
  date: number;
}
