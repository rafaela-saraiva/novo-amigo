'use client'
import { Pet } from '@/Models/Pet';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './styles.module.css';

interface CadastrarAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animal: Pet) => void;
}

export default function CadastrarAnimalModal({ isOpen, onClose, onSave }: CadastrarAnimalModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    especie: 'cachorro',
    raca: '',
    sexo: 'macho',
    porte: 'pequeno',
    descricao: '',
    vacinado: false,
    castrado: false,
    foto: ''
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.idade) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Idade)');
      return;
    }
    
    // Validar URL da foto se fornecida
    let imagemUrl = '/placeholder.svg';
    if (formData.foto.trim()) {
      try {
        new URL(formData.foto);
        imagemUrl = formData.foto;
      } catch {
        alert('URL da foto inválida. Usando imagem padrão.');
      }
    }
    
    const novoAnimal: Pet = {
      id: crypto.randomUUID(),
      nome: formData.nome,
      especie: formData.especie,
      raca: formData.raca,
      idade: formData.idade,
      sexo: formData.sexo,
      porte: formData.porte,
      descricao: formData.descricao,
      imagem: imagemUrl,
      disponivel: true,
      donoId: '1',
      donoNome: 'Nome da ONG Exemplo',
      donoTipo: 'ong',
      donoEndereco: 'Endereço da ONG', // Endereço fixo ou vindo de outro lugar
    };
    
    onSave(novoAnimal);
    
    // Limpar formulário
    setFormData({
      nome: '',
      idade: '',
      especie: 'cachorro',
      raca: '',
      sexo: 'macho',
      porte: 'pequeno',
      descricao: '',
      vacinado: false,
      castrado: false,
      foto: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Cadastrar Novo Animal</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3>Informações Básicas *</h3>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome do Animal *</label>
              <input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                placeholder="Ex: Rex, Mia, Pingo..."
                required
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="idade">Idade *</label>
                <input
                  id="idade"
                  type="text"
                  value={formData.idade}
                  onChange={(e) => handleInputChange('idade', e.target.value)}
                  placeholder="Ex: 2 anos, 6 meses..."
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="raca">Raça</label>
                <input
                  id="raca"
                  type="text"
                  value={formData.raca}
                  onChange={(e) => handleInputChange('raca', e.target.value)}
                  placeholder="Ex: Labrador, SRD, Siamês..."
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Características</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="especie">Espécie</label>
                <select
                  id="especie"
                  value={formData.especie}
                  onChange={(e) => handleInputChange('especie', e.target.value)}
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="passaro">Pássaro</option>
                  <option value="coelho">Coelho</option>
                  <option value="hamster">Hamster</option>
                  <option value="fazenda">Animal de Fazenda</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  value={formData.sexo}
                  onChange={(e) => handleInputChange('sexo', e.target.value)}
                >
                  <option value="macho">Macho</option>
                  <option value="femea">Fêmea</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="porte">Porte</label>
                <select
                  id="porte"
                  value={formData.porte}
                  onChange={(e) => handleInputChange('porte', e.target.value)}
                >
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Foto do Animal</h3>
            <div className={styles.formGroup}>
              <label htmlFor="fotoFile">Enviar Foto (opcional)</label>
              <div className={styles.fileUploadRow}>
                <input
                  id="fotoFile"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      const result = reader.result as string | null;
                      if (result) {
                        handleInputChange('foto', result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => {
                    fileInputRef?.current?.click();
                  }}
                >
                  Escolher arquivo
                </button>

                <span className={styles.orText}>ou</span>

                <input
                  id="foto"
                  type="url"
                  value={formData.foto}
                  onChange={(e) => handleInputChange('foto', e.target.value)}
                  placeholder="https://i.postimg.cc/exemplo-da-foto.jpg"
                />
              </div>
              {formData.foto && (
                <div className={styles.previewRow}>
                  <div className={styles.previewWrapper}>
                    <Image src={formData.foto} alt="pré-visualização" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              )}
              <small>
                📸 Cole aqui o link de uma foto do animal hospedada na internet.<br/>
                💡 Recomendamos usar sites como <a href="https://postimages.org/" target="_blank" rel="noopener">PostImg</a> para hospedar suas fotos gratuitamente.
              </small>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Informações Adicionais</h3>
            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição (opcional)</label>
              <textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Conte um pouco sobre a personalidade do animal, cuidados especiais, etc..."
                rows={3}
              />
            </div>
            
            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.vacinado}
                  onChange={(e) => handleInputChange('vacinado', e.target.checked)}
                />
                <span>Vacinado</span>
              </label>
              
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.castrado}
                  onChange={(e) => handleInputChange('castrado', e.target.checked)}
                />
                <span>Castrado</span>
              </label>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn}>
              Cadastrar Animal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}