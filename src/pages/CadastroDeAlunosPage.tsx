import AlunoForm from "../components/alunoForm";

const CadastroDeAlunosPage = () => {
  return (
    <div className="container my-4">
      {/* Usamos um layout de coluna para centralizar o formulário */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mb-3">Cadastro de Novo Aluno</h2>
          <p className="text-muted">
            Preencha os dados abaixo para incluir um novo aluno no sistema.
          </p>
          <hr className="mb-4" />

          {/* Renderiza o componente de formulário que criamos,
            que contém toda a lógica de Zod e React Hook Form.
          */}
          <AlunoForm />
        </div>
      </div>
    </div>
  );
};

export default CadastroDeAlunosPage;