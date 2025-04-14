import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodeDataMutate';
import { FoodData } from '../../interface/FoodData';

import "./modal.css";

interface ModalProps {
  closeModal(): void;
  editingFood?: FoodData | null;
  onUpdate?: () => void;
}

export function CreateModal({ closeModal, editingFood, onUpdate }: ModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isSuccess, isPending } = useFoodDataMutate();

  // Preenche campos se estiver em modo edição
  useEffect(() => {
    if (editingFood) {
      setTitle(editingFood.title ?? "");
      setPrice(editingFood.price ?? 0);
      setImage(editingFood.image ?? "");
      setDescription(editingFood.description ?? "");
    }
  }, [editingFood]);

  const submit = () => {
    const foodData = {
      title,
      price,
      image,
      description
    };

    if (editingFood?.id) {
      // PUT para atualizar
      fetch(`http://localhost:8080/food/${editingFood.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData)
      }).then(() => {
        onUpdate?.();
        closeModal();
      });
    } else {
      // POST para criar
      mutate(foodData as any);
    }
  };

  useEffect(() => {
    if (!isSuccess || editingFood) return;
    closeModal();
    onUpdate?.();
  }, [isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <button className="btn-close" onClick={closeModal}>×</button>
        <h2>{editingFood ? "Editar item do cardápio" : "Cadastrar novo item"}</h2>

        <form className="input-container">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="price">Preço</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label htmlFor="image">Imagem (URL)</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label htmlFor="description">Descrição</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>

        <button onClick={submit} className="btn-secondary">
          {isPending ? 'Salvando...' : (editingFood ? 'Salvar alterações' : 'Postar')}
        </button>
      </div>
    </div>
  );
}
