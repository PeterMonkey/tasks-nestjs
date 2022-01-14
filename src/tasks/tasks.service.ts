import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';
import { skipLast } from 'rxjs';
import { GetTasksFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks; 
    }

    getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDTO;

        let tasks =this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }
        if(search){
            tasks = tasks.filter(task => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }

                return false;
            })
        }

        return tasks
    }

    getTaskById(id: string): Task{
        // Se intenta obtener la tarea
        const found = this.tasks.find((task) => task.id === id);

        //Si la tarea no existe
        if(!found) {
            throw new NotFoundException(`Task with ID: ${id}, not found`) //Mensaje de error personalizado

        } else { //Si no, devuelve...
            return found
        }   
    }

    createTask(createTaskDTO: CreateTaskDTO ): Task {

        const { title, description } = createTaskDTO;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }
    
    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task =this.getTaskById(id);
        task.status = status;

        return task;
    }
}
