import { useEffect, useState } from "react";
import { Card } from "./components/card/card";
import { CreateModal } from "./components/create-modal/create-modal";
import { FoodData } from "./interface/FoodData";
import "./App.css";

function App() {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodData | null>(null);

  const fetchFoods = () => {
    fetch("http://localhost:8080/food")
      .then(res => res.json())
      .then(data => setFoods(data));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const openCreateModal = () => {
    setEditingFood(null);
    setModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const foodToEdit = foods.find(f => f.id === id);
    if (foodToEdit) {
      setEditingFood(foodToEdit);
      setModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      fetch(`http://localhost:8080/food/${id}`, {
        method: "DELETE",
      }).then(() => {
        setFoods(prev => prev.filter(food => food.id !== id));
      });
    }
  };

  return (
    <div className="main-container">
      <div className="header">Cardápio</div>
      <button className="btn-new" onClick={openCreateModal}>Novo Produto</button>

      <div className="card-container">
        {foods.map((food) => (
          <Card
            key={food.id}
            id={food.id}
            title={food.title}
            image={food.image}
            description={food.description}
            price={food.price}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {modalOpen && (
        <CreateModal
          closeModal={() => setModalOpen(false)}
          editingFood={editingFood}
          onUpdate={fetchFoods}
        />
      )}
    </div>
  );
}

export default App;
