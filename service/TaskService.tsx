import { BaseService } from "./BaseService";


export class TaskService extends BaseService{
    constructor(){
        super("v1/tasks");
    }
}
