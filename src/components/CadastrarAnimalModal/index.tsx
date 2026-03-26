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
  });

  const [fotos, setFotos] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (result) setFotos(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    try {
      new URL(urlInput);
      setFotos(prev => [...prev, urlInput.trim()]);
      setUrlInput('');
    } catch {
      alert('URL inválida. Por favor, insira uma URL válida.');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.idade) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Idade)');
      return;
    }
    
    const imagemUrl = fotos[0] || '/placeholder.svg';
    
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
      imagens: fotos,
      disponivel: true,
      donoId: '1',
      donoNome: 'Nome da ONG Exemplo',
      donoTipo: 'ong',
      donoEndereco: 'Endereço da ONG',
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
    });
    setFotos([]);
    setUrlInput('');
    
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
            <h3>Fotos do Animal</h3>
            <div className={styles.formGroup}>
              <label>Enviar Fotos (opcional)</label>
              <div className={styles.fileUploadRow}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Escolher arquivos
                </button>

                <span className={styles.orText}>ou</span>

                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
                  placeholder="https://i.postimg.cc/exemplo-da-foto.jpg"
                />
                <button
                  type="button"
                  className={styles.addUrlBtn}
                  onClick={handleAddUrl}
                >
                  Adicionar
                </button>
              </div>

              {fotos.length > 0 && (
                <div className={styles.previewGrid}>
                  {fotos.map((foto, index) => (
                    <div key={index} className={styles.previewWrapper}>
                      <Image src={foto} alt={`foto ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                      <button
                        type="button"
                        className={styles.removePreviewBtn}
                        onClick={() => handleRemoveImage(index)}
                        title="Remover foto"
                      >
                        ×
                      </button>
                      {index === 0 && (
                        <span className={styles.mainPhotoLabel}>Principal</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <small>
                📸 Adicione uma ou mais fotos do animal (arquivo local ou link).<br/>
                💡 Recomendamos usar <a href="https://postimages.org/" target="_blank" rel="noopener">PostImg</a> para hospedar suas fotos gratuitamente.<br/>
                🏷️ A primeira foto será usada como imagem principal.
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