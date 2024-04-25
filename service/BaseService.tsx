import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});


export class BaseService{
    private url:string;
    constructor(url:string) {
        this.url = url;
    }

    public getAll(){
       return instance.get(this.url)
    }

    public getById(id:number){
        return instance.get(`/${this.url}/${id}`)
    }

    public create(item:any){
        return instance.post(this.url, item)
    }

    public update(item:any){
        return instance.put(`/${this.url}/${item.id}`,item);
    }

    public delete(id:number){
        return instance.delete(`/${this.url}/${id}`);
    }

    public updateStatus(id:number,status:Projeto.status){
        return instance.put(`/${id}/status`,status);
    }
}
