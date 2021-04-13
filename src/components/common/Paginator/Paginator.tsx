import React from 'react';
import s from "./Paginator.module.css"

type PaginatorPropsType = {
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    onPageClick: (page: number) => void
}
// функция для ввода страниц пользователей
const Paginator: React.FC<PaginatorPropsType> = (props) => {
    let PagesCount = Math.ceil(props.totalUsersCount / props.pageSizes)
    let pages: Array<number> = []
    for (let i = 1; i <= PagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map(page => {
                return <span key={page}
                             className={page === props.currentPage ? s.active : ""}
                             onClick={() => props.onPageClick(page)}>{page}</span>
            })
            }
        </div>
    )
}


export default Paginator
