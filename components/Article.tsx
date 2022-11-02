import React, { ReactNode } from "react"
import Image from "next/image"

import { HackerNewsItem } from "../interfaces"

import styles from "../styles/components/Article.module.scss"
import { timestampToDate } from "../utils/convert-date"

import ArticleUser from "./ArticleUser"


type Props = {
    article?: HackerNewsItem
}


const Article = ({ article }: Props) => (
    <>
    <div className={styles.article}>
        <div className={styles['img-block']}>
            <Image src="/default-img-block.jpg" priority
            sizes="(min-width: 60em) 24vw,
            (min-width: 28em) 45vw,
            100vw"
            fill alt={article?.title ?? 'Article Image'} />
        </div>
        <div className={styles.body}>
            <p className={styles.title}>Score: {article?.score}</p>
            <h2 className={styles.title}>{article?.title}</h2>
            <div className={styles.date}>{timestampToDate(article?.time)}</div>
            <div dangerouslySetInnerHTML={{ __html: article?.text}} className={styles.content}></div>
            <ArticleUser id={article?.by} />
            <div className={styles.actions}>
                <a className={styles['primary-btn']} href={article?.url ?? ''} target="_blank" rel="noreferrer">Read More</a>
            </div>
        </div>
        
    </div>
    </>
);

export default Article;