import { Component } from '@angular/core';
import { Todo } from 'src/Models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root', // <app-root> HTML Tag
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public title: string = 'My tasks';
  public todos: Todo[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add(): void {
    const title: String = this.form.controls['title'].value;
    const id: Number = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(): void {
    this.form.reset();
  }

  remove(todo: Todo): void {
    const index = this.todos.indexOf(todo);

    if (index != -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  markAsDone(todo: Todo): void {
    todo.done = true;

    this.save();
  }

  markAsUndone(todo: Todo): void {
    todo.done = false;
    
    this.save();
  }

  save(): void {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todoApp:todos', data);
    this.mode = 'list';
  }

  load(): void {
    const data: string | null = localStorage.getItem('todoApp:todos');

    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
      this.todos.push(new Todo(1, "Estudar terraform", false));
      console.log("entrei");
      this.save();
      this.clear();
    }
  }

  changeMode(mode: string): void {
    this.mode = mode;
  }
}
