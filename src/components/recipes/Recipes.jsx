import { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import "./recipes.css";

const Recipes = (props) => {
  const [changedPost, setChangedPost] = useState({
    id: props.post.id,
    title: props.post.title,
    body: props.post.body,
  });
  const [visible, setVisible] = useState(false);
  const editRecipes = (e) => {
    e.preventDefault();
    props.edit(changedPost, props.number - 1);
    setVisible(false);
  };
  return (
    <div className="post">
      <div className="post__content">
        <div className="post__title">
          {props.number} {props.post.title}
        </div>
        <div className="post__subtitle">{props.post.body}</div>
        <div className="post__keeper">
          <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
          <MyButton onClick={() => setVisible(!visible)}>Изменить</MyButton>
        </div>
        {visible && (
          <form>
            <MyInput
              value={changedPost.title}
              type="text"
              onChange={(e) => {
                setChangedPost({ ...changedPost, title: e.target.value });
              }}
              placeholder="Назва страви"
            />

            <MyInput
              value={changedPost.body}
              onChange={(e) =>
                setChangedPost({ ...changedPost, body: e.target.value })
              }
              type="text"
              placeholder="Текст рецепту"
            />
            <MyButton onClick={editRecipes}>Применить изменения</MyButton>
          </form>
        )}
      </div>
    </div>
  );
};

export default Recipes;
