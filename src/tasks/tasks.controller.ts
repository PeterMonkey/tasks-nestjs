import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
    //     //Si hay un filtro definido, llamara a tasksService.getTasksWithFilters
    //     //si no obtendra todas las tareas
    //     if(Object.keys(filterDTO).length){
    //         return this.tasksService.getTasksWithFilters(filterDTO)
    //     } else {
    //         return this.tasksService.getAllTasks() 
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    // @Post()
    // createTask(@Body() createTastDTO: CreateTaskDTO): Task {
    //    return this.tasksService.createTask(createTastDTO)
    // }   

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void{
    //     return this.tasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body() updateTaskStatusDto: UpdateTaskStatus
    //     ): Task{
    //         const { status } = updateTaskStatusDto
    //         return this.tasksService.updateTaskStatus(id, status)
    // }
}
