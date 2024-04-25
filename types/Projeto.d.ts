namespace Projeto {
  type status = "INICIADO" | "EM_ANDAMENTO" | "FINALIZADO";
  type task = {
    id?: number;
    name: string;
    description: string;
    status: status;
  };
}
