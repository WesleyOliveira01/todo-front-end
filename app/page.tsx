"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TaskService } from "@/service/TaskService";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RenderTasks from "./../components/ui/RenderTasks";

const FormSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(5, { message: "insira um nome valido" }),
  description: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(5, { message: "insira uma descrição valida" }),
  status: z.enum(["INICIADO", "EM_ANDAMENTO", "FINALIZADO"]),
});

export default function Home() {
  const service = new TaskService();
  const tasks = service
    .getAll()
    .then((res) => console.log(tasks))
    .catch((e) => console.log(e.getMessage));
  const emptyTask: Projeto.task = {
    name: "",
    description: "",
    status: "INICIADO",
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...emptyTask,
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    service.create(data);
  };
  return (
    <main className="container bg-green-50">
      <section className="container py-2">
        <Dialog>
          <DialogTrigger>
            <div className="bg-green-500 p-2 text-zinc-50 font-semibold rounded-md flex gap-1">
              <CirclePlus />
              Adicionar tarefa
            </div>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <input
                          className="p-2 rounded-sm outline-none bg-zinc-300 shadow-md"
                          type="text"
                          placeholder="Tarefa..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <input
                          className="p-2 rounded-sm outline-none bg-zinc-300 shadow-md"
                          type="text"
                          placeholder="Descrição..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose type="submit">
                  <div className="bg-green-500 p-2 text-zinc-50 font-semibold rounded-md flex gap-1 w-[20%] justify-center">
                    <h2 className="text-center">Salvar</h2>
                  </div>
                </DialogClose>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </section>
      <RenderTasks />
    </main>
  );
}
