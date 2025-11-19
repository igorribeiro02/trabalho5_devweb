import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {type AlunoData, alunoSchema } from "../schemas/alunoSchema";
import { useCadastrarAluno } from "../hooks/useCadastrarAluno";

const AlunoForm = () => {
  // 1. Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // Para limpar o formulário após o envio
  } = useForm<AlunoData>({
    resolver: zodResolver(alunoSchema), // 2. Integração com Zod
  });

  // 3. Hook de Mutação
  const { mutate: cadastrarAluno, isPending } = useCadastrarAluno();

  // 4. Função de Submissão
  const onSubmit = (data: AlunoData) => {
    cadastrarAluno(data); // Chama a mutação
    reset(); // Limpa o formulário
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Campo Nome */}
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome
        </label>
        <input
          {...register("nome")}
          type="text"
          id="nome"
          className={`form-control ${errors.nome ? "is-invalid" : ""}`}
        />
        {/* Exibição do erro de validação do Zod */}
        {errors.nome && (
          <div className="invalid-feedback">{errors.nome.message}</div>
        )}
      </div>

      {/* Campo E-mail */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      {/* Campo CPF */}
      <div className="mb-3">
        <label htmlFor="cpf" className="form-label">
          CPF (XXX.XXX.XXX-XX)
        </label>
        <input
          {...register("cpf")}
          type="text"
          id="cpf"
          placeholder="000.000.000-00"
          className={`form-control ${errors.cpf ? "is-invalid" : ""}`}
        />
        {errors.cpf && (
          <div className="invalid-feedback">{errors.cpf.message}</div>
        )}
      </div>

      {/* Botão de Envio */}
      <button
        type="submit"
        className="btn btn-primary" // Pode usar 'btn-verde' do CSS
        disabled={isSubmitting || isPending}
      >
        {isPending ? "Cadastrando..." : "Cadastrar Aluno"}
      </button>
    </form>
  );
};

export default AlunoForm;