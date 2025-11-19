import { z } from "zod";

export const alunoSchema = z.object({
  // Requisito: "nome" é obrigatório
  nome: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." })
    .max(255),

  // Requisito: "email" é obrigatório e deve ser um e-mail
  email: z
    .string()
    .email({ message: "Insira um e-mail válido." })
    .min(1, { message: "O e-mail é obrigatório." }),

  // Requisito: "cpf" é obrigatório (adicionamos este campo no back-end)
  cpf: z
    .string()
    .min(14, { message: "O CPF deve ter 14 caracteres (XXX.XXX.XXX-XX)." })
    .max(14, { message: "O CPF deve ter 14 caracteres (XXX.XXX.XXX-XX)." })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "Formato de CPF inválido (esperado: XXX.XXX.XXX-XX).",
    }),
});

// Extraímos o "tipo" TypeScript do schema para usar no nosso formulário
export type AlunoData = z.infer<typeof alunoSchema>;