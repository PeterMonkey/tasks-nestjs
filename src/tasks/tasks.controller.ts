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

    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        
        return this.tasksService.getTasks(filterDTO)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task>{
        return this.tasksService.createTask(createTaskDto)
    } 

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void>{
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatus
        ): Promise<Task>{
            const { status } = updateTaskStatusDto
            return this.tasksService.updateTaskStatus(id, status)
    }
}
