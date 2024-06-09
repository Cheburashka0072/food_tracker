import React, { useEffect, useState } from "react";

export const Filter = ({ dishes, setSearchedDishes, ...props }) => {
    const [searchInput, setSearchInput] = useState("");
    const handleFilterInput = (e) => {
        const searchDish = e.target.value;
        setSearchInput(searchDish);
        const filteredDishes = dishes.filter((dish) =>
            dish.name.toLowerCase().includes(searchDish.toLowerCase())
        );
        setSearchedDishes(filteredDishes);
    };
    useEffect(() => {
        setSearchedDishes(dishes);
        setSearchInput("");
    }, [dishes]);
    return (
        <input
            {...props}
            type="text"
            value={searchInput}
            placeholder="Пошук..."
            onChange={(e) => handleFilterInput(e)}
        />
    );
};
