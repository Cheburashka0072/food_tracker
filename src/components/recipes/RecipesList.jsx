import React from "react";
import Recipes from "./Recipes";

const RecipesList = ({ posts, remove, edit }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Recipes
          remove={remove}
          number={index + 1}
          post={post}
          key={post.id}
          edit={edit}
        />
      ))}
    </div>
  );
};

export default RecipesList;
