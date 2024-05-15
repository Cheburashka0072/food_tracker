import React, { useState } from "react";
import RecipesForm from "../components/recipes/RecipesForm";
import RecipesList from "../components/recipes/RecipesList";
import MyButton from "../components/UI/button/MyButton";
import DishesModal from "../components/UI/DishesModal/DishesModal";

const Recipes = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Вафлі",
      body: "3 яйця, 2 ст.л. сметани, 200г творогу, дрібку солі, ложку розпушувача розмішати і залишити на 15.хв, розтопити вершкове масло, до суміші додати масло та 50 г борошна. Смажити на гарячій вафельниці до готовності.",
    },
    { id: 2, title: "Рецепт1", body: "Description" },
    { id: 3, title: "Рецепт2", body: "Description" },
  ]);
  const [modal, setModal] = useState(false);
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  const editPost = (post, index) => {
    const newPosts = [...posts];
    newPosts[index] = post;
    setPosts(newPosts);
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          color: "#b0cc0d",
          fontWeight: "700",
          marginBottom: "50px",
        }}
      >
        Рецепти
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MyButton
          style={{ marginBottom: "30px" }}
          onClick={() => setModal(true)}
        >
          Додати рецепт
        </MyButton>
      </div>
      <DishesModal visible={modal} setVisible={setModal}>
        <RecipesForm create={createPost} />
      </DishesModal>

      {posts.length !== 0 ? (
        <RecipesList remove={removePost} posts={posts} edit={editPost} />
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "25px" }}>
          Рецептів ще немає
        </h1>
      )}
    </div>
  );
};

export default Recipes;
