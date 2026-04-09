'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function OngPanel() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const isONG = user?.tipo === "shelter";

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [salvandoFoto, setSalvandoFoto] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loading) return;
    if (!user || !isONG) router.push("/");
  }, [user, loading, isONG, router]);

  useEffect(() => {
    if (!user || user.tipo !== "shelter") return;
    const shelterUser = user as unknown as { fotos?: string[]; urlImage?: string[] };
    const fotos = shelterUser.fotos || shelterUser.urlImage || [];
    setProfilePhoto(fotos.find(Boolean) || null);
  }, [user]);

  async function handlePhotoUpload(files: FileList | null) {
    if (!files || files.length === 0 || !user?.id) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || "");
      if (!dataUrl.startsWith("data:image/")) return;

      try {
        setSalvandoFoto(true);

        // Busca fotos atuais da ONG
        let currentPhotos: string[] = [];
        try {
          const res = await api.get(`/shelters/${user.id}`);
          const data = res.data as { urlImage?: string[] };
          currentPhotos = Array.isArray(data.urlImage) ? data.urlImage : [];
        } catch { /* ignore */ }

        // Coloca a nova foto como primeira (foto de perfil)
        const newPhotos = [dataUrl, ...currentPhotos.filter((p) => p !== dataUrl)].slice(0, 5);

        await api.put(`/shelters/${user.id}`, { urlImage: newPhotos }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfilePhoto(dataUrl);
        setFeedbackMsg("Foto de perfil atualizada!");
        setTimeout(() => setFeedbackMsg(null), 3000);
      } catch {
        setFeedbackMsg("Erro ao salvar a foto. Tente novamente.");
        setTimeout(() => setFeedbackMsg(null), 3000);
      } finally {
        setSalvandoFoto(false);
      }
    };
    reader.readAsDataURL(file);
  }

  if (loading || !user || !isONG) return null;

  const cards = [
    { title: "Meus Pets", icon: "cruelty_free", desc: "Cadastre, edite e gerencie todos os animais da sua ONG", route: "/ong/pets" },
    { title: "Solicitações", icon: "mail", desc: "Veja e responda os pedidos de adoção recebidos", route: "/ong/messages" },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            <span className="material-symbols-outlined">volunteer_activism</span>
            Painel da ONG
          </span>

          <h1 className={styles.title}>
            Olá, <span>{user.nome || "ONG"}</span>
          </h1>

          <p className={styles.subtitle}>
            Gerencie seus pets e acompanhe os pedidos de adoção.
          </p>

          <div className={styles.actions}>
            <button
              onClick={() => router.push("/ong/pets")}
              className={styles.primaryBtn}
            >
              <span className="material-symbols-outlined">cruelty_free</span>
              Meus Pets
            </button>

            <button
              onClick={() => router.push("/ong/messages")}
              className={styles.secondaryBtn}
            >
              <span className="material-symbols-outlined">mail</span>
              Mensagens
            </button>
          </div>
        </div>

        {/* Foto de perfil da ONG */}
        <div className={styles.profilePhotoSection}>
          <div
            className={styles.profilePhotoWrap}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            {profilePhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profilePhoto} alt="Foto da ONG" className={styles.profilePhoto} />
            ) : (
              <div className={styles.profilePhotoPlaceholder}>
                <span className="material-symbols-outlined">add_a_photo</span>
                <span>Adicionar foto</span>
              </div>
            )}

            <div className={styles.profilePhotoOverlay}>
              <span className="material-symbols-outlined">photo_camera</span>
              <span>{profilePhoto ? "Trocar foto" : "Adicionar foto"}</span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handlePhotoUpload(e.target.files)}
          />

          <p className={styles.profilePhotoHint}>
            {salvandoFoto ? "Salvando..." : "Clique para alterar a foto de perfil"}
          </p>

          {feedbackMsg && (
            <p className={styles.profileFeedback}>{feedbackMsg}</p>
          )}
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsSectionHeader}>
          <h2>Gerenciar</h2>
          <p>Acesse rapidamente as seções do painel</p>
        </div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => router.push(card.route)}
              className={styles.card}
            >
              <div className={styles.cardIcon}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <span className={styles.cardArrow}>
                Acessar
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
