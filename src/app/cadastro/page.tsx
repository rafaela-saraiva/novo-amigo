'use client'

import TextField from "@/components/TextField";



export default function Cadastrar() {
  let nomeProduto = "";
  let descricao = "";
  let preco = "";

  function botaoCadastrarOnClick() {
    alert(`${nomeProduto}\n${descricao}\n${preco}`);
  }

  function handleNomeProdutoChange(texto: string) {
    nomeProduto = texto;
  }

  function handleDescricaoChange(texto: string) {
    descricao = texto;
  }

  function handlePrecoChange(texto: string) {
    preco = texto; 
  }

  return (
    <>
      <h1>Cadastro</h1>
      <form className="formCadastrar">
        <TextField label="Nome" type="text" onChange={handleNomeProdutoChange} />
        <TextField label="Descrição" type="text" onChange={handleDescricaoChange}  />
        <TextField label="Preço" type="text" onChange={handlePrecoChange} />

        <button onClick={botaoCadastrarOnClick}>Cadastrar</button>
      </form>
    </>
  );
}