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
    comoAdotar: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const [fotos, setFotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fotoTab, setFotoTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (result) setFotos(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setFotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
      tags: selectedTags,
      comoAdotar: formData.comoAdotar,
    };

    onSave(novoAnimal);

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
      comoAdotar: '',
    });
    setSelectedTags([]);
    setFotos([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.page} onClick={(e) => e.stopPropagation()}>

        {/* ===== HEADER ===== */}
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Cadastrar Novo Amigo</h1>
            <p className={styles.pageSubtitle}>
              Preencha os detalhes para integrar um novo pet ao nosso sistema de gestão e cuidado.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="button" className={styles.saveBtn} onClick={() => handleSubmit()}>Salvar Animal</button>
          </div>
        </header>

        {/* ===== FORM BENTO GRID ===== */}
        <form className={styles.bentoGrid} onSubmit={handleSubmit}>

          {/* ---- COLUNA ESQUERDA ---- */}
          <div className={styles.colLeft}>

            {/* Card: Informações Básicas */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <span className="material-symbols-outlined">badge</span>
                </span>
                <h3 className={styles.cardTitle}>Informações Básicas</h3>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelUpper}>Nome Completo</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Ex: Tobias Silva"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    required
                  />
                </div>

                <div className={styles.row2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.labelUpper}>Idade Aproximada</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Ex: 2 anos"
                      value={formData.idade}
                      onChange={(e) => handleInputChange('idade', e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.labelUpper}>Raça / Linhagem</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Ex: Golden Retriever"
                      value={formData.raca}
                      onChange={(e) => handleInputChange('raca', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Card: Características */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={`${styles.cardIcon} ${styles.cardIconSecondary}`}>
                  <span className="material-symbols-outlined">genetics</span>
                </span>
                <h3 className={styles.cardTitle}>Características</h3>
              </div>

              <div className={styles.cardBody}>
                {/* Espécie pills */}
                <div className={styles.fieldGroup}>
                  <label className={styles.labelUpper}>Espécie</label>
                  <div className={styles.pillGroup}>
                    {[
                      { value: 'cachorro', label: 'Cachorro' },
                      { value: 'gato', label: 'Gato' },
                      { value: 'passaro', label: 'Pássaro' },
                      { value: 'coelho', label: 'Coelho' },
                      { value: 'hamster', label: 'Hamster' },
                      { value: 'fazenda', label: 'Animais de Fazenda' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        className={`${styles.pill} ${formData.especie === value ? styles.pillActive : ''}`}
                        onClick={() => handleInputChange('especie', value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sexo + Porte */}
                <div className={styles.row2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.labelUpper}>Sexo</label>
                    <div className={styles.segmented}>
                      <button
                        type="button"
                        className={`${styles.segOption} ${formData.sexo === 'macho' ? styles.segActive : ''}`}
                        onClick={() => handleInputChange('sexo', 'macho')}
                      >Macho</button>
                      <button
                        type="button"
                        className={`${styles.segOption} ${formData.sexo === 'femea' ? styles.segActive : ''}`}
                        onClick={() => handleInputChange('sexo', 'femea')}
                      >Fêmea</button>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.labelUpper}>Porte</label>
                    <select
                      className={styles.select}
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
            </section>
          </div>

          {/* ---- COLUNA DIREITA ---- */}
          <div className={styles.colRight}>

            {/* Card: Foto do Amigo */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <span className="material-symbols-outlined">add_a_photo</span>
                </span>
                <h3 className={styles.cardTitle}>Foto do Amigo</h3>
              </div>

              <div className={styles.cardBody}>
                {/* Aviso de capa */}
                <div className={styles.coverNotice}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
                  <span>A <strong>primeira imagem</strong> enviada será usada como capa do perfil do animal.</span>
                </div>

                {/* Toggle upload / URL */}
                <div className={styles.tabToggle}>
                  <button
                    type="button"
                    className={`${styles.tabBtn} ${fotoTab === 'upload' ? styles.tabBtnActive : ''}`}
                    onClick={() => setFotoTab('upload')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>upload</span>
                    Enviar arquivo
                  </button>
                  <button
                    type="button"
                    className={`${styles.tabBtn} ${fotoTab === 'url' ? styles.tabBtnActive : ''}`}
                    onClick={() => setFotoTab('url')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>link</span>
                    Adicionar URL
                  </button>
                </div>

                {fotoTab === 'upload' ? (
                  fotos.length === 0 ? (
                    <label
                      className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className={styles.hiddenInput}
                        onChange={handleFilesChange}
                      />
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '56px', fontVariationSettings: "'wght' 200", color: '#a93249' }}
                      >cloud_upload</span>
                      <p className={styles.dropzoneTitle}>Arraste a foto ou clique</p>
                      <p className={styles.dropzoneHint}>PNG, JPG ou WEBP (Max 5MB)</p>
                    </label>
                  ) : (
                    <>
                      <div className={styles.previewGrid}>
                        {fotos.map((foto, index) => (
                          <div key={index} className={styles.previewWrapper}>
                            <Image src={foto} alt={`foto ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                            <button
                              type="button"
                              className={styles.removeBtn}
                              onClick={() => handleRemoveImage(index)}
                            >×</button>
                            {index === 0 && <span className={styles.mainLabel}>★ Capa</span>}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className={styles.addMoreBtn}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                        Adicionar mais fotos
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className={styles.hiddenInput}
                        onChange={handleFilesChange}
                      />
                    </>
                  )
                ) : (
                  /* Aba URL */
                  <div className={styles.urlSection}>
                    <div className={styles.urlInputRow}>
                      <input
                        className={styles.input}
                        type="url"
                        placeholder="https://exemplo.com/foto-do-pet.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className={styles.urlAddBtn}
                        onClick={() => {
                          const trimmed = urlInput.trim();
                          if (trimmed) {
                            setFotos(prev => [...prev, trimmed]);
                            setUrlInput('');
                          }
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
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
                              className={styles.removeBtn}
                              onClick={() => handleRemoveImage(index)}
                            >×</button>
                            {index === 0 && <span className={styles.mainLabel}>★ Capa</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    <p className={styles.urlHint}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
                      Hospede a imagem gratuitamente em{' '}
                      <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className={styles.urlHintLink}>postimages.org</a>{' '}
                      e cole o link direto aqui.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Card: Informações Adicionais */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={`${styles.cardIcon} ${styles.cardIconTertiary}`}>
                  <span className="material-symbols-outlined">description</span>
                </span>
                <h3 className={styles.cardTitle}>Informações Adicionais</h3>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.checkRow}>
                  <label className={styles.checkCard}>
                    <input
                      type="checkbox"
                      className={styles.checkInput}
                      checked={formData.vacinado}
                      onChange={(e) => handleInputChange('vacinado', e.target.checked)}
                    />
                    <span className={styles.checkLabel}>Vacinado</span>
                  </label>
                  <label className={styles.checkCard}>
                    <input
                      type="checkbox"
                      className={styles.checkInput}
                      checked={formData.castrado}
                      onChange={(e) => handleInputChange('castrado', e.target.checked)}
                    />
                    <span className={styles.checkLabel}>Castrado</span>
                  </label>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.labelUpper}>Descrição / Histórico</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Conte-nos sobre a personalidade, cuidados especiais ou a história do animal..."
                    rows={6}
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        </form>

        {/* ===== CARD TAGS (full width abaixo do grid) ===== */}
        <div className={styles.fullWidthSection}>

          {/* Card: Tags de Personalidade */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={`${styles.cardIcon} ${styles.cardIconPurple}`}>
                <span className="material-symbols-outlined">sell</span>
              </span>
              <div>
                <h3 className={styles.cardTitle}>Tags de Personalidade</h3>
                <p className={styles.cardSubtitle}>Selecione todas as que descrevem bem o animal</p>
              </div>
            </div>
            <div className={styles.cardBody}>
              {[
                { group: '🐾 Comportamento', tags: ['#GostaDeCrianças', '#Amigável', '#Sociável', '#SeDáBemComCães', '#SeDáBemComGatos', '#Educado', '#Brincalhão', '#Dócil', '#Calmo', '#Ativo', '#Protetor', '#Independente', '#Carente', '#Dorminhoco', '#Comilão', '#Curioso', '#Inteligente', '#Assustado'] },
                { group: '🏠 Estilo de Vida', tags: ['#AdaptadoAApartamento', '#Silencioso', '#GostaDePassear', '#GostaDeColo'] },
                { group: '📅 Fase de Vida', tags: ['#Filhote', '#Adulto', '#Sênior'] },
              ].map(({ group, tags }) => (
                <div key={group} className={styles.tagGroup}>
                  <span className={styles.tagGroupLabel}>{group}</span>
                  <div className={styles.tagCloud}>
                    {tags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        className={`${styles.tagChip} ${selectedTags.includes(tag) ? styles.tagChipActive : ''}`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Card: Como Adotar */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={`${styles.cardIcon} ${styles.cardIconOrange}`}>
                <span className="material-symbols-outlined">volunteer_activism</span>
              </span>
              <div>
                <h3 className={styles.cardTitle}>Como Adotar</h3>
                <p className={styles.cardSubtitle}>Explique o processo de adoção deste animal</p>
              </div>
            </div>
            <div className={styles.cardBody}>
              <textarea
                className={styles.textarea}
                placeholder="Ex: Entre em contato pelo WhatsApp (11) 99999-9999. Realizamos entrevista com o adotante e visita ao novo lar. O animal é entregue com cartão de vacinação e documento de adoção responsável."
                rows={5}
                value={formData.comoAdotar}
                onChange={(e) => handleInputChange('comoAdotar', e.target.value)}
              />
            </div>
          </section>

        </div>

        {/* ===== FOOTER ===== */}
        <footer className={styles.pageFooter}>
          <div className={styles.footerInfo}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#a93249' }}>info</span>
            <p>Os dados inseridos são protegidos conforme a LGPD.</p>
          </div>
          <button type="button" className={styles.finishBtn} onClick={() => handleSubmit()}>
            Finalizar Cadastro
          </button>
        </footer>
      </div>
    </div>
  );
}
