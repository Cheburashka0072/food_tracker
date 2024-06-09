import React from "react";
import { usePagination } from "../../../hooks/usePagination";
import cl from "./pagination.module.css";

const Pagination = ({ totalPages, page, changePage }) => {
    let pagesArray = usePagination(totalPages);
    return (
        <div className={cl.pagesBlock}>
            <div className={cl.pages}>
                {pagesArray.map((p) => (
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={cl.page}
                        style={
                            page == p
                                ? {
                                      fontWeight: "bold",
                                      border: "2px solid #ad7400",
                                      padding: "20px",
                                  }
                                : {}
                        }
                    >
                        {p}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
